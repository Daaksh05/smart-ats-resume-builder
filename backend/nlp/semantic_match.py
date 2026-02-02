import re

def get_semantic_similarity(text1, text2):
    """
    Lightweight semantic similarity using word overlap and common n-grams.
    This provides a basic semantic matching without heavy ML models.
    """
    if not text1 or not text2:
        return 0.0
    
    # Clean and tokenize
    words1 = set(re.findall(r'\b[a-z]{3,}\b', text1.lower()))
    words2 = set(re.findall(r'\b[a-z]{3,}\b', text2.lower()))
    
    if not words1 or not words2:
        return 0.0
    
    # Calculate Jaccard similarity
    intersection = words1.intersection(words2)
    union = words1.union(words2)
    
    if not union:
        return 0.0
    
    similarity = len(intersection) / len(union)
    return round(similarity * 100, 2)

def get_keyword_overlap(list1, list2):
    """
    Calculate overlap percentage between two lists of keywords.
    """
    if not list1 or not list2:
        return 0.0
        
    set1 = set(list1)
    set2 = set(list2)
    
    overlap = set1.intersection(set2)
    return round((len(overlap) / len(set2)) * 100, 2)
