import re

COMMON_SKILLS = set([
    "PYTHON", "JAVASCRIPT", "JAVA", "C++", "C#", "RUBY", "PHP", "SWIFT", "GO", "R", "SQL",
    "REACT", "ANGULAR", "VUE", "NODE.JS", "EXPRESS", "DJANGO", "FLASK", "SPRING", "LARAVEL",
    "HTML", "CSS", "BASH", "LINUX", "GIT", "DOCKER", "KUBERNETES", "AWS", "AZURE", "GCP",
    "MACHINE LEARNING", "DATA ANALYSIS", "PANDAS", "NUMPY", "TENSORFLOW", "PYTORCH",
    "AGILE", "SCRUM", "PROJECT MANAGEMENT", "LEADERSHIP", "COMMUNICATION", "PROBLEM SOLVING",
    "CUSTOMER SERVICE", "MICROSOFT OFFICE", "EXCEL", "WORD", "POWERPOINT", "SALES", "MARKETING",
    "SEO", "CONTENT CREATION", "UI/UX", "FIGMA", "ADOBE CREATIVE SUITE", "PHOTOSHOP", "ILLUSTRATOR"
])

def extract_skills(text: str) -> str:
    """
    Extracts skills from the resume text.
    Returns a pipe-separated string of identified skills.
    """
    skill_keywords = [
        "SKILLS", "TECHNICAL SKILLS", "CORE COMPETENCIES", "EXPERTISE", 
        "TECHNOLOGIES", "TOOLS", "KEY SKILLS", "PROFICIENCIES"
    ]
    
    stop_keywords = [
        "EXPERIENCE", "EDUCATION", "CERTIFICATIONS", "PROJECTS", "WORK HISTORY",
        "EMPLOYMENT", "REFERENCES", "ACHIEVEMENTS", "AFFILIATIONS", "BACKGROUND"
    ]
    
    lines = text.split('\n')
    found_section = False
    skills_data = []
    
    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue
            
        # Header detection
        if any(keyword == clean_line.upper() or clean_line.upper().startswith(keyword + ":") for keyword in skill_keywords):
            found_section = True
            continue
            
        # Alternative header detection (if it's short and contains a keyword)
        if not found_section and len(clean_line.split()) < 4 and any(keyword in clean_line.upper() for keyword in skill_keywords):
            found_section = True
            continue
                
        if found_section:
            # Stop if we hit another major section
            if len(clean_line.split()) < 4 and any(keyword in clean_line.upper() for keyword in stop_keywords):
                break
            
            skills_data.append(clean_line)
            
    extracted_skills = []
    
    if skills_data:
        # We found a section. Clean the data.
        # Skills might be comma separated, pipe separated, or bullet points
        raw_text = " ".join(skills_data)
        
        # Split by common delimiters: comma, pipe, bullet points, newline
        delimiters = [',', '|', '•', '-', '*', ';']
        
        # Replace delimiters with a standard one (comma)
        for d in delimiters:
            raw_text = raw_text.replace(d, ',')
            
        # Split by comma
        potential_skills = [s.strip() for s in raw_text.split(',')]
        
        for s in potential_skills:
            # Filter out very long strings (probably not single skills) or very short ones
            if s and len(s) > 1 and len(s) < 35: 
                extracted_skills.append(s)
                
    else:
        # Fallback: scan whole document for common skills
        text_upper = text.upper()
        for skill in COMMON_SKILLS:
            # Simple word boundary regex for the skill
            if re.search(r'\b' + re.escape(skill) + r'\b', text_upper):
                extracted_skills.append(skill)

    # Format and deduplicate
    unique_skills = []
    for s in extracted_skills:
        s_clean = s.strip()
        # Custom capitalization
        if s_clean.lower() in ['html', 'css', 'php', 'sql', 'seo', 'ui/ux', 'aws']:
            s_clean = s_clean.upper()
        elif s_clean.lower() == 'node.js':
            s_clean = 'Node.js'
        else:
            s_clean = s_clean.title()
            
        if s_clean and s_clean not in unique_skills:
            unique_skills.append(s_clean)
            
    return " | ".join(unique_skills[:20]) if unique_skills else ""
