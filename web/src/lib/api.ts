import type { AnalysisResult, ReportPayload } from "./types";

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
