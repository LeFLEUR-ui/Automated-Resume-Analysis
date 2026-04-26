from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.schemas.job_application_schema import JobApplicationCreate, JobApplicationResponse
from app.services import job_application_service
from app.models.job_description import JobDescription
from sqlalchemy.future import select

router = APIRouter(prefix="/applications", tags=["Job Applications"])

@router.post("/", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_job_application(application_in: JobApplicationCreate, db: AsyncSession = Depends(get_db)):
    """
    Submit a new job application.
    """
    # Verify job exists
    result = await db.execute(select(JobDescription).filter(JobDescription.job_id == application_in.job_id))
    job = result.scalars().first()
    
    if not job:
        # Fallback for static jobs or numeric IDs just in case
        try:
            numeric_id = int(application_in.job_id)
            result = await db.execute(select(JobDescription).filter(JobDescription.id == numeric_id))
            job = result.scalars().first()
        except ValueError:
            pass
            
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    return await job_application_service.create_job_application(db, application_in, job.id)

@router.get("/", response_model=List[JobApplicationResponse])
async def get_all_applications(db: AsyncSession = Depends(get_db)):
    """
    Get all job applications from all jobs.
    """
    return await job_application_service.get_all_applications(db)

@router.get("/job/{job_id}", response_model=List[JobApplicationResponse])
async def get_applications_for_job(job_id: int, db: AsyncSession = Depends(get_db)):
    """
    Get all applications for a specific job.
    """
    return await job_application_service.get_applications_by_job(db, job_id)
