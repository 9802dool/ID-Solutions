from fastapi import APIRouter
from pydantic import BaseModel
from cross_examination import generate_cross_examination

router = APIRouter()


class CrossRequest(BaseModel):
    analysis: dict
    role: str = "officer"  # 'officer' or 'witness'


@router.post("/generate-cross")
def generate_cross(request: CrossRequest):
    text = generate_cross_examination(request.analysis, request.role)
    return {"cross_examination": text}
