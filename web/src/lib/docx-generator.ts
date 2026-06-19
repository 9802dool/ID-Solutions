import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
} from "docx";

export async function generateCaseReportDocx(
  evidence: string,
  analysis: string,
  recommendations: string,
  cross: string
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
          new Paragraph({ text: "1. Evidence Summary", heading: HeadingLevel.HEADING_1 }),
          new Paragraph(evidence),
          new Paragraph({ text: "2. Legal Analysis", heading: HeadingLevel.HEADING_1 }),
          new Paragraph(analysis),
          new Paragraph({
            text: "3. Strengths & Weaknesses",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(recommendations),
          new Paragraph({
            text: "4. King's Counsel Style Cross-Examination",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(cross),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}
