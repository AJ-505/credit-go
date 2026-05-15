import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { onboardingDraft, user } from "@/server/db/schema";
import { scoreProfile } from "@/server/integrations/ml";

export const mlRouter = createTRPCRouter({
  scoreMe: protectedProcedure.mutation(async ({ ctx }) => {
    const current = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });
    if (!current) throw new Error("User not found");

    const persona = current.persona ?? "former_worker";
    const monthlyIncome = current.monthlyIncomeNgn ?? 0;
    const monthlyDebt = current.monthlyDebtNgn ?? 0;
    const score = await scoreProfile({
      persona,
      monthly_income_ngn: monthlyIncome,
      monthly_debt_ngn: monthlyDebt,
      requested_amount_ngn: 0,
      tenor_days: 30,
      state: current.residenceState ?? "",
      identity_verified: current.identityVerified,
      employment_verified: current.employmentVerified,
      job_tenure_years: current.jobTenureYears ?? 0,
      bank_statement_months: current.bankStatementMonths ?? 0,
      previous_loans_count: 0,
      credit_utilization:
        monthlyIncome > 0 ? Math.min(monthlyDebt / monthlyIncome, 1) : 0,
      delinquent_accounts: 0,
      active_accounts: 0,
    });

    const status =
      score.default_probability > 0.9 ? "pending_review" : "active";
    await ctx.db
      .update(user)
      .set({
        trustScore: score.trust_score,
        safeLimitNgn: score.safe_limit_ngn,
        tier: score.tier,
        scoreBreakdown: score.shap_explanation,
        scoreLastUpdated: new Date(),
        onboardingCompleted: status === "active",
        onboardingStep: status === "active" ? "completed" : "pending_review",
        status,
        updatedAt: new Date(),
      })
      .where(eq(user.id, ctx.session.user.id));

    const draft = await ctx.db.query.onboardingDraft.findFirst({
      where: eq(onboardingDraft.userId, ctx.session.user.id),
      orderBy: (table, { desc }) => [desc(table.createdAt)],
    });
    if (draft) {
      await ctx.db
        .update(onboardingDraft)
        .set({
          trustScore: score.trust_score,
          safeLimitNgn: score.safe_limit_ngn,
          tier: score.tier,
          scoreBreakdown: score.shap_explanation,
          step: status === "active" ? "completed" : "pending_review",
          updatedAt: new Date(),
        })
        .where(eq(onboardingDraft.id, draft.id));
    }

    return score;
  }),
});
