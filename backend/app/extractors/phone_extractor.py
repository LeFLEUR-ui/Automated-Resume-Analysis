import re

def extract_phone(text: str) -> str:
    """
    Extracts the phone number from the resume text using common regex patterns.
    """
    # Pattern covers: +639123456789, 09123456789, 123-456-7890, (123) 456-7890
    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10,11}'
    match = re.search(phone_pattern, text)
    return match.group(0) if match else ""
    