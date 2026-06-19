import { NextResponse } from "next/server";
import { generateCrossExamination } from "@/lib/cross-examination";
import type { AnalysisResult } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();
  const analysis = body.analysis as AnalysisResult;
  const role = body.role ?? "officer";

  const text = generateCrossExamination(analysis, role);
  return NextResponse.json({ cross_examination: text });
}
