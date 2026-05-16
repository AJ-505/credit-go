from __future__ import annotations

import argparse

import joblib
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier

from ml_service.model.features import features_from_training_frame
from ml_service.paths import ARTIFACT_DIR, MODEL_PATH
from ml_service.training.datasets import load_training_frame


def train_model(sample_rows: int = 200_000, random_state: int = 42) -> None:
    df = load_training_frame(sample_rows, random_state)
    x, y = features_from_training_frame(df)
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.2, random_state=random_state, stratify=y
    )

    model = XGBClassifier(
        n_estimators=220,
        max_depth=5,
        learning_rate=0.08,
        subsample=0.85,
        colsample_bytree=0.85,
        eval_metric="auc",
        random_state=random_state,
        n_jobs=-1,
    )
    model.fit(x_train, y_train)

    predicted = model.predict(x_test)
    probabilities = model.predict_proba(x_test)[:, 1]
    ARTIFACT_DIR.mkdir(exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    print(f"saved_model={MODEL_PATH}")
    print(f"rows={len(x)} positives={int(y.sum())} positive_rate={y.mean():.4f}")
    print(f"auc={roc_auc_score(y_test, probabilities):.4f}")
    print(classification_report(y_test, predicted, digits=4))


def main() -> None:
    parser = argparse.ArgumentParser(description="Train the CreditGo XGBoost model.")
    parser.add_argument("--sample-rows", type=int, default=200_000)
    parser.add_argument("--random-state", type=int, default=42)
    args = parser.parse_args()
    train_model(args.sample_rows, args.random_state)


if __name__ == "__main__":
    main()
