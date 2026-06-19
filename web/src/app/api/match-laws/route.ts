import { NextResponse } from "next/server";
import { matchLawsToCase } from "@/lib/law-matching-engine";

export async function POST(request: Request) {
  const body = await request.json();
  const evidenceSummary = body.evidence_summary ?? "";
  const offence = body.offence ?? "";

  const result = matchLawsToCase(evidenceSummary, offence);
  return NextResponse.json(result);
}
