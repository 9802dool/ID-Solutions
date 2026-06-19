export type ElementAnalysis = {
  element: string;
  strength: "strong" | "medium" | "weak";
  details: string;
};

export type AnalysisResult = {
  offence: string;
  overall_strength: string;
  elements_analysis: ElementAnalysis[];
  recommendations: string[];
};

export type ReportPayload = {
  evidence: string;
  analysis: AnalysisResult;
  law: LawMatchResult;
  cross: string | { cross_examination?: string };
};

export type LawMatchResult = {
  offence: string;
  statutes: string[];
  elements: string[];
  matched_elements: string[];
  unmatched_elements: string[];
  procedural_checks: string[];
  notes: string;
};
