import { env } from "@/env";
import {
  appBaseUrl,
  BASE_TRUST_SCORES,
  safeLimit,
  tierForScore,
} from "@/server/onboarding/utils";

import { apiFetch, ProviderApiError } from "./http";

export type ScoreInput = {
  persona: string;
  monthly_income_ngn: number;
  monthly_debt_ngn: number;
  requested_amount_ngn: number;
  tenor_days: number;
  state: string;
  identity_verified: boolean;
  employment_verified: boolean;
  job_tenure_years: number;
  bank_statement_months: number;
  previous_loans_count: number;
  credit_utilization: number;
  delinquent_accounts: number;
  active_accounts: number;
};

export type ScoreResult = {
  trust_score: number;
  default_probability: number;
  safe_limit_ngn: number;
  tier: string;
  shap_explanation: Record<string, number>;
  tier_ranges: Record<string, [number, number]>;
  timestamp: string;
  fallback: boolean;
};

export async function scoreProfile(input: ScoreInput): Promise<ScoreResult> {
  try {
    const mlUrl = env.ML_SERVICE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : "http://127.0.0.1:8000");
    const response = await apiFetch<Omit<ScoreResult, "fallback">>(
      `${mlUrl}/score`,
      {
        service: "ML scoring",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        timeoutMs: 12_000,
      },
    );

    return { ...response, fallback: false };
  } catch (error) {
    if (!(error instanceof ProviderApiError) || error.status < 500) {
      throw error;
    }
    const base =
      BASE_TRUST_SCORES[input.persona] ?? BASE_TRUST_SCORES.former_worker ?? 35;
    const trustScore = Math.min(
      100,
      Math.max(
        0,
        base +
          (input.identity_verified ? 10 : 0) +
          (input.employment_verified ? 10 : 0) +
          Math.min(10, input.bank_statement_months),
      ),
    );

    return {
      trust_score: trustScore,
      default_probability: Math.max(0.01, 1 - trustScore / 100),
      safe_limit_ngn: safeLimit(input.monthly_income_ngn, trustScore),
      tier: tierForScore(trustScore),
      shap_explanation: {
        base_trust_score: base,
        identity_verified: input.identity_verified ? 10 : 0,
        employment_verified: input.employment_verified ? 10 : 0,
        bank_statement_months: Math.min(10, input.bank_statement_months),
      },
      tier_ranges: {
        bronze: [0, 30],
        silver: [31, 55],
        gold: [56, 75],
        platinum: [76, 100],
      },
      timestamp: new Date().toISOString(),
      fallback: true,
    };
  }
}
