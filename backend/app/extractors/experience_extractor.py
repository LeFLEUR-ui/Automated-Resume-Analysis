import re

def extract_experience(text: str) -> str:
    """
    Extracts work experience details from the resume text.
    Returns a summary or list of experiences found.
    """
    experience_keywords = ["EXPERIENCE", "WORK HISTORY", "EMPLOYMENT", "PROFESSIONAL BACKGROUND"]
    lines = text.split('\n')
    found_section = False
    experience_data = []
    
    for i, line in enumerate(lines):
        if any(keyword in line.upper() for keyword in experience_keywords):
            found_section = True
            continue
            
        if found_section:
            # Stop if we hit another major section
            if any(keyword in line.upper() for keyword in ["EDUCATION", "SKILLS", "CERTIFICATIONS", "PROJECTS"]):
                break
            if line.strip():
                experience_data.append(line.strip())
                
    return " | ".join(experience_data[:10]) if experience_data else ""

def extract_years_experience(text: str) -> int:
    """
    Attempts to calculate total years of experience from the text.
    """
    # Look for patterns like "5 years", "3+ years"
    matches = re.findall(r'(\d+)\+?\s*years?', text, re.IGNORECASE)
    if matches:
        return max([int(m) for m in matches])
    return 0