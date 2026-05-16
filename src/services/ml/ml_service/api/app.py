from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from ml_service.api.schemas import ScoreRequest
from ml_service.model.inference import load_model, score_applicant

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        app.state.model = load_model()
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        app.state.model = None
    yield
    app.state.model = None

app = FastAPI(title="CreditGo ML Service", lifespan=lifespan)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "model_loaded": app.state.model is not None}


@app.post("/score")
def score(request: ScoreRequest) -> dict[str, float | int | str | list[str]]:
    if app.state.model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return score_applicant(app.state.model, request.model_dump())
