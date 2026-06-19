import type { LawMatchResult } from "./types";

const OFFENCE_LAW_MAP: Record<
  string,
  { statutes: string[]; elements: string[] }
> = {
  robbery: {
    statutes: [
      "Criminal Offences Act, Chap. 11:01 (robbery-related provisions)",
      "Criminal Law Act, Chap. 10:04 (arrest, use of force, assisting offenders)",
    ],
    elements: [
      "theft of property",
      "use or threat of force",
      "without consent",
      "intent to permanently deprive",
    ],
  },
  firearm: {
    statutes: [
      "Firearms Act, Chap. 16:01",
      "Firearms (Amendment) Act, 2021",
    ],
    elements: [
      "possession of firearm or ammunition",
      "without lawful authority or permit",
      "knowledge of possession",
    ],
  },
  dangerous_drugs: {
    statutes: ["Dangerous Drugs Act, Chap. 11:25"],
    elements: [
      "possession of dangerous drug",
      "knowledge of possession",
      "without lawful excuse",
    ],
  },
};

const PROCEDURAL_CHECKS = [
  "lawful arrest (Criminal Law Act, Chap. 10:04)",
  "proper caution and interview procedure",
  "contemporaneous notes",
  "chain of custody for exhibits",
  "identification procedure (Turnbull-type considerations)",
  "constitutional rights (detention, counsel, medical, phone call)",
];

export function matchLawsToCase(
  evidenceSummary: string,
  offence: string
): LawMatchResult {
  const offenceKey = offence.toLowerCase();
  const offenceData = OFFENCE_LAW_MAP[offenceKey];

  if (!offenceData) {
    return {
      offence,
      statutes: [],
      elements: [],
      matched_elements: [],
      unmatched_elements: [],
      procedural_checks: PROCEDURAL_CHECKS,
      notes: `No specific mapping found yet for offence '${offence}'.`,
    };
  }

  const matchedElements: string[] = [];
  const unmatchedElements: string[] = [];

  for (const element of offenceData.elements) {
    const keywords = element.split(" ");
    let score = 0;
    for (const word of keywords) {
      if (evidenceSummary.toLowerCase().includes(word.toLowerCase())) {
        score += 1;
      }
    }

    if (score >= 1) {
      matchedElements.push(element);
    } else {
      unmatchedElements.push(element);
    }
  }

  return {
    offence,
    statutes: offenceData.statutes,
    elements: offenceData.elements,
    matched_elements: matchedElements,
    unmatched_elements: unmatchedElements,
    procedural_checks: PROCEDURAL_CHECKS,
    notes:
      "This is a preliminary law-matching result. Refine with full statutory sections and case law.",
  };
}
