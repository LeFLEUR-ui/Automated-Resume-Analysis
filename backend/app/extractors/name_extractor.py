import re

def extract_fullname(text: str) -> str:
    """
    Extracts the full name from the resume text.
    Usually found at the very beginning of the document.
    """
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if not lines:
        return ""
    
    # Simple heuristic: The first non-empty line is often the name
    # We can refine this with NLP later
    potential_name = lines[0]
    
    # Basic check to avoid common headers like "Resume" or "CV"
    if any(header in potential_name.upper() for header in ["RESUME", "CV", "CURRICULUM"]):
        if len(lines) > 1:
            potential_name = lines[1]
        else:
            return ""
            
    return potential_name
