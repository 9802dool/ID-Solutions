from typing import List, Dict


def generate_cross_examination(analysis: Dict, role: str = "officer") -> str:
    """
    role: 'officer' (questions likely to be asked of the officer)
          'witness' (questions officer might ask a witness)
    """
    offence = analysis.get("offence", "unknown offence")
    elements = analysis.get("elements_analysis", [])
    overall = analysis.get("overall_strength", "unknown")

    lines: List[str] = []

    lines.append(f"Cross-Examination Guide for {offence.upper()}")
    lines.append(f"Overall case assessment: {overall}")
    lines.append("")

    lines.append("SECTION 1: GENERAL CASE QUESTIONS")
    if role == "officer":
        lines.append("- Officer, briefly explain the nature of this case and the main allegation.")
        lines.append("- What specific offence are you alleging was committed?")
        lines.append("- What steps did you personally take in this investigation?")
        lines.append("- How did you record and preserve your notes and observations?")
    else:
        lines.append("- Please explain your relationship to the incident.")
        lines.append("- What did you first observe and when?")
        lines.append("- How certain are you about what you saw or heard?")

    lines.append("")
    lines.append("SECTION 2: ELEMENT-BY-ELEMENT QUESTIONS")

    for element_info in elements:
        element = element_info.get("element", "")
        strength = element_info.get("strength", "unknown")

        lines.append(f"Element: {element} (assessed as {strength})")

        if role == "officer":
            lines.append(f"- Officer, what specific evidence supports the element: '{element}'?")
            lines.append("- How did you verify the reliability of that evidence?")
            lines.append(f"- Are there any gaps or uncertainties in proving '{element}'?")
            if strength in ["weak", "medium"]:
                lines.append(
                    f"- Would you agree that the evidence for '{element}' is not as strong as for other elements?"
                )
        else:
            lines.append(
                f"- Tell the court what you personally observed that relates to: '{element}'."
            )
            lines.append("- How clearly could you see or perceive what happened?")
            lines.append("- Did anything obstruct your view or affect your ability to observe?")
            if strength in ["weak", "medium"]:
                lines.append(
                    f"- Is there anything that makes you unsure about what you observed regarding '{element}'?"
                )

        lines.append("")

    lines.append("SECTION 3: IDENTIFICATION & TURNBULL-TYPE QUESTIONS")
    if role == "officer":
        lines.append("- Describe the lighting conditions at the scene at the time of observation.")
        lines.append("- How far were you from the suspect when you first saw him/her?")
        lines.append("- How long did you observe the suspect?")
        lines.append(
            "- Were there any obstructions, distractions, or stress factors affecting your observation?"
        )
        lines.append("- What steps did you take to ensure a fair and reliable identification procedure?")
    else:
        lines.append("- How well could you see the person you are identifying?")
        lines.append("- How long did you see the person for?")
        lines.append("- Were you under any stress, fear, or distraction at the time?")
        lines.append("- Did anyone influence your identification in any way?")

    lines.append("")
    lines.append("SECTION 4: PROCEDURE, NOTES & CHAIN OF CUSTODY")
    if role == "officer":
        lines.append("- When did you first make notes of this incident?")
        lines.append("- Were your notes made contemporaneously or later? Explain.")
        lines.append("- How were exhibits collected, labelled, and stored?")
        lines.append("- Who had access to the exhibits between seizure and court?")
        lines.append("- What systems are in place to prevent tampering or loss of exhibits?")
    else:
        lines.append("- Did you see any police officer collect exhibits? Describe what you saw.")
        lines.append("- Did anyone show you any document or exhibit and ask you to confirm it?")
        lines.append("- Were you asked to sign any statement? When and under what circumstances?")

    lines.append("")
    lines.append("SECTION 5: CONSTITUTIONAL & FAIRNESS ISSUES")
    if role == "officer":
        lines.append("- At what time was the suspect arrested and at what time was he/she informed of the reason?")
        lines.append("- Was the suspect cautioned? State the exact words used.")
        lines.append("- Were any interviews conducted? If so, under what conditions and with what safeguards?")
        lines.append(
            "- Were any rights (to counsel, to phone call, to medical attention) engaged or requested?"
        )
    else:
        lines.append("- Were you informed of your rights at any stage? Explain.")
        lines.append("- Did you feel pressured or coerced at any time by police?")
        lines.append("- Were you given an opportunity to correct or amend your statement?")

    return "\n".join(lines)
