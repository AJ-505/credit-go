from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd
import pyarrow.parquet as pq

from ml_service.paths import DATA_DIR


def sample_parquet(path: Path, sample_rows: int, random_state: int) -> pd.DataFrame:
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


def load_training_frame(sample_rows: int = 200_000, random_state: int = 42) -> pd.DataFrame:
    bureau = sample_parquet(
        DATA_DIR / "nigerian_credit_bureau_full.parquet", sample_rows, random_state
    )
    micro = sample_parquet(
        DATA_DIR / "nigerian_micro_loans_full.parquet", sample_rows, random_state + 1
    )
    bnpl = sample_parquet(
        DATA_DIR / "nigerian_bnpl_full.parquet", sample_rows, random_state + 2
    )
    sme = sample_parquet(
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
    return loans.merge(bureau, how="left", on="customer_id", validate="many_to_one")
