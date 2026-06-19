import type { AnalysisResult } from "./types";

export function generateCrossExamination(
  analysis: AnalysisResult,
  role: string = "officer"
): string {
  const offence = analysis.offence ?? "unknown offence";
  const elements = analysis.elements_analysis ?? [];
  const overall = analysis.overall_strength ?? "unknown";

  const lines: string[] = [];

  lines.push(`Cross-Examination Guide for ${offence.toUpperCase()}`);
  lines.push(`Overall case assessment: ${overall}`);
  lines.push("");

  lines.push("SECTION 1: GENERAL CASE QUESTIONS");
  if (role === "officer") {
    lines.push("- Officer, briefly explain the nature of this case and the main allegation.");
    lines.push("- What specific offence are you alleging was committed?");
    lines.push("- What steps did you personally take in this investigation?");
    lines.push("- How did you record and preserve your notes and observations?");
  } else {
    lines.push("- Please explain your relationship to the incident.");
    lines.push("- What did you first observe and when?");
    lines.push("- How certain are you about what you saw or heard?");
  }

  lines.push("");
  lines.push("SECTION 2: ELEMENT-BY-ELEMENT QUESTIONS");

  for (const elementInfo of elements) {
    const element = elementInfo.element ?? "";
    const strength = elementInfo.strength ?? "unknown";

    lines.push(`Element: ${element} (assessed as ${strength})`);

    if (role === "officer") {
      lines.push(`- Officer, what specific evidence supports the element: '${element}'?`);
      lines.push("- How did you verify the reliability of that evidence?");
      lines.push(`- Are there any gaps or uncertainties in proving '${element}'?`);
      if (strength === "weak" || strength === "medium") {
        lines.push(
          `- Would you agree that the evidence for '${element}' is not as strong as for other elements?`
        );
      }
    } else {
      lines.push(
        `- Tell the court what you personally observed that relates to: '${element}'.`
      );
      lines.push("- How clearly could you see or perceive what happened?");
      lines.push("- Did anything obstruct your view or affect your ability to observe?");
      if (strength === "weak" || strength === "medium") {
        lines.push(
          `- Is there anything that makes you unsure about what you observed regarding '${element}'?`
        );
      }
    }

    lines.push("");
  }

  lines.push("SECTION 3: IDENTIFICATION & TURNBULL-TYPE QUESTIONS");
  if (role === "officer") {
    lines.push("- Describe the lighting conditions at the scene at the time of observation.");
    lines.push("- How far were you from the suspect when you first saw him/her?");
    lines.push("- How long did you observe the suspect?");
    lines.push(
      "- Were there any obstructions, distractions, or stress factors affecting your observation?"
    );
    lines.push("- What steps did you take to ensure a fair and reliable identification procedure?");
  } else {
    lines.push("- How well could you see the person you are identifying?");
    lines.push("- How long did you see the person for?");
    lines.push("- Were you under any stress, fear, or distraction at the time?");
    lines.push("- Did anyone influence your identification in any way?");
  }

  lines.push("");
  lines.push("SECTION 4: PROCEDURE, NOTES & CHAIN OF CUSTODY");
  if (role === "officer") {
    lines.push("- When did you first make notes of this incident?");
    lines.push("- Were your notes made contemporaneously or later? Explain.");
    lines.push("- How were exhibits collected, labelled, and stored?");
    lines.push("- Who had access to the exhibits between seizure and court?");
    lines.push("- What systems are in place to prevent tampering or loss of exhibits?");
  } else {
    lines.push("- Did you see any police officer collect exhibits? Describe what you saw.");
    lines.push("- Did anyone show you any document or exhibit and ask you to confirm it?");
    lines.push("- Were you asked to sign any statement? When and under what circumstances?");
  }

  lines.push("");
  lines.push("SECTION 5: CONSTITUTIONAL & FAIRNESS ISSUES");
  if (role === "officer") {
    lines.push(
      "- At what time was the suspect arrested and at what time was he/she informed of the reason?"
    );
    lines.push("- Was the suspect cautioned? State the exact words used.");
    lines.push(
      "- Were any interviews conducted? If so, under what conditions and with what safeguards?"
    );
    lines.push(
      "- Were any rights (to counsel, to phone call, to medical attention) engaged or requested?"
    );
  } else {
    lines.push("- Were you informed of your rights at any stage? Explain.");
    lines.push("- Did you feel pressured or coerced at any time by police?");
    lines.push("- Were you given an opportunity to correct or amend your statement?");
  }

  return lines.join("\n");
}
