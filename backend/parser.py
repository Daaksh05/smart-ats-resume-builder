import pypdf
import docx
import io

def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extract text from PDF with multiple fallback strategies.
    """
    try:
        pdf_reader = pypdf.PdfReader(io.BytesIO(file_content))
        text_parts = []
        
        for page_num, page in enumerate(pdf_reader.pages):
            try:
                # Try standard text extraction
                page_text = page.extract_text()
                
                if page_text and isinstance(page_text, str):
                    # Clean the text
                    cleaned = page_text.strip()
                    if cleaned:
                        text_parts.append(cleaned)
                        print(f"Page {page_num + 1}: Extracted {len(cleaned)} chars")
            except Exception as e:
                print(f"Warning: Failed to extract text from page {page_num + 1}: {e}")
                continue
        
        full_text = "\n\n".join(text_parts)
        print(f"Total extracted text: {len(full_text)} chars from {len(pdf_reader.pages)} pages")
        
        # If we got some text, return it
        if full_text.strip():
            return full_text
            
        # If no text found, the PDF might be image-based
        print("No text extracted - PDF may be scanned/image-based")
        return ""
        
    except Exception as e:
        print(f"PDF parsing error: {str(e)}")
        raise ValueError(f"Failed to parse PDF: {str(e)}")

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
