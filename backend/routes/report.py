from fastapi import APIRouter
from fastapi.responses import FileResponse
from docx_generator import generate_case_report

router = APIRouter()


@router.post("/generate-report")
def generate_report(payload: dict):
    evidence = payload.get("evidence", "")
    analysis = payload.get("analysis", {})
    law = payload.get("law", {})
    cross = payload.get("cross", "")

    filename = generate_case_report(evidence, analysis, law, cross)
    return FileResponse(
        filename,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )
