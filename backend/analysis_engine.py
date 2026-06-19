from typing import List, Dict

# Simple placeholder: later you can load this from a DB of TT laws
OFFENCE_ELEMENTS = {
    "robbery": [
        "theft of property",
        "use or threat of force",
        "without consent",
        "intent to permanently deprive",
    ],
    "firearm": [
        "possession of firearm",
        "without lawful authority",
        "knowledge of possession",
    ],
    "dangerous_drugs": [
        "possession of dangerous drug",
        "knowledge of possession",
        "without lawful excuse",
    ],
}


def analyze_evidence(evidence_summary: str, offence: str) -> Dict:
    elements = OFFENCE_ELEMENTS.get(offence.lower(), [])
    analysis_results = []
    recommendations = []

    for element in elements:
        keywords = element.split()
        score = 0
        for word in keywords:
            if word.lower() in evidence_summary.lower():
                score += 1

        if score >= len(keywords) - 1:
            strength = "strong"
        elif score >= 1:
            strength = "medium"
        else:
            strength = "weak"

        analysis_results.append(
            {
                "element": element,
                "strength": strength,
                "details": f"Evidence for '{element}' appears {strength} based on current summary.",
            }
        )

        if strength == "weak":
            recommendations.append(
                f"Gather more specific evidence to prove: {element}."
            )
        elif strength == "medium":
            recommendations.append(
                f"Clarify and corroborate evidence relating to: {element}."
            )

    overall_strength = _compute_overall_strength(analysis_results)

    return {
        "offence": offence,
        "overall_strength": overall_strength,
        "elements_analysis": analysis_results,
        "recommendations": recommendations,
    }


def _compute_overall_strength(elements_analysis: List[Dict]) -> str:
    strengths = [e["strength"] for e in elements_analysis]
    if not strengths:
        return "unknown"

    if all(s == "strong" for s in strengths):
        return "very strong case"
    if "weak" in strengths and "strong" not in strengths:
        return "weak case"
    if "weak" in strengths and "strong" in strengths:
        return "mixed case"
    return "moderate case"
