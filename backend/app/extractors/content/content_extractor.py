from .name_extractor import extract_fullname
from .email_extractor import extract_email
from .phone_extractor import extract_phone
from .location_extractor import extract_location
from .experience_extractor import extract_experience, extract_years_experience
from .education_extractor import extract_education, extract_highest_degree

def extract_content(text: str) -> dict:
    return {
        "fullname": extract_fullname(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "location": extract_location(text),
        "experience": extract_experience(text),
        "years_experience": extract_years_experience(text),
        "education": extract_education(text),
        "highest_degree": extract_highest_degree(text)
    }
