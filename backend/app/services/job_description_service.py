from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from app.models.job_description import JobDescription
from app.schemas.job_description_schema import JobCreate, JobUpdate

async def create_job(db: AsyncSession, job: JobCreate):
    db_job = JobDescription(**job.dict())
    db.add(db_job)
    await db.commit()
    await db.refresh(db_job)
    return db_job

async def get_job(db: AsyncSession, job_id: str):
    result = await db.execute(select(JobDescription).filter(JobDescription.job_id == job_id))
    return result.scalars().first()


# retrieving all jobs in descending order, bali mauuna ung newly created which is nasa pinaka dulo ng record.
async def get_all_active_jobs(db: AsyncSession, skip: int = 0, limit: int = 100):
    query = (
        select(JobDescription)
        .filter(JobDescription.is_active == True)
        .order_by(desc(JobDescription.id))
        .offset(skip)
        .limit(limit)
    )
    
    result = await db.execute(query)
    return result.scalars().all()

async def update_job(db: AsyncSession, job_id: str, job_data: JobUpdate):
    # fetcH all existing records
    result = await db.execute(select(JobDescription).filter(JobDescription.job_id == job_id))
    db_job = result.scalars().first()
    
    if not db_job:
        return None

    # Update only the fields that were provided (using model_dump for Pydantic v2)
    # exclude_unset=True ensures we don't overwrite values with None if they weren't in the request
    update_data = job_data.model_dump(exclude_unset=True) 
    
    for key, value in update_data.items():
        setattr(db_job, key, value)

    await db.commit()
    await db.refresh(db_job)
    return db_job

async def set_job_status(db: AsyncSession, job_id: str, active_status: bool):
    result = await db.execute(select(JobDescription).filter(JobDescription.job_id == job_id))
    db_job = result.scalars().first()
    
    if db_job:
        db_job.is_active = active_status
        await db.commit()
        await db.refresh(db_job)
        
    return db_job