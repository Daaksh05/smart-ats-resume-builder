import re

# Minimal set of English stopwords for lightweight keyword extraction
STOPWORDS = {
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'when', 'at', 'from', 'by', 'for', 'with', 'about', 'against', 
    'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'up', 'down', 'in', 'out', 'on', 'off', 
    'over', 'under', 'again', 'further', 'once', 'here', 'there', 'who', 'whom', 'which', 'what', 'this', 'that', 'these', 
    'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 
    'doing', 'i', 'me', 'my', 'mine', 'we', 'us', 'our', 'ours', 'you', 'your', 'yours', 'he', 'him', 'his', 'she', 'her', 
    'hers', 'it', 'its', 'they', 'them', 'their', 'theirs', 'can', 'could', 'shall', 'should', 'will', 'would', 'may', 'might', 
    'must', 'of', 'not', 'in', 'is', 'it', 'to', 'for', 'with', 'on', 'at'
}

def extract_keywords(text):
    """
    Extract meaningful keywords using regex and stopwords (Lightweight replacement for SpaCy).
    """
    if not text:
        return []
        
    # Standardize to lowercase
    text = text.lower()
    
    # Extract alphanumeric words longer than 2 characters
    words = re.findall(r'\b[a-z]{3,}\b', text)
    
    # Filter out stopwords
    keywords = [word for word in words if word not in STOPWORDS]
    
    # Return unique keywords
    return list(set(keywords))

def get_entities(text):
    """
    Stubs out entity extraction since it requires heavy models.
    """
    return {}
