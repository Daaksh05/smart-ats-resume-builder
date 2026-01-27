import spacy

# Load SpaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def get_semantic_similarity(text1, text2):
    """
    Computes semantic similarity using SpaCy's word vectors.
    Note: en_core_web_sm has limited vectors, but provides a baseline.
    """
    doc1 = nlp(text1)
    doc2 = nlp(text2)
    
    # SpaCy's .similarity() method
    if doc1.vector_norm and doc2.vector_norm:
        return round(float(doc1.similarity(doc2)) * 100, 2)
    return 0.0

def get_keyword_overlap(list1, list2):
    """
    Calculate overlap percentage between two lists of keywords.
    """
    set1 = set(list1)
    set2 = set(list2)
    
    if not set2:
        return 0.0
        
    overlap = set1.intersection(set2)
    return round((len(overlap) / len(set2)) * 100, 2)
