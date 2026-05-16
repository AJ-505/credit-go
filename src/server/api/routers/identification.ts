import { eq } from "drizzle-orm";
import { z } from "zod";

import { env } from "@/env";
import {
  exchangeMonoCode,
  fetchTelcoIdentity,
  initiateTelcoLogin,
  type TelcoProvider,
  verifyTelcoOtp,
} from "@/server/integrations/mono";
import { providerErrorToTrpc } from "@/server/integrations/http";
import { verifyNin } from "@/server/integrations/lumiid";
import { onboardingDraft } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  makeId,
  mapResidenceState,
  stringSimilarity,
} from "@/server/onboarding/utils";

const ninSchema = z.string().regex(/^\d{11}$/, "NIN must be exactly 11 digits");
const phoneSchema = z
  .string()
  .regex(/^0\d{10}$/, "Phone number must be 11 digits and start with 0");
const telcoProviderSchema = z.enum([
  "mtn",
  "airtel",
  "glo",
  "9mobile",
] satisfies [TelcoProvider, TelcoProvider, TelcoProvider, TelcoProvider]);

export const identificationRouter = createTRPCRouter({
  verifyNin: publicProcedure
    .input(z.object({ draftId: z.string().optional(), nin: ninSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        const data = await verifyNin(input.nin);
        const draftId = input.draftId ?? makeId("draft");
        const residence = data.residence ?? {};
        const stateRiskBucket = mapResidenceState(residence.state);
        const values = {
          nin: input.nin,
          phone: data.phone,
          firstName: data.firstname,
          lastName: data.lastname,
          middleName: data.middlename ?? "",
          gender: data.gender,
          birthdate: data.birthdate,
          lumiidPhoto: data.photo ?? "",
          residenceAddress: residence.address1 ?? "",
          residenceTown: residence.town ?? "",
          residenceLga: residence.lga ?? "",
          residenceState: residence.state ?? "",
          stateRiskBucket,
          identityVerified: true,
          step: "phone",
          raw: { lumiidNin: data },
          updatedAt: new Date(),
        };

        if (input.draftId) {
          await ctx.db
            .update(onboardingDraft)
            .set(values)
            .where(eq(onboardingDraft.id, input.draftId));
        } else {
          await ctx.db
            .insert(onboardingDraft)
            .values({ id: draftId, ...values });
        }

        return { draftId, identity: values };
      } catch (error) {
        providerErrorToTrpc(error, "NIN verification failed");
      }
    }),

  initiateTelco: publicProcedure
    .input(
      z.object({
        draftId: z.string(),
        phone: phoneSchema,
        provider: telcoProviderSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!env.MONO_SECRET_KEY) {
        throw new Error("MONO_SECRET_KEY is not configured. Contact support.");
      }

      try {
        const response = await initiateTelcoLogin(input);
        await ctx.db
          .update(onboardingDraft)
          .set({
            phone: input.phone,
            monoTelcoSessionId: response.sessionId,
            raw: { monoTelcoLogin: response.raw },
            updatedAt: new Date(),
          })
          .where(eq(onboardingDraft.id, input.draftId));

        return { sessionId: response.sessionId };
      } catch (error) {
        providerErrorToTrpc(error, "Unable to send phone OTP");
      }
    }),

  verifyTelco: publicProcedure
    .input(z.object({ draftId: z.string(), otp: z.string().regex(/^\d{6}$/) }))
    .mutation(async ({ ctx, input }) => {
      if (!env.MONO_SECRET_KEY) {
        throw new Error("MONO_SECRET_KEY is not configured. Contact support.");
      }

      const draft = await ctx.db.query.onboardingDraft.findFirst({
        where: eq(onboardingDraft.id, input.draftId),
      });
      if (!draft) throw new Error("Onboarding draft not found");

      try {
        const verified = await verifyTelcoOtp({
          sessionId: draft.monoTelcoSessionId,
          otp: input.otp,
        });
        const exchanged = await exchangeMonoCode(verified.code);
        const identity = await fetchTelcoIdentity(exchanged.accountId);
        const monoName = String(
          identity.fullName ??
            identity.full_name ??
            (identity.data as Record<string, unknown> | undefined)?.fullName ??
            "",
        );
        const ninName = `${draft.firstName ?? ""} ${draft.lastName ?? ""}`;
        const flags = [...(draft.identityFlags ?? [])];
        if (monoName && stringSimilarity(ninName, monoName) < 0.7) {
          flags.push("identity_name_mismatch");
        }

        await ctx.db
          .update(onboardingDraft)
          .set({
            phoneConfirmed: true,
            monoTelcoAccountId: exchanged.accountId,
            identityFlags: Array.from(new Set(flags)),
            step: "bvn",
            raw: {
              monoTelcoVerify: verified.raw,
              monoTelcoExchange: exchanged.raw,
              monoTelcoIdentity: identity,
            },
            updatedAt: new Date(),
          })
          .where(eq(onboardingDraft.id, input.draftId));

        return { accountId: exchanged.accountId, flags };
      } catch (error) {
        providerErrorToTrpc(error, "Phone verification failed");
      }
    }),
});
