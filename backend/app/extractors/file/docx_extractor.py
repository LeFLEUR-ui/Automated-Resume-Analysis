import docx

def extract_text_from_docx(file_path: str) -> str:
    """
    Extracts text from a .docx file using python-docx.
    """
    try:
        doc = docx.Document(file_path)
        full_text = []
        for para in doc.paragraphs:
            full_text.append(para.text)
        return '\n'.join(full_text)
    except Exception as e:
        print(f"Error reading DOCX file: {e}")
        return ""
