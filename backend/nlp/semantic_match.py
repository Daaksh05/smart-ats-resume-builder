def get_semantic_similarity(text1, text2):
    """
    Lightweight fallback for semantic similarity.
    Since we removed heavy models, we return a baseline value or 0.
    In a real app, this could call an external API.
    """
    # For now, we return 0 to avoid false positives without a model
    return 0.0

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
