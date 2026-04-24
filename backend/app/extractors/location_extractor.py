import re

def extract_location(text: str) -> str:
    """
    Extracts the location from the resume text.
    Searches for common location keywords and patterns.
    """
    # Look for "Address:" or "Location:" prefix
    location_keywords = [r'Address\s*:', r'Location\s*:', r'Residence\s*:']
    for keyword in location_keywords:
        match = re.search(f"{keyword}(.*)", text, re.IGNORECASE)
        if match:
            return match.group(1).split('\n')[0].strip()
    
    # Heuristic: Often location is on the 2nd or 3rd line near the name
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if len(lines) > 2:
        # Check if line contains common location indicators (City, Province, Philippines)
        for i in range(1, min(5, len(lines))):
            if any(indicator in lines[i].upper() for indicator in ["CITY", "STREET", "PROVINCE", "PHILIPPINES", "METRO MANILA"]):
                return lines[i]
                
    return ""
