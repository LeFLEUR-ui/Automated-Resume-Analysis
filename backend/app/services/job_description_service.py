from sqlalchemy import desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.job_description import JobDescription
from app.schemas.job_description_schema import JobCreate

async def create_job(db: AsyncSession, job: JobCreate):
    db_job = JobDescription(**job.dict())
    db.add(db_job)
    await db.commit()
    await db.refresh(db_job)
    return db_job

async def get_job(db: AsyncSession, job_id: str):
    # ung jobs naka pabaligtad ung order niya, mauuna ung nasa pinaka huli na record which is ung newly created.
    query = (
        select(JobDescription)
        .filter(JobDescription.job_id == job_id)
        .order_by(desc(JobDescription.job_id))
    )
    
    result = await db.execute(query)
    return result.scalars().first()

async def get_all_active_jobs(db: AsyncSession, skip: int = 0, limit: int = 100):
    query = select(JobDescription).filter(JobDescription.is_active == True).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()