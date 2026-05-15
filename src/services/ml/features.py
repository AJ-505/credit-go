from __future__ import annotations

from enum import StrEnum
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
import pyarrow.parquet as pq


DATA_DIR = Path(__file__).parent / "training-data"
ARTIFACT_DIR = Path(__file__).parent / "artifacts"
MODEL_PATH = ARTIFACT_DIR / "credit_xgb.joblib"

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


def _sample_parquet(path: Path, sample_rows: int, random_state: int) -> pd.DataFrame:
    parquet_file = pq.ParquetFile(path)
    batches = []
    remaining = sample_rows
    for batch in parquet_file.iter_batches(batch_size=min(sample_rows, 50_000)):
        batches.append(batch.to_pandas())
        remaining -= batch.num_rows
        if remaining <= 0:
            break
    df = pd.concat(batches, ignore_index=True)
    if len(df) <= sample_rows:
        return df
    return df.sample(sample_rows, random_state=random_state)


def _state_bucket(value: Any) -> int:
    if not isinstance(value, str) or not value:
        return 2
    high_activity = {"Lagos", "FCT", "Rivers", "Oyo", "Ogun", "Kano"}
    return 0 if value in high_activity else 1


def _persona_from_payload(value: Any) -> Persona:
    if value == "salaried_worker":
        return Persona.corporate_worker
    return Persona(value or Persona.freelancer.value)


def _score_band(score: int) -> str:
    return "low" if score >= 75 else "medium" if score >= 55 else "high"


def load_training_frame(sample_rows: int = 200_000, random_state: int = 42) -> pd.DataFrame:
    bureau = _sample_parquet(
        DATA_DIR / "nigerian_credit_bureau_full.parquet", sample_rows, random_state
    )
    micro = _sample_parquet(
        DATA_DIR / "nigerian_micro_loans_full.parquet", sample_rows, random_state + 1
    )
    bnpl = _sample_parquet(
        DATA_DIR / "nigerian_bnpl_full.parquet", sample_rows, random_state + 2
    )
    sme = _sample_parquet(
        DATA_DIR / "nigerian_sme_loans_full.parquet", sample_rows, random_state + 3
    )

    micro = micro.rename(
        columns={"borrower_id": "customer_id", "borrower_state": "state"}
    )
    bnpl = bnpl.rename(columns={"customer_state": "state"})
    sme = sme.rename(
        columns={
            "business_id": "customer_id",
            "business_state": "state",
            "tenor_months": "tenor_months",
        }
    )
    sme["tenor_days"] = sme["tenor_months"] * 30

    credit_cols = [
        "customer_id",
        "credit_score",
        "total_debt_ngn",
        "active_accounts",
        "delinquent_accounts",
        "payment_history_months",
        "credit_utilization",
        "high_risk",
    ]
    bureau = (
        bureau[credit_cols]
        .rename(columns={"credit_score": "bureau_credit_score"})
        .groupby("customer_id", as_index=False)
        .agg(
            bureau_credit_score=("bureau_credit_score", "mean"),
            total_debt_ngn=("total_debt_ngn", "mean"),
            active_accounts=("active_accounts", "max"),
            delinquent_accounts=("delinquent_accounts", "max"),
            payment_history_months=("payment_history_months", "max"),
            credit_utilization=("credit_utilization", "mean"),
            high_risk=("high_risk", "max"),
        )
    )

    loan_frames = [
        micro[
            [
                "customer_id",
                "state",
                "principal_ngn",
                "tenor_days",
                "employment_type",
                "previous_loans_count",
                "credit_score",
                "default_90d",
            ]
        ],
        bnpl[
            [
                "customer_id",
                "state",
                "principal_ngn",
                "tenor_days",
                "first_time_customer",
                "credit_score",
                "default_90d",
            ]
        ].assign(
            employment_type="Freelancer",
            previous_loans_count=lambda x: np.where(x["first_time_customer"], 0, 1),
        ),
        sme[
            [
                "customer_id",
                "state",
                "principal_ngn",
                "tenor_days",
                "credit_score",
                "default_90d",
            ]
        ].assign(employment_type="Self-employed", previous_loans_count=2),
    ]

    loans = pd.concat(loan_frames, ignore_index=True, sort=False)
    joined = loans.merge(bureau, how="left", on="customer_id", validate="many_to_one")
    return joined


def build_features(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
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
    features["state_risk_bucket"] = df["state"].map(_state_bucket)

    default_90d = df["default_90d"].astype("boolean").fillna(False).astype(bool)
    high_risk = df["high_risk"].astype("boolean").fillna(False).astype(bool)
    y = (default_90d | high_risk).astype(int)
    return features[FEATURE_COLUMNS], y


def features_from_payload(payload: dict[str, Any]) -> pd.DataFrame:
    monthly_income = max(float(payload.get("monthly_income_ngn") or 0), 1.0)
    monthly_debt = max(float(payload.get("monthly_debt_ngn") or 0), 0.0)
    persona = _persona_from_payload(payload.get("persona", Persona.freelancer.value))
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
    row["state_risk_bucket"] = _state_bucket(payload.get("state"))
    return pd.DataFrame([row], columns=FEATURE_COLUMNS)


def score_from_probability(default_probability: float) -> int:
    return int(round(np.clip(100 * (1 - default_probability), 0, 100)))


def score_applicant(model: Any, payload: dict[str, Any]) -> dict[str, float | int | str | list[str]]:
    x = features_from_payload(payload)
    default_probability = float(model.predict_proba(x)[:, 1][0])
    model_score = score_from_probability(default_probability)
    persona = _persona_from_payload(payload.get("persona", Persona.freelancer.value))
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
        "risk_band": _score_band(score),
        "guardrails": reasons,
    }


def load_model() -> Any:
    return joblib.load(MODEL_PATH)
