from fastapi import APIRouter
from pydantic import BaseModel
from analysis_engine import analyze_evidence

router = APIRouter()


class AnalysisRequest(BaseModel):
    evidence_summary: str
    offence: str


@router.post("/analyze-case")
def analyze_case(request: AnalysisRequest):
    result = analyze_evidence(request.evidence_summary, request.offence)
    return result
