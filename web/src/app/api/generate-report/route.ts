import { NextResponse } from "next/server";
import { generateCaseReportDocx } from "@/lib/docx-generator";
import type { AnalysisResult, LawMatchResult } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();
  const evidence = body.evidence ?? "";
  const analysis = (body.analysis ?? {}) as AnalysisResult;
  const law = (body.law ?? {}) as LawMatchResult;
  const cross = body.cross ?? "";

  const buffer = await generateCaseReportDocx(evidence, analysis, law, cross);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="case_report.docx"',
    },
  });
}
