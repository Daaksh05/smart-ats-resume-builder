from nlp.keyword_extractor import extract_keywords

def analyze_skill_gap(resume_text, job_description):
    """
    Identifies missing skills and categorizes them.
    """
    resume_keywords = set(extract_keywords(resume_text))
    jd_keywords = set(extract_keywords(job_description))
    
    missing = jd_keywords - resume_keywords
    
    # Simple categorization based on frequency or importance (here using length as proxy for complexity)
    core_skills = [s for s in missing if len(s) > 8]
    preferred_skills = [s for s in missing if 4 <= len(s) <= 8]
    optional_skills = [s for s in missing if len(s) < 4]
    
    return {
        "gap_summary": {
            "core": core_skills[:10],
            "preferred": preferred_skills[:10],
            "optional": optional_skills[:10]
        },
        "recommendations": [
            {"skill": s, "resource": f"https://www.coursera.org/search?query={s}"} for s in list(missing)[:5]
        ]
    }
