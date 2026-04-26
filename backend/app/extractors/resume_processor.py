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
    extracted_data = extract_content(text)
    
    # Extract image if PDF
    if file_extension.lower().strip('.') == 'pdf':
        from .file.pdf_extractor import extract_image_from_pdf
        image_path = extract_image_from_pdf(file_path)
        if image_path:
            # We'll use a relative URL that the frontend can append to the base API URL
            extracted_data['profile_image_url'] = f"http://localhost:8000/{image_path}"
            
    return extracted_data