import os
import shutil
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.hr_schema import HRCreate, HRResponse, HRUpdate
from app.schemas.job_description_schema import JobCreate, JobResponse, JobUpdate
from app.services import hr_service
from app.services.job_description_service import create_job, get_all_active_jobs, get_job, set_job_status, update_job

router = APIRouter(prefix="/hr", tags=["HR Management"])

@router.post("/register", response_model=HRResponse)
async def register_hr(hr_in: HRCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await hr_service.create_hr_profile(db, hr_in)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")

@router.get("/profile/{hr_id}", response_model=HRResponse)
async def get_hr_profile_details(hr_id: int, db: AsyncSession = Depends(get_db)):
    profile = await hr_service.get_hr_profile(db, hr_id)
    if not profile:
        raise HTTPException(status_code=404, detail="HR profile not found")
    return profile

@router.put("/profile/{hr_id}", response_model=HRResponse)
async def update_hr_profile_details(hr_id: int, hr_update: HRUpdate, db: AsyncSession = Depends(get_db)):
    updated_profile = await hr_service.update_hr_profile(db, hr_id, hr_update)
    if not updated_profile:
        raise HTTPException(status_code=404, detail="HR profile not found")
    return updated_profile

@router.post("/upload-profile-image/{hr_id}")
async def upload_hr_profile_image(hr_id: int, file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    upload_dir = "uploads/profile_images"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"hr_{hr_id}{file_extension}"
    file_path = os.path.join(upload_dir, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    image_url = f"http://localhost:8000/{file_path}"
    await hr_service.update_hr_profile(db, hr_id, HRUpdate(profile_image_url=image_url))
    
    return {"image_url": image_url}
    
# ===================== For Job Management Section

@router.post("/createjob", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job_description(
    job: JobCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await create_job(db=db, job=job)

@router.get("/read-jobs", response_model=List[JobResponse])
async def read_active_jobs(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    return await get_all_active_jobs(db, skip=skip, limit=limit)

@router.get("/read-job/{job_id}", response_model=JobResponse)
async def read_job(job_id: str, db: AsyncSession = Depends(get_db)):
    db_job = await get_job(db, job_id=job_id)
    if not db_job:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found")
    return db_job

@router.patch("/update-job/{job_id}", response_model=JobResponse)
async def update_job_details(
    job_id: str, 
    job_data: JobUpdate, 
    db: AsyncSession = Depends(get_db)
):
    db_job = await update_job(db=db, job_id=job_id, job_data=job_data)
    if not db_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Job {job_id} not found"
        )
    return db_job

@router.patch("/archive-job/{job_id}", response_model=JobResponse)
async def archive_job(job_id: str, db: AsyncSession = Depends(get_db)):
    db_job = await set_job_status(db=db, job_id=job_id, active_status=False)
    if not db_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Job {job_id} not found"
        )
    return db_job


@router.patch("/unarchive-job/{job_id}", response_model=JobResponse)
async def unarchive_job(job_id: str, db: AsyncSession = Depends(get_db)):
    db_job = await set_job_status(db=db, job_id=job_id, active_status=True)
    if not db_job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Job {job_id} not found"
        )
    return db_job