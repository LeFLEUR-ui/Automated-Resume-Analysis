from .file.file_extractor import extract_file_content
from .content.content_extractor import extract_content

def process_resume(file_path: str, file_extension: str) -> dict:
    """
    Main entry point for resume processing.
    1. Extracts raw text from file.
    2. Extracts structured information from text.
    """
    print(f"DEBUG: Processing file at {file_path}")
    text = extract_file_content(file_path, file_extension)
    if not text:
        print("DEBUG: extract_file_content returned empty text")
        return {}
    
    print(f"DEBUG: Successfully extracted {len(text)} characters of text")
    return extract_content(text)