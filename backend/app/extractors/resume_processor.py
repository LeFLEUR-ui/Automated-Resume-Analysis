from .file import extract_file_content
from .content import extract_content

def process_resume(file_path: str, file_extension: str) -> dict:
    """
    Main entry point for resume processing.
    1. Extracts raw text from file.
    2. Extracts structured information from text.
    """
    text = extract_file_content(file_path, file_extension)
    if not text:
        return {}
        
    return extract_content(text)