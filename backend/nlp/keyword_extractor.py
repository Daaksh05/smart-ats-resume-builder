import spacy
import re

# Load SpaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except ImportError:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def extract_keywords(text):
    """
    Extract meaningful keywords (skills, technologies, qualifications) from text.
    """
    doc = nlp(text.lower())
    # Filter for Nouns, Proper Nouns, and Adjectives
    keywords = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct and token.pos_ in ["NOUN", "PROPN", "ADJ"]]
    # Basic cleaning
    keywords = [re.sub(r'[^a-zA-Z0-9]', '', kw) for kw in keywords if len(kw) > 1]
    return list(set(keywords))

def get_entities(text):
    """
    Extract organizations and locations as entities.
    """
    doc = nlp(text)
    entities = {}
    for ent in doc.ents:
        if ent.label_ in ["ORG", "GPE", "PRODUCT"]:
            if ent.label_ not in entities:
                entities[ent.label_] = []
            entities[ent.label_].append(ent.text)
    return entities
