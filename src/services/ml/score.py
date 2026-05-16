from __future__ import annotations

import argparse

from ml_service.model.inference import load_model, score_applicant


def main() -> None:
    parser = argparse.ArgumentParser(description="Score one CreditGo applicant.")
    parser.add_argument(
        "--persona",
        required=True,
        choices=[
            "freelancer",
            "government_official",
            "corporate_worker",
            "former_worker",
        ],
    )
    parser.add_argument("--monthly-income-ngn", type=float, required=True)
    parser.add_argument("--monthly-debt-ngn", type=float, default=0)
    parser.add_argument("--requested-amount-ngn", type=float, default=0)
    parser.add_argument("--tenor-days", type=float, default=30)
    parser.add_argument("--state", default="")
    parser.add_argument("--identity-verified", action="store_true")
    parser.add_argument("--employment-verified", action="store_true")
    parser.add_argument("--job-tenure-years", type=float, default=0)
    parser.add_argument("--bank-statement-months", type=float, default=0)
    parser.add_argument("--previous-loans-count", type=float, default=0)
    parser.add_argument("--credit-utilization", type=float, default=0.5)
    parser.add_argument("--delinquent-accounts", type=float, default=0)
    parser.add_argument("--active-accounts", type=float, default=0)
    args = parser.parse_args()

    payload = vars(args)
    model = load_model()
    print(score_applicant(model, payload))


if __name__ == "__main__":
    main()
