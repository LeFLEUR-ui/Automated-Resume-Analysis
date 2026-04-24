import re

def extract_education(text: str) -> str:
    """
    Extracts education details from the resume text.
    """
    education_keywords = ["EDUCATION", "ACADEMIC", "QUALIFICATIONS", "SCHOLASTIC"]
    lines = text.split('\n')
    found_section = False
    education_data = []
    
    for i, line in enumerate(lines):
        if any(keyword in line.upper() for keyword in education_keywords):
            found_section = True
            continue
            
        if found_section:
            # Stop if we hit another major section
            if any(keyword in line.upper() for keyword in ["EXPERIENCE", "SKILLS", "CERTIFICATIONS", "PROJECTS"]):
                break
            if line.strip():
                education_data.append(line.strip())
                
    return " | ".join(education_data[:5]) if education_data else ""

def extract_highest_degree(text: str) -> str:
    """
    Attempts to identify the highest degree mentioned.
    """
    degrees = {
        "PHD": ["PH.D", "PHD", "DOCTORATE"],
        "MASTER": ["MASTER", "MSC", "MA", "MBA"],
        "BACHELOR": ["BACHELOR", "BSC", "BA", "BS", "B.S", "B.A"],
        "DIPLOMA": ["DIPLOMA", "ASSOCIATE"]
    }
    
    for degree_type, keywords in degrees.items():
        for keyword in keywords:
            if re.search(r'\b' + re.escape(keyword) + r'\b', text, re.IGNORECASE):
                return degree_type
                
    return ""
