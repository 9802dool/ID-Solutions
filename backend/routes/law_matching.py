from fastapi import APIRouter
from pydantic import BaseModel
from law_matching_engine import match_laws_to_case

router = APIRouter()


class LawMatchRequest(BaseModel):
    evidence_summary: str
    offence: str


@router.post("/match-laws")
def match_laws(request: LawMatchRequest):
    result = match_laws_to_case(request.evidence_summary, request.offence)
    return result
