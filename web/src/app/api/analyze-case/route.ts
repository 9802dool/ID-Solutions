import { NextResponse } from "next/server";
import { analyzeEvidence } from "@/lib/analysis-engine";

export async function POST(request: Request) {
  const body = await request.json();
  const evidenceSummary = body.evidence_summary ?? "";
  const offence = body.offence ?? "";

  const result = analyzeEvidence(evidenceSummary, offence);
  return NextResponse.json(result);
}
