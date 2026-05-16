# ML Model Performance Report

## Overview
This report evaluates the credit-go ML model scoring logic, simulating 500 distinct records to identify quirks and potential improvements.

## Quirks & Findings

1. **Guardrail Dominance (Hard Caps)**
   The `inference.py` scoring heavily relies on strict upper bounds (`min(score, X)`). For example, if a user's identity is not verified, their score is hard-capped at 54, regardless of their actual default probability or base score. High debt-to-income caps the score at 49. This overrides the model's actual predictive capability in many scenarios, making the ML component less impactful.

2. **Penalty Stacking**
   Guardrails are applied sequentially but they are hard caps. If multiple negative conditions are met (e.g., `loan_to_income >= 4` capping at 49, and `identity_not_verified` capping at 54), the lowest cap applies. However, a user with slightly bad metrics in multiple areas might score higher than someone with one terrible metric, because the caps don't compound nicely like a weighted penalty system would.

3. **Inconsistent Risk Band Definitions**
   - High Risk: < 55
   - Medium Risk: 55 - 74
   - Low Risk: >= 75
   The `identity_not_verified` cap is 54, which instantly forces the user into the "High Risk" band. While this might be intentional, it completely bypasses the ML risk prediction.

4. **Base Trust Score Overweighting**
   The final score is `(model_score * 0.7) + (base_score * 0.3)`. The base score is derived from the user's Persona. This means 30% of a user's credit score is dictated purely by their job type (e.g., government official vs. freelancer), which could introduce significant bias or fairness issues.

## Recommendations for Improvement

1. **Move from Hard Caps to Penalty Weights**
   Instead of hard limits (`min(score, 54)`), consider applying percentage-based or point-based penalties (e.g., `-15 points for unverified identity`). This allows the ML model's nuance to still shine through while penalizing risky behavior.

2. **Refine Persona Base Scores**
   Evaluate if giving 30% weight to persona-based scores is empirically justified by historical default rates, or if it's an arbitrary bias. The model itself should ideally learn the risk of different employment types, reducing the need for a manual base score override.

3. **Enhance Feature Engineering**
   The logic currently checks `requested_amount_ngn / monthly_income_ngn`. Ensure `monthly_income_ngn` is always greater than 0 to prevent division by zero (currently using `max(..., 1.0)`, which is safe but masks bad data).

4. **Continuous Monitoring**
   Track how often the "guardrails" actually trigger in production versus the ML model score. If guardrails determine the final score 80% of the time, the ML model needs retraining or the guardrails need relaxing.
