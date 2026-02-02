import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Load small English model
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading 'en_core_web_sm' model...")
    try:
        from spacy.cli import download
        download("en_core_web_sm")
        nlp = spacy.load("en_core_web_sm")
    except Exception as e:
        print(f"Failed to download model: {e}")
        nlp = spacy.blank("en")

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text

def extract_keywords(text: str) -> list:
    doc = nlp(text)
    keywords = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct and token.pos_ in ["NOUN", "PROPN", "ADJ"]]
    return list(set(keywords))

def get_match_score(resume_text: str, jd_text: str):
    resume_cleaned = clean_text(resume_text)
    jd_cleaned = clean_text(jd_text)
    
    # TF-IDF Cosine Similarity
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume_cleaned, jd_cleaned])
    score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
    # Keyword overlap
    resume_keywords = set(extract_keywords(resume_text))
    jd_keywords = set(extract_keywords(jd_text))
    
    missing_keywords = list(jd_keywords - resume_keywords)
    matched_keywords = list(jd_keywords & resume_keywords)
    
    return {
        "score": round(score * 100, 2),
        "missing_keywords": missing_keywords[:15], # Limit to top 15
        "matched_keywords": matched_keywords[:15]
    }
