import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { resolveNuban } from "@/server/integrations/squad";
import { providerErrorToTrpc } from "@/server/integrations/http";
import { onboardingDraft } from "@/server/db/schema";

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

      await ctx.db
        .update(onboardingDraft)
        .set({
          email: input.email,
          bvn: input.bvn,
          step: "register",
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, input.draftId));

      return { queued: true };
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
