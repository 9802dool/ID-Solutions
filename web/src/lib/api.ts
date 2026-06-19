import type { AnalysisResult, LawMatchResult, ReportPayload } from "./types";

export async function runAnalysis(
  evidenceSummary: string,
  offence: string
): Promise<AnalysisResult> {
  const response = await fetch("/api/analyze-case", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ evidence_summary: evidenceSummary, offence }),
  });

  if (!response.ok) {
    throw new Error("Analysis request failed");
  }

  return response.json();
}

export async function downloadReport(data: ReportPayload): Promise<void> {
  const response = await fetch("/api/generate-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Report generation failed");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "case_report.docx";
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function buildCrossExamination(
  analysis: AnalysisResult,
  role: string = "officer"
): Promise<string> {
  const response = await fetch("/api/generate-cross", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analysis, role }),
  });

  if (!response.ok) {
    throw new Error("Cross-examination generation failed");
  }

  const data = await response.json();
  return data.cross_examination;
}

export async function matchLaws(
  evidenceSummary: string,
  offence: string
): Promise<LawMatchResult> {
  const response = await fetch("/api/match-laws", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ evidence_summary: evidenceSummary, offence }),
  });

  if (!response.ok) {
    throw new Error("Law matching request failed");
  }

  return response.json();
}

export async function runFullPipeline(
  evidenceSummary: string,
  offence: string,
  role: string = "officer"
): Promise<{
  analysis: AnalysisResult;
  law: LawMatchResult;
  cross: string;
}> {
  const law = await matchLaws(evidenceSummary, offence);
  const analysis = await runAnalysis(evidenceSummary, offence);
  const cross = await buildCrossExamination(analysis, role);
  return { analysis, law, cross };
}
