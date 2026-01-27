from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

def calculate_cosine_similarity(text1, text2):
    """
    Computes cosine similarity based on TF-IDF vectors.
    """
    cleaned1 = clean_text(text1)
    cleaned2 = clean_text(text2)
    
    if not cleaned1 or not cleaned2:
        return 0.0
        
    vectorizer = TfidfVectorizer()
    try:
        tfidf_matrix = vectorizer.fit_transform([cleaned1, cleaned2])
        score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return round(float(score) * 100, 2)
    except:
        return 0.0
