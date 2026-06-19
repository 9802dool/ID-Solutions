"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import {
  buildCrossExamination,
  formatAnalysisText,
} from "@/lib/analysis-engine";
import { downloadReport, runAnalysis } from "@/lib/api";

const OFFENCES = [
  { value: "robbery", label: "Robbery" },
  { value: "firearm", label: "Firearm Offence" },
  { value: "dangerous_drugs", label: "Dangerous Drugs" },
];

function strengthColor(strength: string): string {
  if (strength === "strong") return "#16a34a";
  if (strength === "medium") return "#ca8a04";
  return "#dc2626";
}

export function CaseAnalysisApp() {
  const [evidence, setEvidence] = useState("");
  const [offence, setOffence] = useState("robbery");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!evidence.trim()) {
      setError("Please enter an evidence summary.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await runAnalysis(evidence, offence);
      setResult(data);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!result) return;
    setDownloading(true);
    try {
      await downloadReport({
        evidence,
        analysis: formatAnalysisText(result),
        recommendations: result.recommendations.join("\n"),
        cross: buildCrossExamination(result),
      });
    } catch {
      setError("Report download failed.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <p className="eyebrow">TTPS Case Analysis</p>
        <h1>ID Solutions</h1>
        <p className="subtitle">
          Analyze evidence against statutory elements, assess case strength, and
          export a King&apos;s Counsel-style cross-examination report.
        </p>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Case Input</h2>
          <label htmlFor="offence">Offence Type</label>
          <select
            id="offence"
            value={offence}
            onChange={(e) => setOffence(e.target.value)}
          >
            {OFFENCES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <label htmlFor="evidence">Evidence Summary</label>
          <textarea
            id="evidence"
            rows={10}
            placeholder="Describe witness statements, physical evidence, admissions, and chain of custody..."
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button
            type="button"
            className="btn primary"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing…" : "Analyze Case"}
          </button>
        </section>

        <section className="card">
          <h2>Analysis Results</h2>
          {!result ? (
            <p className="muted">
              Run an analysis to see element-by-element strength and
              recommendations.
            </p>
          ) : (
            <>
              <div className="summary">
                <span className="badge">{result.offence}</span>
                <strong>{result.overall_strength}</strong>
              </div>

              <ul className="elements">
                {result.elements_analysis.map((el) => (
                  <li key={el.element}>
                    <span
                      className="dot"
                      style={{ background: strengthColor(el.strength) }}
                    />
                    <div>
                      <strong>{el.element}</strong>
                      <p>{el.details}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {result.recommendations.length > 0 && (
                <>
                  <h3>Recommendations</h3>
                  <ul className="recommendations">
                    {result.recommendations.map((rec) => (
                      <li key={rec}>{rec}</li>
                    ))}
                  </ul>
                </>
              )}

              <button
                type="button"
                className="btn secondary"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? "Generating…" : "Download DOCX Report"}
              </button>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        Decision-support only — not legal advice. Review all outputs with
        qualified legal counsel before court use.
      </footer>
    </div>
  );
}
