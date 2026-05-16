import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  lender,
  onboardingDraft,
  user,
  workEmailOtp,
} from "@/server/db/schema";
import { verifyCac, verifyNin } from "@/server/integrations/lumiid";
import { sendOtpEmail } from "@/server/integrations/email";
import { providerErrorToTrpc } from "@/server/integrations/http";
import {
  createCr3dentialsSession,
  listCr3dentialsPlatforms,
} from "@/server/integrations/cr3dentials";
import {
  exchangeConnectCode,
  fetchIncome,
  fetchTransactions,
} from "@/server/integrations/mono";
import { extractPayslip } from "@/server/onboarding/payslip";
import {
  extractDomain,
  generateOtp,
  hashSecret,
  makeApiKey,
  makeId,
  mapResidenceState,
  PERSONAL_EMAIL_DOMAINS,
  stringSimilarity,
} from "@/server/onboarding/utils";

const personaSchema = z.enum([
  "freelancer",
  "corporate_worker",
  "government_official",
]);

function isFetchFailed(error: unknown) {
  return error instanceof Error && error.message.includes("fetch failed");
}

export const generalRouter = createTRPCRouter({
  getDraft: publicProcedure
    .input(z.object({ draftId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return (
          (await ctx.db.query.onboardingDraft.findFirst({
            where: eq(onboardingDraft.id, input.draftId),
          })) ?? null
        );
      } catch (error) {
        if (isFetchFailed(error)) {
          return (
            (await ctx.db.query.onboardingDraft.findFirst({
              where: eq(onboardingDraft.id, input.draftId),
            })) ?? null
          );
        }

        console.error("Failed to fetch onboarding draft", {
          draftId: input.draftId,
          error,
        });
        throw new Error(
          "Unable to load onboarding draft. Check database connectivity and try again.",
        );
      }
    }),

  completeRegistration: protectedProcedure
    .input(z.object({ draftId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const draft = await ctx.db.query.onboardingDraft.findFirst({
        where: eq(onboardingDraft.id, input.draftId),
      });
      if (!draft) throw new Error("Onboarding draft not found");

      await ctx.db
        .update(user)
        .set({
          nin: draft.nin,
          bvn: draft.bvn,
          phone: draft.phone,
          firstName: draft.firstName,
          lastName: draft.lastName,
          middleName: draft.middleName,
          gender: draft.gender,
          birthdate: draft.birthdate,
          residenceState: draft.residenceState,
          residenceAddress: draft.residenceAddress,
          identityVerified: draft.identityVerified,
          employmentVerified: draft.employmentVerified,
          stateRiskBucket: draft.stateRiskBucket ?? 0,
          lumiidPhoto: draft.lumiidPhoto,
          monoTelcoAccountId: draft.monoTelcoAccountId,
          squadVirtualAccount: draft.squadVirtualAccount,
          squadCustomerIdentifier: draft.squadCustomerIdentifier,
          onboardingStep: "role_selection",
          identityFlags: draft.identityFlags ?? [],
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.session.user.id));

      await ctx.db
        .update(onboardingDraft)
        .set({
          userId: ctx.session.user.id,
          step: "role",
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, input.draftId));

      return { ok: true };
    }),

  selectPersona: protectedProcedure
    .input(z.object({ persona: personaSchema }))
    .mutation(async ({ ctx, input }) => {
      const step =
        input.persona === "freelancer"
          ? "freelancer_bank"
          : input.persona === "corporate_worker"
            ? "corporate_email"
            : "government_details";
      await ctx.db
        .update(user)
        .set({
          persona: input.persona,
          onboardingStep: step,
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.session.user.id));
      return { step };
    }),

  saveGovernmentDetails: protectedProcedure
    .input(
      z.object({
        agencyName: z.string().min(2),
        staffIdentifier: z.string().optional(),
        gradeLevel: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const draft = await getOrCreateUserDraft(ctx.db, ctx.session.user.id);
      await ctx.db
        .update(onboardingDraft)
        .set({
          agencyName: input.agencyName,
          staffIdentifier: input.staffIdentifier,
          gradeLevel: input.gradeLevel,
          persona: "government_official",
          step: "government_payslip",
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, draft.id));
      await ctx.db
        .update(user)
        .set({
          persona: "government_official",
          onboardingStep: "government_payslip",
        })
        .where(eq(user.id, ctx.session.user.id));
      return { ok: true };
    }),

  sendWorkEmailOtp: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const domain = extractDomain(input.email);
      if (PERSONAL_EMAIL_DOMAINS.has(domain)) {
        throw new Error(
          "Please use your company email address, not a personal one",
        );
      }

      const draft = await getOrCreateUserDraft(ctx.db, ctx.session.user.id);
      const code = generateOtp();
      const emailResult = await sendOtpEmail({ to: input.email, code });
      await ctx.db.insert(workEmailOtp).values({
        id: makeId("otp"),
        userId: ctx.session.user.id,
        draftId: draft.id,
        email: input.email,
        codeHash: hashSecret(code),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      return {
        delivered: emailResult.delivered,
        devCode: emailResult.devCode,
      };
    }),

  verifyWorkEmailOtp: protectedProcedure
    .input(
      z.object({ email: z.string().email(), otp: z.string().regex(/^\d{6}$/) }),
    )
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.db.query.workEmailOtp.findFirst({
        where: eq(workEmailOtp.email, input.email),
        orderBy: (table, { desc }) => [desc(table.createdAt)],
      });
      if (!record || record.expiresAt < new Date() || record.consumedAt) {
        throw new Error("OTP expired. Request a new one.");
      }
      if (record.attempts >= 3) {
        throw new Error("Too many failed attempts. Please start over.");
      }
      if (record.codeHash !== hashSecret(input.otp)) {
        await ctx.db
          .update(workEmailOtp)
          .set({ attempts: record.attempts + 1 })
          .where(eq(workEmailOtp.id, record.id));
        throw new Error(
          `Incorrect OTP. ${2 - record.attempts} attempt(s) remaining.`,
        );
      }

      const domain = extractDomain(input.email);
      await ctx.db
        .update(workEmailOtp)
        .set({ consumedAt: new Date() })
        .where(eq(workEmailOtp.id, record.id));
      await ctx.db
        .update(user)
        .set({
          employmentVerified: true,
          employerDomain: domain,
          onboardingStep: "corporate_payslip",
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.session.user.id));

      const draft = await getOrCreateUserDraft(ctx.db, ctx.session.user.id);
      await ctx.db
        .update(onboardingDraft)
        .set({
          employmentVerified: true,
          employerDomain: domain,
          persona: "corporate_worker",
          step: "corporate_payslip",
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, draft.id));

      return { verified: true, domain };
    }),

  analyzePayslip: protectedProcedure
    .input(
      z.object({
        text: z.string().min(20),
        government: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const current = await ctx.db.query.user.findFirst({
        where: eq(user.id, ctx.session.user.id),
      });
      if (!current) throw new Error("User not found");
      const draft = await getOrCreateUserDraft(ctx.db, ctx.session.user.id);
      const expectedName =
        `${current.firstName ?? ""} ${current.lastName ?? ""}`.trim() ||
        current.name;
      const extracted = await extractPayslip({
        text: input.text,
        expectedName,
        expectedEmployerDomain: current.employerDomain,
        statedAgency: draft.agencyName,
        government: input.government,
      });

      if (extracted.flags.includes("name_mismatch")) {
        throw new Error("The name on your payslip doesn't match your NIN.");
      }
      if (extracted.flags.includes("stale_payslip")) {
        throw new Error(
          "This payslip is too old. Upload one from the last 3 months.",
        );
      }
      if (extracted.flags.includes("salary_not_found")) {
        throw new Error("We couldn't find salary information.");
      }

      const tenureYears = extracted.hireDate
        ? Math.max(
            0,
            (Date.now() - new Date(extracted.hireDate).getTime()) /
              (365 * 24 * 60 * 60 * 1000),
          )
        : 0;

      await ctx.db
        .update(user)
        .set({
          monthlyIncomeNgn: extracted.netSalary,
          jobTenureYears: tenureYears,
          onboardingStep: input.government
            ? "government_bank"
            : "corporate_bank",
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.session.user.id));
      await ctx.db
        .update(onboardingDraft)
        .set({
          monthlyIncomeNgn: extracted.netSalary,
          jobTenureYears: tenureYears,
          gradeLevel: extracted.gradeOrLevel ?? draft.gradeLevel,
          step: input.government ? "government_bank" : "corporate_bank",
          raw: { payslip: extracted },
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, draft.id));

      return extracted;
    }),

  linkMonoBank: protectedProcedure
    .input(
      z.object({
        code: z.string().min(3),
        salaryAmount: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const exchange = await exchangeConnectCode(input.code);
        const transactions = await fetchTransactions(exchange.accountId);
        let incomeResponse: Record<string, unknown> | null = null;
        try {
          incomeResponse = await fetchIncome(exchange.accountId);
        } catch {
          incomeResponse = null;
        }
        const analysis = analyzeTransactions(transactions, input.salaryAmount);
        const incomeFromMono = extractMonoIncome(incomeResponse);
        const monthlyIncome = incomeFromMono || analysis.averageMonthlyIncome;
        const draft = await getOrCreateUserDraft(ctx.db, ctx.session.user.id);
        const current = await ctx.db.query.user.findFirst({
          where: eq(user.id, ctx.session.user.id),
        });
        const finalIncome = current?.monthlyIncomeNgn || monthlyIncome;
        const salaryConfirmed =
          input.salaryAmount !== undefined ? analysis.salaryConfirmed : true;

        await ctx.db
          .update(user)
          .set({
            monoBankAccountId: exchange.accountId,
            monthlyIncomeNgn: finalIncome,
            monthlyDebtNgn: analysis.averageMonthlyOutflow,
            bankStatementMonths: analysis.monthCount,
            employmentVerified: current?.employmentVerified || salaryConfirmed,
            onboardingStep: "reveal",
            updatedAt: new Date(),
          })
          .where(eq(user.id, ctx.session.user.id));
        await ctx.db
          .update(onboardingDraft)
          .set({
            monoBankAccountId: exchange.accountId,
            monthlyIncomeNgn: finalIncome,
            monthlyDebtNgn: analysis.averageMonthlyOutflow,
            bankStatementMonths: analysis.monthCount,
            salaryConfirmed,
            step: "reveal",
            raw: {
              monoBankExchange: exchange.raw,
              monoIncome: incomeResponse,
              monoTransactionAnalysis: analysis,
            },
            updatedAt: new Date(),
          })
          .where(eq(onboardingDraft.id, draft.id));

        return {
          accountId: exchange.accountId,
          ...analysis,
          monthlyIncome: finalIncome,
        };
      } catch (error) {
        providerErrorToTrpc(error, "Bank linking failed");
      }
    }),

  listGigPlatforms: protectedProcedure.query(async () => {
    try {
      return await listCr3dentialsPlatforms();
    } catch (error) {
      providerErrorToTrpc(error, "Unable to fetch gig platforms");
    }
  }),

  createGigIncomeSession: protectedProcedure
    .input(z.object({ platformId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const current = await ctx.db.query.user.findFirst({
        where: eq(user.id, ctx.session.user.id),
      });
      if (!current) throw new Error("User not found");
      const draft = await getOrCreateUserDraft(ctx.db, ctx.session.user.id);
      try {
        const session = await createCr3dentialsSession({
          platformId: input.platformId,
          name: current.name,
          email: current.email,
          externalReferenceId: ctx.session.user.id,
        });
        await ctx.db
          .update(user)
          .set({
            cr3dentialsSessionId: session.sessionId,
            onboardingStep: "freelancer_linkedin",
          })
          .where(eq(user.id, ctx.session.user.id));
        await ctx.db
          .update(onboardingDraft)
          .set({
            cr3dentialsSessionId: session.sessionId,
            step: "freelancer_linkedin",
            updatedAt: new Date(),
          })
          .where(eq(onboardingDraft.id, draft.id));
        return session;
      } catch (error) {
        providerErrorToTrpc(error, "Unable to create gig verification session");
      }
    }),

  verifyCac: publicProcedure
    .input(z.object({ email: z.string().email(), rcNumber: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const data = await verifyCac(input.rcNumber);
        const businessName = data.companyName ?? data.company_name ?? "";
        const status = data.status ?? "";
        if (status.toUpperCase() !== "ACTIVE") {
          throw new Error("Only active companies can continue.");
        }
        const id = makeId("lender");
        await ctx.db.insert(lender).values({
          id,
          email: input.email,
          businessName,
          rcNumber: data.rcNumber ?? data.rc_number ?? input.rcNumber,
          cacStatus: status,
          registrationDate: data.registrationDate ?? data.registration_date,
          onboardingStep: "kyc",
        });
        return { lenderId: id, businessName, status };
      } catch (error) {
        providerErrorToTrpc(error, "CAC verification failed");
      }
    }),

  verifyDirectorKyc: publicProcedure
    .input(
      z.object({
        lenderId: z.string(),
        nin: z.string().regex(/^\d{11}$/),
        bvn: z.string().regex(/^\d{11}$/),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const data = await verifyNin(input.nin);
        await ctx.db
          .update(lender)
          .set({
            directorName: `${data.firstname} ${data.lastname}`,
            directorNin: input.nin,
            directorBvn: input.bvn,
            onboardingStep: "config",
            updatedAt: new Date(),
          })
          .where(eq(lender.id, input.lenderId));
        return { directorName: `${data.firstname} ${data.lastname}` };
      } catch (error) {
        providerErrorToTrpc(error, "Director KYC failed");
      }
    }),

  saveLenderConfig: publicProcedure
    .input(
      z.object({
        lenderId: z.string(),
        assetCategories: z.array(z.string()).min(1),
        minTrustScore: z.number().min(0).max(100),
        targetNiches: z.array(z.string()).min(1),
        maxPerBorrower: z.number().positive(),
        autoApproveThreshold: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(lender)
        .set({
          assetCategories: input.assetCategories,
          minTrustScore: input.minTrustScore,
          targetNiches: input.targetNiches,
          maxPerBorrower: input.maxPerBorrower,
          autoApproveThreshold: input.autoApproveThreshold,
          onboardingStep: "settlement",
          updatedAt: new Date(),
        })
        .where(eq(lender.id, input.lenderId));
      return { ok: true };
    }),

  saveLenderSettlement: publicProcedure
    .input(
      z.object({
        lenderId: z.string(),
        bankName: z.string().min(2),
        bankCode: z.string().min(3),
        accountNumber: z.string().regex(/^\d{10}$/),
        accountName: z.string().min(2),
        overrideNameMismatch: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.db.query.lender.findFirst({
        where: eq(lender.id, input.lenderId),
      });
      if (!record) throw new Error("Lender record not found");
      const matches =
        stringSimilarity(record.businessName, input.accountName) >= 0.55;
      if (!matches && !input.overrideNameMismatch) {
        throw new Error(
          "Settlement account name does not match business name.",
        );
      }

      const apiKey = makeApiKey();
      await ctx.db
        .update(lender)
        .set({
          settlementBank: input.bankName,
          settlementBankCode: input.bankCode,
          settlementAccount: input.accountNumber,
          settlementAccountName: input.accountName,
          settlementNameOverridden: !matches,
          apiKeyHash: hashSecret(apiKey),
          apiKeyPreview: `${apiKey.slice(0, 10)}...${apiKey.slice(-4)}`,
          onboardingStep: "complete",
          updatedAt: new Date(),
        })
        .where(eq(lender.id, input.lenderId));
      return {
        apiKey,
        apiKeyPreview: `${apiKey.slice(0, 10)}...${apiKey.slice(-4)}`,
      };
    }),
});

type Transaction = {
  amount?: number;
  type?: string;
  narration?: string;
  date?: string;
};

function analyzeTransactions(transactions: unknown[], salaryAmount?: number) {
  const monthKeys = new Set<string>();
  let credits = 0;
  let debits = 0;
  let salaryConfirmed = salaryAmount === undefined;

  for (const item of transactions) {
    if (!item || typeof item !== "object") continue;
    const tx = item as Transaction;
    const amount = Math.abs(Number(tx.amount ?? 0));
    if (tx.date) monthKeys.add(tx.date.slice(0, 7));
    if (tx.type === "credit") {
      credits += amount;
      if (
        salaryAmount !== undefined &&
        Math.abs(amount - salaryAmount) / Math.max(salaryAmount, 1) <= 0.15
      ) {
        salaryConfirmed = true;
      }
    }
    if (tx.type === "debit") debits += amount;
  }

  const monthCount = Math.max(monthKeys.size, 1);
  return {
    monthCount,
    averageMonthlyIncome: Math.round(credits / monthCount),
    averageMonthlyOutflow: Math.round(debits / monthCount),
    salaryConfirmed,
  };
}

function extractMonoIncome(response: Record<string, unknown> | null) {
  if (!response) return 0;
  const data =
    response.data && typeof response.data === "object"
      ? (response.data as Record<string, unknown>)
      : response;
  const value =
    data.average_monthly_income ??
    data.averageMonthlyIncome ??
    data.monthly_income ??
    data.income;
  return typeof value === "number" ? value : Number(value ?? 0) || 0;
}

async function getOrCreateUserDraft(
  db: Parameters<
    Parameters<typeof protectedProcedure.query>[0]
  >[0]["ctx"]["db"],
  userId: string,
) {
  const existing = await db.query.onboardingDraft.findFirst({
    where: eq(onboardingDraft.userId, userId),
    orderBy: (table, { desc }) => [desc(table.createdAt)],
  });
  if (existing) return existing;
  const current = await db.query.user.findFirst({ where: eq(user.id, userId) });
  const id = makeId("draft");
  await db.insert(onboardingDraft).values({
    id,
    userId,
    email: current?.email,
    firstName: current?.firstName,
    lastName: current?.lastName,
    phone: current?.phone,
    identityVerified: current?.identityVerified ?? false,
    stateRiskBucket: current?.stateRiskBucket ?? 0,
    residenceState: current?.residenceState,
    persona: current?.persona,
  });
  return (await db.query.onboardingDraft.findFirst({
    where: eq(onboardingDraft.id, id),
  }))!;
}
