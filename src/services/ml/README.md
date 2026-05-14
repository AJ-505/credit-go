# CreditGo ML Service

Python/FastAPI microservice for Nigerian credit risk scoring.

The checked-in training files are Parquet datasets under `training-data/`. Use
`parquet-tools inspect training-data/<file>.parquet` to inspect the column types.

## Setup

```bash
cd src/services/ml
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Train

The first run samples each Parquet file, joins compatible borrower-level records,
and trains an XGBoost classifier. The model is saved to `artifacts/`.

```bash
python train_model.py --sample-rows 200000
```

## Score From CLI

```bash
python score.py --persona freelancer \
  --monthly-income-ngn 650000 \
  --monthly-debt-ngn 120000 \
  --requested-amount-ngn 400000 \
  --tenor-days 90 \
  --state Lagos \
  --identity-verified \
  --job-tenure-years 3 \
  --bank-statement-months 12 \
  --previous-loans-count 3
```

## Score From API

Start the service only when you need it:

```bash
uvicorn main:app --reload --port 8000
```

Then test it:

```bash
curl -s http://localhost:8000/score \
  -H 'content-type: application/json' \
  -d '{
    "persona": "government_official",
    "monthly_income_ngn": 850000,
    "monthly_debt_ngn": 180000,
    "requested_amount_ngn": 600000,
    "tenor_days": 180,
    "state": "FCT",
    "identity_verified": true,
    "employment_verified": true,
    "job_tenure_years": 7,
    "bank_statement_months": 18,
    "previous_loans_count": 4
  }'
```

## Nigeria Verification Assumptions

This service does not call live verification APIs. It expects other services to
send verified booleans/features.

- Identity: use BVN/NIN/vNIN validation via regulated Nigerian identity rails.
- Government workers: verify staff status through employer records or official
  payroll/HR evidence before treating employment as stable.
- Corporate workers: verify employer, role, and job tenure before treating
  monthly income as stable.
- Freelancers/former workers: avoid assuming payroll stability; rely more on
  bank statement history, repayment history, identity checks, income
  consistency, requested loan tenor, and requested amount versus income.

Fresh onboarding should not require a bureau score. The live scoring payload is
designed around information we can collect or verify during onboarding:
persona, identity verification, employment verification where applicable, job
tenure, monthly income, current monthly obligations, requested amount, requested
tenor, state, bank-statement depth, and previous repayment count. Bureau-derived
fields such as delinquent accounts can be added later as optional integration
signals.

The synthetic Hugging Face datasets are useful for bootstrapping, not final
production calibration.
