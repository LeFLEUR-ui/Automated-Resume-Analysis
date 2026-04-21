from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.hr_schema import HRCreate, HRResponse
from app.schemas.job_description_schema import JobCreate, JobResponse
from app.services import hr_service
from app.services.job_description_service import create_job, get_all_active_jobs, get_job

router = APIRouter(prefix="/hr", tags=["HR Management"])

@router.post("/register", response_model=HRResponse)
async def register_hr(hr_in: HRCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await hr_service.create_hr_profile(db, hr_in)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")
    
# ===================== For Job Management Section

@router.post("/create-job", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job_description(
    job: JobCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await create_job(db=db, job=job)

@router.get("/read-jobs", response_model=List[JobResponse])
async def read_active_jobs(
    skip: int = 0, 
    limit: int = 10, 
    db: AsyncSession = Depends(get_db)
):
    return await get_all_active_jobs(db, skip=skip, limit=limit)

@router.get("/read-job/{job_id}", response_model=JobResponse)
async def read_job(job_id: str, db: AsyncSession = Depends(get_db)):
    # job_id is now a string (e.g., JOB-2024-001)
    db_job = await get_job(db, job_id=job_id)
    if not db_job:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found")
    return db_job