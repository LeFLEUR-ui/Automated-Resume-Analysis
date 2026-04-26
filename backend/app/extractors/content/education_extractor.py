import re

def extract_education(text: str) -> str:
    """
    Extracts education details from the resume text.
    Focuses on Philippine-based education headers and patterns.
    """
    education_keywords = [
        "EDUCATION", "ACADEMIC", "QUALIFICATIONS", "SCHOLASTIC", 
        "EDUCATIONAL ATTAINMENT", "EDUCATIONAL BACKGROUND", "ACADEMIC BACKGROUND",
        "STUDIES", "SCHOOLING"
    ]
    
    stop_keywords = [
        "EXPERIENCE", "SKILLS", "CERTIFICATIONS", "PROJECTS", "WORK", 
        "EMPLOYMENT", "TRAININGS", "SEMINARS", "AFFILIATIONS", "REFERENCES"
    ]
    
    lines = text.split('\n')
    found_section = False
    education_data = []
    
    for i, line in enumerate(lines):
        clean_line = line.strip()
        if not clean_line:
            continue
            
        # Check if this line is a header
        if any(keyword in clean_line.upper() for keyword in education_keywords):
            # To avoid catching "General Education" as a header if it's part of a list
            if len(clean_line.split()) < 5:
                found_section = True
                continue
            
        if found_section:
            # Stop if we hit another major section
            if any(keyword in clean_line.upper() for keyword in stop_keywords):
                # Check if it's a header (short line)
                if len(clean_line.split()) < 4:
                    break
            
            education_data.append(clean_line)
                
    # If no section found by header, try to find lines that look like degrees or schools
    if not education_data:
        university_patterns = [
            r"University", r"College", r"Institute", r"Polytechnic", r"School",
            r"Lycée", r"Academy", r"UP ", r"PUP", r"UST", r"DLSU", r"ADMU", r"FEU", r"UE "
        ]
        degree_patterns = [
            r"Bachelor", r"Master", r"Doctor", r"Associate", r"Diploma", r"SHS", r"Senior High"
        ]
        
        for line in lines:
            clean_line = line.strip()
            if any(re.search(p, clean_line, re.I) for p in university_patterns + degree_patterns):
                if clean_line not in education_data:
                    education_data.append(clean_line)
                    if len(education_data) > 10: # Cap it
                        break

    return " | ".join(education_data[:8]) if education_data else ""

def extract_highest_degree(text: str) -> str:
    """
    Identifies the highest degree mentioned with a focus on Philippine education levels.
    """
    # Ordered from highest to lowest
    degrees_map = [
        ("DOCTORATE", [r"PH\.?D", r"DOCTORATE", r"DR\.", r"DOCTOR OF", r"JURIS DOCTOR", r"DOCTOR OF MEDICINE", r"MD"]),
        ("MASTER", [r"MASTER", r"MSC", r"M\.SC", r"MA\b", r"M\.A\b", r"MBA", r"M\.B\.A\.", r"MPA", r"M\.P\.A\.", r"GRADUATE STUDIES"]),
        ("BACHELOR", [r"BACHELOR", r"BSC", r"B\.SC", r"BS\b", r"B\.S\b", r"BA\b", r"B\.A\b", r"AB\b", r"A\.B\b", r"BSE\b", r"B\.S\.E", r"BFA\b"]),
        ("ASSOCIATE", [r"ASSOCIATE", r"ASSN\.", r"A\.S\.", r"A\.A\."]),
        ("DIPLOMA/VOCATIONAL", [r"DIPLOMA", r"VOCATIONAL", r"TESDA", r"NC\s?I\b", r"NC\s?II\b", r"NC\s?III\b", r"NC\s?IV\b", r"NATIONAL CERTIFICATE"]),
        ("SENIOR HIGH SCHOOL", [r"SENIOR HIGH", r"S\.H\.S\.?", r"SHS\b", r"K-12", r"GRADE 12"])
    ]
    
    for degree_label, patterns in degrees_map:
        for pattern in patterns:
            if re.search(r'\b' + pattern, text, re.IGNORECASE):
                return degree_label
                
    return ""