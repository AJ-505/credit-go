from __future__ import annotations

from enum import StrEnum
from typing import Any

import numpy as np
import pandas as pd


FEATURE_COLUMNS = [
    "base_trust_score",
    "persona_former_worker",
    "persona_freelancer",
    "persona_government_official",
    "persona_corporate_worker",
    "identity_verified",
    "employment_verified",
    "job_tenure_years",
    "bank_statement_months",
    "income_log",
    "debt_to_income",
    "previous_loans_count",
    "credit_utilization",
    "delinquent_accounts",
    "active_accounts",
    "loan_amount_to_income",
    "tenor_days",
    "state_risk_bucket",
]


class Persona(StrEnum):
    freelancer = "freelancer"
    government_official = "government_official"
    former_worker = "former_worker"
    corporate_worker = "corporate_worker"


BASE_TRUST_SCORES = {
    Persona.freelancer: 45,
    Persona.government_official: 60,
    Persona.corporate_worker: 55,
    Persona.former_worker: 35,
}

CLIP_BOUNDS = {
    "bank_statement_months": (0, 60),
    "debt_to_income": (0, 5.0),
    "previous_loans_count": (0, 30),
    "credit_utilization": (0, 1.5),
    "delinquent_accounts": (0, 20),
    "active_accounts": (0, 50),
    "loan_amount_to_income": (0, 24.0),
    "tenor_days": (1, 3650),
}


def state_bucket(value: Any) -> int:
    """
    Buckets states by economic volume to help the model assess baseline regional risk:
    - 0: Major economic hubs with higher average liquidity and distinct credit behaviors.
    - 1: Other regions representing the standard economic baseline.
    - 2: Missing or invalid state data, kept distinct to flag uncertainty to the model.
    """
    if not isinstance(value, str) or not value:
        return 2
    value = value.strip().title()
    high_activity = {"Lagos", "Fct", "Rivers", "Oyo", "Ogun", "Kano"}
    return 0 if value in high_activity else 1


def persona_from_payload(value: Any) -> Persona:
    if value == "salaried_worker":
        return Persona.corporate_worker
    return Persona(value or Persona.freelancer.value)


def features_from_training_frame(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    employment = df.get("employment_type", pd.Series(index=df.index, dtype="object")).fillna("")
    persona = np.select(
        [
            employment.str.contains("government|civil", case=False, na=False),
            employment.str.contains("private|corporate|salaried", case=False, na=False),
            employment.str.contains("unemployed|retired|former", case=False, na=False),
        ],
        [
            Persona.government_official.value,
            Persona.corporate_worker.value,
            Persona.former_worker.value,
        ],
        default=Persona.freelancer.value,
    )

    monthly_income = np.maximum(
        df["principal_ngn"].fillna(0) * 3.0,
        df["total_debt_ngn"].fillna(df["principal_ngn"]) / 6.0,
    ).clip(lower=50_000)
    monthly_debt = df["total_debt_ngn"].fillna(df["principal_ngn"] * 0.4) / 12.0

    features = pd.DataFrame(index=df.index)
    features["base_trust_score"] = pd.Series(persona, index=df.index).map(
        {key.value: value for key, value in BASE_TRUST_SCORES.items()}
    )
    for value in Persona:
        features[f"persona_{value.value}"] = (persona == value.value).astype(int)
    features["identity_verified"] = 1
    features["employment_verified"] = (
        (persona == Persona.government_official.value)
        | (persona == Persona.corporate_worker.value)
    ).astype(int)
    features["job_tenure_years"] = np.select(
        [
            persona == Persona.government_official.value,
            persona == Persona.corporate_worker.value,
            persona == Persona.former_worker.value,
        ],
        [6, 4, 0],
        default=2,
    )
    features["bank_statement_months"] = df["payment_history_months"].fillna(6).clip(*CLIP_BOUNDS["bank_statement_months"])
    features["income_log"] = np.log1p(monthly_income)
    features["debt_to_income"] = (monthly_debt / monthly_income).clip(*CLIP_BOUNDS["debt_to_income"])
    features["previous_loans_count"] = df["previous_loans_count"].fillna(0).clip(*CLIP_BOUNDS["previous_loans_count"])
    features["credit_utilization"] = df["credit_utilization"].fillna(0.5).clip(*CLIP_BOUNDS["credit_utilization"])
    features["delinquent_accounts"] = df["delinquent_accounts"].fillna(0).clip(*CLIP_BOUNDS["delinquent_accounts"])
    features["active_accounts"] = df["active_accounts"].fillna(0).clip(*CLIP_BOUNDS["active_accounts"])
    features["loan_amount_to_income"] = (df["principal_ngn"].fillna(0) / monthly_income).clip(*CLIP_BOUNDS["loan_amount_to_income"])
    features["tenor_days"] = df["tenor_days"].fillna(30).clip(*CLIP_BOUNDS["tenor_days"])
    features["state_risk_bucket"] = df["state"].map(state_bucket)

    default_90d = df["default_90d"].astype("boolean").fillna(False).astype(bool)
    high_risk = df["high_risk"].astype("boolean").fillna(False).astype(bool)
    y = (default_90d | high_risk).astype(int)
    return features[FEATURE_COLUMNS], y


def features_from_payload(payload: dict[str, Any]) -> pd.DataFrame:
    monthly_income = max(float(payload.get("monthly_income_ngn") or 0), 1.0)
    monthly_debt = max(float(payload.get("monthly_debt_ngn") or 0), 0.0)
    persona = persona_from_payload(payload.get("persona", Persona.freelancer.value))
    row = {column: 0.0 for column in FEATURE_COLUMNS}
    row["base_trust_score"] = float(
        payload.get("base_trust_score") or BASE_TRUST_SCORES[persona]
    )
    row[f"persona_{persona.value}"] = 1.0
    row["identity_verified"] = float(int(bool(payload.get("identity_verified", False))))
    row["employment_verified"] = float(int(bool(payload.get("employment_verified", False))))
    row["job_tenure_years"] = float(payload.get("job_tenure_years") or 0.0)
    
    row["bank_statement_months"] = np.clip(float(payload.get("bank_statement_months") or 0.0), *CLIP_BOUNDS["bank_statement_months"])
    row["income_log"] = np.log1p(monthly_income)
    row["debt_to_income"] = np.clip(monthly_debt / monthly_income, *CLIP_BOUNDS["debt_to_income"])
    row["previous_loans_count"] = np.clip(float(payload.get("previous_loans_count") or 0.0), *CLIP_BOUNDS["previous_loans_count"])
    
    cu_val = payload.get("credit_utilization")
    row["credit_utilization"] = np.clip(float(0.35 if cu_val is None else cu_val), *CLIP_BOUNDS["credit_utilization"])
    
    row["delinquent_accounts"] = np.clip(float(payload.get("delinquent_accounts") or 0.0), *CLIP_BOUNDS["delinquent_accounts"])
    row["active_accounts"] = np.clip(float(payload.get("active_accounts") or 0.0), *CLIP_BOUNDS["active_accounts"])
    row["loan_amount_to_income"] = np.clip(float(payload.get("requested_amount_ngn") or 0.0) / monthly_income, *CLIP_BOUNDS["loan_amount_to_income"])
    row["tenor_days"] = np.clip(float(payload.get("tenor_days") or 30.0), *CLIP_BOUNDS["tenor_days"])
    
    row["state_risk_bucket"] = float(state_bucket(payload.get("state")))
    return pd.DataFrame([row], columns=FEATURE_COLUMNS)
