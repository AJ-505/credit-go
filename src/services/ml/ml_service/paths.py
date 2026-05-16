from __future__ import annotations

from pathlib import Path


SERVICE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = SERVICE_DIR / "training-data"
ARTIFACT_DIR = SERVICE_DIR / "artifacts"
MODEL_PATH = ARTIFACT_DIR / "credit_xgb.joblib"
