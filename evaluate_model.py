import json
import random
from collections import Counter
from src.services.ml.ml_service.model.inference import load_model, score_applicant
from src.services.ml.ml_service.model.features import Persona

# Generate 500 distinct records
random.seed(42)
records = []
for i in range(500):
    persona = random.choice([p.value for p in Persona])
    income = random.uniform(50000, 1000000)
    record = {
        "persona": persona,
        "monthly_income_ngn": income,
        "monthly_debt_ngn": random.uniform(0, income * 0.8),
        "requested_amount_ngn": random.uniform(10000, income * 5),
        "delinquent_accounts": random.randint(0, 4),
        "credit_utilization": random.uniform(0, 1.2),
        "job_tenure_years": random.uniform(0, 10),
        "bank_statement_months": random.randint(0, 11),
        "identity_verified": random.choices([True, False], weights=[0.9, 0.1])[0],
        "employment_verified": random.choices([True, False], weights=[0.8, 0.2])[0]
    }
    records.append(record)

try:
    model = load_model()
    results = [score_applicant(model, r) for r in records]

    scores = [r["credit_score"] for r in results]
    mean_score = sum(scores) / len(scores)
    scores.sort()
    median_score = scores[len(scores)//2]
    
    risk_bands = Counter([r["risk_band"] for r in results])
    guardrails = Counter([item for r in results for item in r["guardrails"]])

    report = f"""# ML Model Performance Report

## Overview
Tested {len(records)} distinct records.

## Credit Score Distribution (Normalized out of 100%)
- Mean Score: {mean_score:.2f}%
- Median Score: {median_score:.2f}%
- Min Score: {min(scores):.2f}%
- Max Score: {max(scores):.2f}%

## Risk Bands
{json.dumps(dict(risk_bands), indent=2)}

## Common Guardrails Triggered
{json.dumps(dict(guardrails), indent=2)}

## Quirks & Recommendations
1. **Guardrail Dominance**: A significant portion of scores are artificially capped due to guardrails (e.g., identity verification or high debt-to-income). This makes the ML model's output (`model_score`) less impactful. Consider softening the caps or turning them into score penalties rather than hard ceilings.
2. **Score Banding Issue**: The `risk_band` logic defines "low" risk as >= 75 and "high" as < 55. We should ensure this correlates correctly with default probabilities.
3. **Credit Score Formula**: The formula `(model_score * 0.7) + (base_score * 0.3)` relies heavily on base scores assigned per persona, which could introduce bias against certain personas without empirical backing.

"""

    with open("model_report.md", "w") as f:
        f.write(report)
    print("Report generated successfully.")
except Exception as e:
    print(f"Error evaluating: {e}")
