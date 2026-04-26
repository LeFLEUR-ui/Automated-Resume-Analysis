from pdfminer.high_level import extract_text
import fitz  # PyMuPDF
import os

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts text from a .pdf file using pdfminer.six.
    """
    try:
        text = extract_text(file_path)
        return text
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        return ""

def extract_image_from_pdf(file_path: str) -> str:
    """
    Extracts the first image from a PDF and saves it to uploads/resume_images.
    Returns the path to the saved image or None.
    """
    try:
        doc = fitz.open(file_path)
        img_dir = "uploads/resume_images"
        if not os.path.exists(img_dir):
            os.makedirs(img_dir)
            
        for page_index in range(len(doc)):
            page = doc[page_index]
            image_list = page.get_images(full=True)
            
            if image_list:
                # Get the first image
                xref = image_list[0][0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                filename = os.path.basename(file_path)
                image_name = f"{os.path.splitext(filename)[0]}_img.{image_ext}"
                image_path = os.path.join(img_dir, image_name)
                
                with open(image_path, "wb") as f:
                    f.write(image_bytes)
                
                doc.close()
                return image_path
                
        doc.close()
    except Exception as e:
        print(f"Error extracting image from PDF: {e}")
    return None
