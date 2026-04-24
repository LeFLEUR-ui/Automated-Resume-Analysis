import os
import shutil
from fastapi import UploadFile
from app.extractors.resume_processor import process_resume

async def parse_resume_file(file: UploadFile) -> dict:
    """
    Saves the uploaded file temporarily and parses it using the extractors.
    """
    # Create temp directory if it doesn't exist
    temp_dir = "uploads/temp_resumes"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
        
    file_extension = os.path.splitext(file.filename)[1].strip('.')
    temp_file_path = os.path.join(temp_dir, file.filename)
    
    try:
        # Save uploaded file to temp location
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Process the resume
        extracted_data = process_resume(temp_file_path, file_extension)
        
        return extracted_data
        
    except Exception as e:
        print(f"Error in parse_resume_file: {e}")
        return {}
        
    finally:
        # Clean up temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
