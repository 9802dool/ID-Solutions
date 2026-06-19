import type { AnalysisResult } from "./types";

const OFFENCE_ELEMENTS: Record<string, string[]> = {
  robbery: [
    "theft of property",
    "use or threat of force",
    "without consent",
    "intent to permanently deprive",
  ],
  firearm: [
    "possession of firearm",
    "without lawful authority",
    "knowledge of possession",
  ],
  dangerous_drugs: [
    "possession of dangerous drug",
    "knowledge of possession",
    "without lawful excuse",
  ],
};

function computeOverallStrength(
  elements: { strength: string }[]
): string {
  const strengths = elements.map((e) => e.strength);
  if (strengths.length === 0) return "unknown";
  if (strengths.every((s) => s === "strong")) return "very strong case";
  if (strengths.includes("weak") && !strengths.includes("strong"))
    return "weak case";
  if (strengths.includes("weak") && strengths.includes("strong"))
    return "mixed case";
  return "moderate case";
}

export function analyzeEvidence(
  evidenceSummary: string,
  offence: string
): AnalysisResult {
  const elements = OFFENCE_ELEMENTS[offence.toLowerCase()] ?? [];
  const analysisResults = [];
  const recommendations: string[] = [];

  for (const element of elements) {
    const keywords = element.split(" ");
    let score = 0;
    for (const word of keywords) {
      if (evidenceSummary.toLowerCase().includes(word.toLowerCase())) {
        score += 1;
      }
    }

    let strength: "strong" | "medium" | "weak";
    if (score >= keywords.length - 1) strength = "strong";
    else if (score >= 1) strength = "medium";
    else strength = "weak";

    analysisResults.push({
      element,
      strength,
      details: `Evidence for '${element}' appears ${strength} based on current summary.`,
    });

    if (strength === "weak") {
      recommendations.push(
        `Gather more specific evidence to prove: ${element}.`
      );
    } else if (strength === "medium") {
      recommendations.push(
        `Clarify and corroborate evidence relating to: ${element}.`
      );
    }
  }

  return {
    offence,
    overall_strength: computeOverallStrength(analysisResults),
    elements_analysis: analysisResults,
    recommendations,
  };
}

export function formatAnalysisText(result: AnalysisResult): string {
  return result.elements_analysis
    .map(
      (e) =>
        `${e.element}: ${e.strength.toUpperCase()} — ${e.details}`
    )
    .join("\n\n");
}

export function buildCrossExamination(result: AnalysisResult): string {
  const weakElements = result.elements_analysis.filter(
    (e) => e.strength === "weak" || e.strength === "medium"
  );

  if (weakElements.length === 0) {
    return "Defence may challenge chain of custody, witness credibility, and whether each statutory element is proved beyond reasonable doubt.";
  }

  return weakElements
    .map(
      (e, i) =>
        `Q${i + 1}: You agree the prosecution must prove "${e.element}" beyond reasonable doubt — can you point to the specific evidence that does so?`
    )
    .join("\n\n");
}
