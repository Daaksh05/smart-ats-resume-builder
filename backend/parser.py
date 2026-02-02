import pypdf
import docx
import io

def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extract text from PDF with multiple fallback strategies.
    Try pypdf first (efficient), then pdfminer.six (robust).
    """
    # 1. Try pypdf (standard)
    try:
        pdf_reader = pypdf.PdfReader(io.BytesIO(file_content))
        text_parts = []
        
        for page_num, page in enumerate(pdf_reader.pages):
            try:
                page_text = page.extract_text()
                if page_text and isinstance(page_text, str):
                    cleaned = page_text.strip()
                    if cleaned:
                        text_parts.append(cleaned)
            except Exception as e:
                print(f"pypdf warning: {e}")
                continue
        
        full_text = "\n\n".join(text_parts).strip()
        if full_text:
            print(f"pypdf extracted {len(full_text)} chars")
            return full_text
            
    except Exception as e:
        print(f"pypdf error: {str(e)}")

    # 2. Try pdfminer.six (robust fallback)
    try:
        from pdfminer.high_level import extract_text as pdfminer_extract
        print("Falling back to pdfminer.six for robust extraction...")
        full_text = pdfminer_extract(io.BytesIO(file_content))
        if full_text and full_text.strip():
            print(f"pdfminer.six extracted {len(full_text)} chars")
            return full_text.strip()
    except ImportError:
        print("pdfminer.six not installed, skipping robust extraction")
    except Exception as e:
        print(f"pdfminer.six error: {str(e)}")
        
    print("No text extracted from PDF - likely image-based")
    return ""

def extract_text_from_docx(file_content: bytes) -> str:
    try:
        doc = docx.Document(io.BytesIO(file_content))
        paragraphs = [para.text for para in doc.paragraphs if para.text.strip()]
        return "\n".join(paragraphs)
    except Exception as e:
        raise ValueError(f"Failed to parse DOCX: {str(e)}")

def extract_text(file_content: bytes, filename: str) -> str:
    filename_lower = filename.lower()
    
    print(f"Extracting text from: {filename} ({len(file_content)} bytes)")
    
    if filename_lower.endswith(".pdf"):
        return extract_text_from_pdf(file_content)
    elif filename_lower.endswith(".docx"):
        return extract_text_from_docx(file_content)
    else:
        raise ValueError("Unsupported file format. Please upload PDF or DOCX.")
