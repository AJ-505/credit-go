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


def state_bucket(value: Any) -> int:
    if not isinstance(value, str) or not value:
        return 2
    high_activity = {"Lagos", "FCT", "Rivers", "Oyo", "Ogun", "Kano"}
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
    features["bank_statement_months"] = df["payment_history_months"].fillna(6).clip(0, 60)
    features["income_log"] = np.log1p(monthly_income)
    features["debt_to_income"] = (monthly_debt / monthly_income).clip(0, 5)
    features["previous_loans_count"] = df["previous_loans_count"].fillna(0).clip(0, 30)
    features["credit_utilization"] = df["credit_utilization"].fillna(0.5).clip(0, 1.5)
    features["delinquent_accounts"] = df["delinquent_accounts"].fillna(0).clip(0, 20)
    features["active_accounts"] = df["active_accounts"].fillna(0).clip(0, 50)
    features["loan_amount_to_income"] = (df["principal_ngn"].fillna(0) / monthly_income).clip(0, 24)
    features["tenor_days"] = df["tenor_days"].fillna(30).clip(1, 3650)
    features["state_risk_bucket"] = df["state"].map(state_bucket)

    default_90d = df["default_90d"].astype("boolean").fillna(False).astype(bool)
    high_risk = df["high_risk"].astype("boolean").fillna(False).astype(bool)
    y = (default_90d | high_risk).astype(int)
    return features[FEATURE_COLUMNS], y


def features_from_payload(payload: dict[str, Any]) -> pd.DataFrame:
    monthly_income = max(float(payload.get("monthly_income_ngn") or 0), 1.0)
    monthly_debt = max(float(payload.get("monthly_debt_ngn") or 0), 0.0)
    persona = persona_from_payload(payload.get("persona", Persona.freelancer.value))
    row = {column: 0 for column in FEATURE_COLUMNS}
    row["base_trust_score"] = float(
        payload.get("base_trust_score") or BASE_TRUST_SCORES[persona]
    )
    row[f"persona_{persona.value}"] = 1
    row["identity_verified"] = int(bool(payload.get("identity_verified", False)))
    row["employment_verified"] = int(bool(payload.get("employment_verified", False)))
    row["job_tenure_years"] = float(payload.get("job_tenure_years") or 0)
    row["bank_statement_months"] = float(payload.get("bank_statement_months") or 0)
    row["income_log"] = np.log1p(monthly_income)
    row["debt_to_income"] = min(monthly_debt / monthly_income, 5.0)
    row["previous_loans_count"] = float(payload.get("previous_loans_count") or 0)
    row["credit_utilization"] = float(payload.get("credit_utilization") or 0.35)
    row["delinquent_accounts"] = float(payload.get("delinquent_accounts") or 0)
    row["active_accounts"] = float(payload.get("active_accounts") or 0)
    row["loan_amount_to_income"] = float(payload.get("requested_amount_ngn") or 0) / monthly_income
    row["tenor_days"] = float(payload.get("tenor_days") or 30)
    row["state_risk_bucket"] = state_bucket(payload.get("state"))
    return pd.DataFrame([row], columns=FEATURE_COLUMNS)
