from typing import Dict, List

# Basic TT offence mapping – you can expand this over time.
# Statute references are indicative; refine with full sections as you go.
OFFENCE_LAW_MAP = {
    "robbery": {
        "statutes": [
            "Criminal Offences Act, Chap. 11:01 (robbery-related provisions)",
            "Criminal Law Act, Chap. 10:04 (arrest, use of force, assisting offenders)",
        ],
        "elements": [
            "theft of property",
            "use or threat of force",
            "without consent",
            "intent to permanently deprive",
        ],
    },
    "firearm": {
        "statutes": [
            "Firearms Act, Chap. 16:01",
            "Firearms (Amendment) Act, 2021",
        ],
        "elements": [
            "possession of firearm or ammunition",
            "without lawful authority or permit",
            "knowledge of possession",
        ],
    },
    "dangerous_drugs": {
        "statutes": [
            "Dangerous Drugs Act, Chap. 11:25",
        ],
        "elements": [
            "possession of dangerous drug",
            "knowledge of possession",
            "without lawful excuse",
        ],
    },
    # Add more offences here: sexual offences, burglary, assault, etc.
}

PROCEDURAL_CHECKS = [
    "lawful arrest (Criminal Law Act, Chap. 10:04)",
    "proper caution and interview procedure",
    "contemporaneous notes",
    "chain of custody for exhibits",
    "identification procedure (Turnbull-type considerations)",
    "constitutional rights (detention, counsel, medical, phone call)",
]


def match_laws_to_case(evidence_summary: str, offence: str) -> Dict:
    offence_key = offence.lower()
    offence_data = OFFENCE_LAW_MAP.get(offence_key)

    if not offence_data:
        return {
            "offence": offence,
            "statutes": [],
            "elements": [],
            "matched_elements": [],
            "unmatched_elements": [],
            "procedural_checks": PROCEDURAL_CHECKS,
            "notes": f"No specific mapping found yet for offence '{offence}'.",
        }

    elements = offence_data["elements"]
    statutes = offence_data["statutes"]

    matched_elements: List[str] = []
    unmatched_elements: List[str] = []

    for element in elements:
        keywords = element.split()
        score = 0
        for word in keywords:
            if word.lower() in evidence_summary.lower():
                score += 1

        if score >= 1:
            matched_elements.append(element)
        else:
            unmatched_elements.append(element)

    return {
        "offence": offence,
        "statutes": statutes,
        "elements": elements,
        "matched_elements": matched_elements,
        "unmatched_elements": unmatched_elements,
        "procedural_checks": PROCEDURAL_CHECKS,
        "notes": "This is a preliminary law-matching result. Refine with full statutory sections and case law.",
    }
