import os
import shutil
from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.extractors.resume_processor import process_resume
from app.models.resume import Resume
from app.schemas.resume_schema import ResumeCreate, ResumeUpdate

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

async def create_resume(db: AsyncSession, resume_in: ResumeCreate) -> Resume:
    new_resume = Resume(**resume_in.model_dump())
    db.add(new_resume)
    await db.commit()
    await db.refresh(new_resume)
    return new_resume

async def get_resume(db: AsyncSession, resume_id: int) -> Resume | None:
    result = await db.execute(select(Resume).filter(Resume.id == resume_id))
    return result.scalars().first()

async def get_resumes_by_candidate(db: AsyncSession, candidate_id: int) -> list[Resume]:
    result = await db.execute(select(Resume).filter(Resume.candidate_id == candidate_id))
    return result.scalars().all()

async def update_resume(db: AsyncSession, resume_id: int, resume_in: ResumeUpdate) -> Resume | None:
    resume = await get_resume(db, resume_id)
    if not resume:
        return None
        
    update_data = resume_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(resume, key, value)
        
    await db.commit()
    await db.refresh(resume)
    return resume

async def delete_resume(db: AsyncSession, resume_id: int) -> bool:
    resume = await get_resume(db, resume_id)
    if not resume:
        return False
        
    await db.delete(resume)
    await db.commit()
    return True
