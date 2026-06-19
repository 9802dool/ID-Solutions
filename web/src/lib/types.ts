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
  analysis: string;
  recommendations: string;
  cross: string;
};
