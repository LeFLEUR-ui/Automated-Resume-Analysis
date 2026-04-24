from .pdf_extractor import extract_text_from_pdf
from .docx_extractor import extract_text_from_docx
from .txt_extractor import extract_text_from_txt

def extract_file_content(file_path: str, file_extension: str) -> str:
    """
    Utility function to extract text from a file based on its extension.
    """
    ext = file_extension.lower().strip('.')
    
    if ext == 'pdf':
        return extract_text_from_pdf(file_path)
    elif ext in ['doc', 'docx']:
        return extract_text_from_docx(file_path)
    elif ext == 'txt':
        return extract_text_from_txt(file_path)
    else:
        return ""
