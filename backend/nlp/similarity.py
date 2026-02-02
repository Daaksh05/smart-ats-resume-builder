import re
import math
from collections import Counter

def clean_text(text):
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
    return text

def calculate_cosine_similarity(text1, text2):
    """
    Computes cosine similarity manually (Lightweight replacement for Sklearn).
    """
    if not text1 or not text2:
        return 0.0
        
    cleaned1 = clean_text(text1)
    cleaned2 = clean_text(text2)
    
    tokens1 = cleaned1.split()
    tokens2 = cleaned2.split()
    
    if not tokens1 or not tokens2:
        return 0.0
        
    vec1 = Counter(tokens1)
    vec2 = Counter(tokens2)
    
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])
    
    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)
    
    if not denominator:
        return 0.0
        
    score = float(numerator) / denominator
    return round(score * 100, 2)
