from __future__ import annotations

from fastapi import FastAPI

from ml_service.api.schemas import ScoreRequest
from ml_service.model.inference import load_model, score_applicant


app = FastAPI(title="CreditGo ML Service")
model = load_model()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/score")
def score(request: ScoreRequest) -> dict[str, float | int | str | list[str]]:
    return score_applicant(model, request.model_dump())
