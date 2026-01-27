from nlp.keyword_extractor import extract_keywords
from nlp.similarity import calculate_cosine_similarity
from nlp.semantic_match import get_semantic_similarity, get_keyword_overlap

def analyze_ats(resume_text, job_description):
    """
    Comprehensive ATS Analysis.
    Returns scores across multiple dimensions.
    """
    # 1. Keyword Extraction
    resume_keywords = extract_keywords(resume_text)
    jd_keywords = extract_keywords(job_description)
    
    # 2. Similarity Metrics
    cosine_score = calculate_cosine_similarity(resume_text, job_description)
    semantic_score = get_semantic_similarity(resume_text, job_description)
    keyword_score = get_keyword_overlap(resume_keywords, jd_keywords)
    
    # 3. Aggregated Score (Weighted)
    overall_score = round((cosine_score * 0.4) + (keyword_score * 0.4) + (semantic_score * 0.2), 2)
    
    # 4. Detail Analysis
    missing_keywords = list(set(jd_keywords) - set(resume_keywords))
    matched_keywords = list(set(jd_keywords).intersection(set(resume_keywords)))
    
    return {
        "overall_score": overall_score,
        "detail_scores": {
            "cosine_similarity": cosine_score,
            "semantic_match": semantic_score,
            "keyword_overlap": keyword_score
        },
        "keywords": {
            "matched": matched_keywords[:20],
            "missing": missing_keywords[:20]
        },
        "feedback": generate_feedback(overall_score, missing_keywords)
    }

def generate_feedback(score, missing):
    if score > 80:
        return "Excellent match! Your resume is highly optimized for this role."
    elif score > 60:
        return f"Good match, but consider adding keywords like: {', '.join(missing[:3])}."
    else:
        return "Strong mismatch. You need to significantly tailor your resume to include key job requirements."
