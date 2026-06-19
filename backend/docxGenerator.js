const { Document, Packer, Paragraph, HeadingLevel } = require("docx");
const fs = require("fs");

function formatAnalysis(analysisResult) {
  const lines = [
    `Offence: ${analysisResult.offence ?? ""}`,
    `Overall strength: ${analysisResult.overall_strength ?? ""}`,
    "",
    "Element-by-element assessment:",
  ];
  for (const el of analysisResult.elements_analysis ?? []) {
    lines.push(
      `- ${el.element}: ${(el.strength ?? "").toUpperCase()} — ${el.details ?? ""}`
    );
  }
  const recs = analysisResult.recommendations ?? [];
  if (recs.length) {
    lines.push("", "Recommendations:");
    for (const rec of recs) lines.push(`- ${rec}`);
  }
  return lines.join("\n");
}

function formatLaw(lawResult) {
  const lines = [
    `Offence: ${lawResult.offence ?? ""}`,
    "",
    "Applicable statutes:",
  ];
  for (const s of lawResult.statutes ?? []) lines.push(`- ${s}`);
  lines.push("", "Statutory elements:");
  for (const e of lawResult.elements ?? []) lines.push(`- ${e}`);
  const matched = lawResult.matched_elements ?? [];
  if (matched.length) {
    lines.push("", "Matched elements (supported by evidence):");
    for (const e of matched) lines.push(`- ${e}`);
  }
  const unmatched = lawResult.unmatched_elements ?? [];
  if (unmatched.length) {
    lines.push("", "Missing / unmatched elements:");
    for (const e of unmatched) lines.push(`- ${e}`);
  }
  const checks = lawResult.procedural_checks ?? [];
  if (checks.length) {
    lines.push("", "Procedural checks:");
    for (const c of checks) lines.push(`- ${c}`);
  }
  if (lawResult.notes) lines.push("", `Note: ${lawResult.notes}`);
  return lines.join("\n");
}

function extractCross(cross) {
  if (cross && typeof cross === "object") return cross.cross_examination ?? "";
  return cross ?? "";
}

async function generateCaseReport(evidence, analysisResult, lawResult, cross) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "TTPS Case Analysis Report",
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph(`Generated: ${new Date().toLocaleString()}`),
          new Paragraph({
            text: "1. Evidence Summary",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(evidence),
          new Paragraph({
            text: "2. Applicable Law & Statutes",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(formatLaw(lawResult)),
          new Paragraph({
            text: "3. Case Analysis — Strengths & Weaknesses",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(formatAnalysis(analysisResult)),
          new Paragraph({
            text: "4. King's Counsel Style Cross-Examination",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(extractCross(cross)),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = "case_report.docx";
  fs.writeFileSync(filename, buffer);
  return filename;
}

module.exports = generateCaseReport;
