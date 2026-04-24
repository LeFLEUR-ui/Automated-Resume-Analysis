def extract_text_from_txt(file_path: str) -> str:
    """
    Extracts text from a .txt file.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        print(f"Error reading TXT file: {e}")
        return ""
