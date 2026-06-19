import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
} from "docx";
import type { AnalysisResult, LawMatchResult } from "./types";

function formatAnalysis(analysis: AnalysisResult): string {
  const lines = [
    `Offence: ${analysis.offence}`,
    `Overall strength: ${analysis.overall_strength}`,
    "",
    "Element-by-element assessment:",
  ];

  for (const el of analysis.elements_analysis) {
    lines.push(
      `- ${el.element}: ${el.strength.toUpperCase()} — ${el.details}`
    );
  }

  if (analysis.recommendations.length) {
    lines.push("", "Recommendations:");
    for (const rec of analysis.recommendations) {
      lines.push(`- ${rec}`);
    }
  }

  return lines.join("\n");
}

function formatLaw(law: LawMatchResult): string {
  const lines = [
    `Offence: ${law.offence}`,
    "",
    "Applicable statutes:",
  ];

  for (const statute of law.statutes) {
    lines.push(`- ${statute}`);
  }

  lines.push("", "Statutory elements:");
  for (const element of law.elements) {
    lines.push(`- ${element}`);
  }

  if (law.matched_elements.length) {
    lines.push("", "Matched elements (supported by evidence):");
    for (const element of law.matched_elements) {
      lines.push(`- ${element}`);
    }
  }

  if (law.unmatched_elements.length) {
    lines.push("", "Missing / unmatched elements:");
    for (const element of law.unmatched_elements) {
      lines.push(`- ${element}`);
    }
  }

  if (law.procedural_checks.length) {
    lines.push("", "Procedural checks:");
    for (const check of law.procedural_checks) {
      lines.push(`- ${check}`);
    }
  }

  if (law.notes) {
    lines.push("", `Note: ${law.notes}`);
  }

  return lines.join("\n");
}

function extractCross(
  cross: string | { cross_examination?: string }
): string {
  if (typeof cross === "object" && cross !== null) {
    return cross.cross_examination ?? "";
  }
  return cross;
}

export async function generateCaseReportDocx(
  evidence: string,
  analysis: AnalysisResult,
  law: LawMatchResult,
  cross: string | { cross_examination?: string }
): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "TTPS Case Analysis Report",
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Generated: ${new Date().toLocaleString()}`,
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            text: "1. Evidence Summary",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(evidence),
          new Paragraph({
            text: "2. Applicable Law & Statutes",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(formatLaw(law)),
          new Paragraph({
            text: "3. Case Analysis — Strengths & Weaknesses",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(formatAnalysis(analysis)),
          new Paragraph({
            text: "4. King's Counsel Style Cross-Examination",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(extractCross(cross)),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}
