from nlp.keyword_extractor import extract_keywords
from nlp.similarity import calculate_cosine_similarity
import re

def clean_text(text: str) -> str:
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    return text

def get_match_score(resume_text: str, jd_text: str):
    """
    Consolidated match score using the new lightweight logic.
    """
    score = calculate_cosine_similarity(resume_text, jd_text)
    
    resume_keywords = set(extract_keywords(resume_text))
    jd_keywords = set(extract_keywords(jd_text))
    
    missing_keywords = list(jd_keywords - resume_keywords)
    matched_keywords = list(jd_keywords & resume_keywords)
    
    return {
        "score": score,
        "missing_keywords": sorted(missing_keywords)[:15],
        "matched_keywords": sorted(matched_keywords)[:15]
    }
