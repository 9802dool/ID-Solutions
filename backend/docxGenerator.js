const { Document, Packer, Paragraph, HeadingLevel } = require("docx");
const fs = require("fs");

async function generateCaseReport(evidence, analysis, recommendations, cross) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "TTPS Case Analysis Report",
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph(" "),
          new Paragraph({
            text: "1. Evidence Summary",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(evidence),
          new Paragraph({
            text: "2. Legal Analysis",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(analysis),
          new Paragraph({
            text: "3. Strengths & Weaknesses",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(recommendations),
          new Paragraph({
            text: "4. King's Counsel Cross-Examination",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(cross),
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
