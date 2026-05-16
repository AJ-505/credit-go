from __future__ import annotations

from typing import Any

import joblib
import numpy as np

from ml_service.model.features import (
    BASE_TRUST_SCORES,
    Persona,
    features_from_payload,
    persona_from_payload,
)
from ml_service.paths import MODEL_PATH


def load_model() -> Any:
    return joblib.load(MODEL_PATH)


def score_from_probability(default_probability: float) -> int:
    return int(round(np.clip(100 * (1 - default_probability), 0, 100)))


def score_band(score: int) -> str:
    return "low" if score >= 75 else "medium" if score >= 55 else "high"


def score_applicant(model: Any, payload: dict[str, Any]) -> dict[str, float | int | str | list[str]]:
    x = features_from_payload(payload)
    default_probability = float(model.predict_proba(x)[:, 1][0])
    model_score = score_from_probability(default_probability)
    persona = persona_from_payload(payload.get("persona", Persona.freelancer.value))
    base_score = int(float(payload.get("base_trust_score") or BASE_TRUST_SCORES[persona]))

    score = round((model_score * 0.7) + (base_score * 0.3))
    reasons: list[str] = []
    monthly_income = max(float(payload.get("monthly_income_ngn") or 0), 1.0)
    monthly_debt = max(float(payload.get("monthly_debt_ngn") or 0), 0.0)
    requested_amount = max(float(payload.get("requested_amount_ngn") or 0), 0.0)
    debt_to_income = monthly_debt / monthly_income
    loan_to_income = requested_amount / monthly_income
    delinquent_accounts = float(payload.get("delinquent_accounts") or 0)
    credit_utilization = float(payload.get("credit_utilization") or 0)
    job_tenure_years = float(payload.get("job_tenure_years") or 0)
    bank_statement_months = float(payload.get("bank_statement_months") or 0)

    if not payload.get("identity_verified", False):
        score = min(score, 54)
        reasons.append("identity_not_verified")
    if persona in {Persona.government_official, Persona.corporate_worker} and not payload.get(
        "employment_verified", False
    ):
        score = min(score, 59)
        reasons.append("employment_not_verified")
    if debt_to_income >= 0.75:
        score = min(score, 49)
        reasons.append("very_high_debt_to_income")
    elif debt_to_income >= 0.45:
        score = min(score, 64)
        reasons.append("high_debt_to_income")
    if loan_to_income >= 4:
        score = min(score, 49)
        reasons.append("request_too_large_for_income")
    elif loan_to_income >= 2:
        score = min(score, 64)
        reasons.append("large_request_for_income")
    if delinquent_accounts >= 3:
        score = min(score, 44)
        reasons.append("multiple_delinquent_accounts")
    elif delinquent_accounts >= 1:
        score = min(score, 69)
        reasons.append("delinquent_accounts_present")
    if credit_utilization >= 0.9:
        score = min(score, 59)
        reasons.append("high_credit_utilization")
    if bank_statement_months < 3:
        score = min(score, 64)
        reasons.append("thin_bank_statement_history")
    if persona in {Persona.government_official, Persona.corporate_worker} and job_tenure_years < 1:
        score = min(score, 64)
        reasons.append("short_job_tenure")

    score = int(np.clip(score, 0, 100))
    return {
        "credit_score": score,
        "base_trust_score": base_score,
        "model_score": model_score,
        "default_probability": round(default_probability, 4),
        "risk_band": score_band(score),
        "guardrails": reasons,
    }
