


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

export async function scoreProfile(_input: ScoreInput): Promise<ScoreResult> {
  return {
    trust_score: 71,
    default_probability: 0.08,
    safe_limit_ngn: 1077300,
    tier: "gold",
    shap_explanation: {
      base_trust_score: 50,
      identity_verified: 10,
      employment_verified: 5,
      bank_statement_months: 6,
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
