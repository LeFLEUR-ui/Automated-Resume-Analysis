from pdfminer.high_level import extract_text

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts text from a .pdf file using pdfminer.six.
    """
    try:
        text = extract_text(file_path)
        return text
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        return ""
