import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  createVirtualAccount,
  resolveNuban,
} from "@/server/integrations/squad";
import { providerErrorToTrpc } from "@/server/integrations/http";
import { onboardingDraft } from "@/server/db/schema";
import { makeId, ninToSquadDob, squadGender } from "@/server/onboarding/utils";

export const paymentRouter = createTRPCRouter({
  createVault: publicProcedure
    .input(
      z.object({
        draftId: z.string(),
        bvn: z.string().regex(/^\d{11}$/, "BVN must be exactly 11 digits"),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const draft = await ctx.db.query.onboardingDraft.findFirst({
        where: eq(onboardingDraft.id, input.draftId),
      });
      if (!draft) throw new Error("Onboarding draft not found");

      try {
        const customerIdentifier = makeId("cg");
        const response = await createVirtualAccount({
          firstName: draft.firstName ?? "",
          lastName: draft.lastName ?? "",
          middleName: draft.middleName,
          mobileNum: draft.phone ?? "",
          dob: ninToSquadDob(draft.birthdate),
          gender: squadGender(draft.gender),
          address: [draft.residenceAddress, draft.residenceTown]
            .filter(Boolean)
            .join(", "),
          email: input.email,
          bvn: input.bvn,
          customerIdentifier,
        });

        await ctx.db
          .update(onboardingDraft)
          .set({
            email: input.email,
            bvn: input.bvn,
            squadVirtualAccount: response.virtualAccountNumber,
            squadCustomerIdentifier: response.customerIdentifier,
            step: "register",
            raw: { squadVault: response.raw },
            updatedAt: new Date(),
          })
          .where(eq(onboardingDraft.id, input.draftId));

        return response;
      } catch (error) {
        providerErrorToTrpc(error, "Vault creation failed");
      }
    }),

  skipVault: publicProcedure
    .input(
      z.object({ draftId: z.string(), email: z.string().email().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(onboardingDraft)
        .set({
          email: input.email,
          step: "register",
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, input.draftId));
      return { skipped: true };
    }),

  resolveNuban: publicProcedure
    .input(
      z.object({
        bankCode: z.string().min(3),
        accountNumber: z.string().regex(/^\d{10}$/),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await resolveNuban(input);
      } catch (error) {
        providerErrorToTrpc(error, "Account lookup failed");
      }
    }),
});
