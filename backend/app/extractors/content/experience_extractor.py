import re
from datetime import datetime

def extract_experience(text: str) -> str:
    """
    Extracts work experience details from the resume text.
    """
    experience_keywords = [
        "EXPERIENCE", "WORK HISTORY", "EMPLOYMENT", "PROFESSIONAL BACKGROUND",
        "WORK EXPERIENCE", "PROFESSIONAL EXPERIENCE", "CAREER HISTORY", 
        "RELEVANT EXPERIENCE", "EMPLOYMENT HISTORY"
    ]
    
    stop_keywords = [
        "EDUCATION", "SKILLS", "CERTIFICATIONS", "PROJECTS", "QUALIFICATIONS",
        "ACHIEVEMENTS", "AFFILIATIONS", "REFERENCES", "INTERESTS"
    ]
    
    lines = text.split('\n')
    found_section = False
    experience_data = []
    
    for i, line in enumerate(lines):
        clean_line = line.strip()
        if not clean_line:
            continue
            
        # Header detection
        if any(keyword in clean_line.upper() for keyword in experience_keywords):
            if len(clean_line.split()) < 5:
                found_section = True
                continue
                
        if found_section:
            # Stop if we hit another major section
            if any(keyword in clean_line.upper() for keyword in stop_keywords):
                if len(clean_line.split()) < 4:
                    break
            
            experience_data.append(clean_line)
            
    # Fallback: if no section found, look for date patterns which usually indicate experience
    if not experience_data:
        date_pattern = r'\b(19|20)\d{2}\b'
        for line in lines:
            if re.search(date_pattern, line):
                if line.strip() not in experience_data:
                    experience_data.append(line.strip())
                    if len(experience_data) > 15:
                        break

    return " | ".join(experience_data[:15]) if experience_data else ""

def extract_years_experience(text: str) -> int:
    """
    Calculates total years of experience by searching for date ranges.
    Returns the sum of years found in date patterns or the max 'X years' mentioned.
    """
    # Look for explicit mentions like "5 years experience"
    explicit_matches = re.findall(r'(\d+)\+?\s*years?', text, re.IGNORECASE)
    explicit_years = max([int(m) for m in explicit_matches]) if explicit_matches else 0
    
    # Calculate from date ranges
    # Patterns: Jan 2020 - Feb 2022, 2018-2021, March 2015 - Present
    months_regex = r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
    year_regex = r'(?:19|20)\d{2}'
    present_regex = r'(?:Present|Current|Now|To Date)'
    
    # Range pattern: (Month)? Year - (Month)? (Year|Present)
    range_pattern = rf'({months_regex}\s+)?({year_regex})\s*(?:-|to)\s*(?:({months_regex}\s+)?({year_regex})|({present_regex}))'
    
    ranges = re.findall(range_pattern, text, re.IGNORECASE)
    
    total_months = 0
    current_year = datetime.now().year
    current_month = datetime.now().month
    
    def get_month_num(m_str):
        if not m_str: return 1
        m_str = m_str.strip().lower()
        months = {
            'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
            'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
        }
        for k, v in months.items():
            if k in m_str: return v
        return 1

    for start_m, start_y, end_m, end_y, present in ranges:
        try:
            s_y = int(start_y)
            s_m = get_month_num(start_m)
            
            if present:
                e_y = current_year
                e_m = current_month
            else:
                e_y = int(end_y)
                e_m = get_month_num(end_m)
            
            diff_months = (e_y - s_y) * 12 + (e_m - s_m)
            if diff_months > 0:
                total_months += diff_months
        except ValueError:
            continue
            
    calculated_years = round(total_months / 12)
    
    # Return the higher of the two (explicit mention vs calculated)
    return max(explicit_years, calculated_years)