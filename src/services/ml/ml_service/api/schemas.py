from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class ScoreRequest(BaseModel):
    persona: Literal[
        "freelancer",
        "government_official",
        "corporate_worker",
        "former_worker",
    ]
    monthly_income_ngn: float = Field(gt=0)
    monthly_debt_ngn: float = Field(default=0, ge=0)
    requested_amount_ngn: float = Field(default=0, ge=0)
    tenor_days: float = Field(default=30, gt=0)
    state: str = ""
    identity_verified: bool = False
    employment_verified: bool = False
    job_tenure_years: float = Field(default=0, ge=0)
    bank_statement_months: float = Field(default=0, ge=0)
    previous_loans_count: float = Field(default=0, ge=0)
    credit_utilization: float = Field(default=0.5, ge=0)
    delinquent_accounts: float = Field(default=0, ge=0)
    active_accounts: float = Field(default=0, ge=0)
