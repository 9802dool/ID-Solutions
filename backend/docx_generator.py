from docx import Document
from datetime import datetime


def generate_case_report(evidence_summary, analysis, recommendations, cross_examination):
    doc = Document()

    doc.add_heading("TTPS Case Analysis Report", level=1)
    doc.add_paragraph(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    doc.add_heading("1. Evidence Summary", level=2)
    doc.add_paragraph(evidence_summary)

    doc.add_heading("2. Legal Analysis", level=2)
    doc.add_paragraph(analysis)

    doc.add_heading("3. Strengths & Weaknesses", level=2)
    doc.add_paragraph(recommendations)

    doc.add_heading("4. King's Counsel Style Cross-Examination", level=2)
    doc.add_paragraph(cross_examination)

    filename = "case_report.docx"
    doc.save(filename)
    return filename
