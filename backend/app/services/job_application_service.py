from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.job_application import JobApplication
from app.schemas.job_application_schema import JobApplicationCreate

async def create_job_application(db: AsyncSession, application_in: JobApplicationCreate, db_job_id: int) -> JobApplication:
    data = application_in.model_dump()
    data['job_id'] = db_job_id
    new_application = JobApplication(**data)
    db.add(new_application)
    await db.commit()
    await db.refresh(new_application)
    return new_application

async def get_applications_by_job(db: AsyncSession, job_id: int) -> list[JobApplication]:
    result = await db.execute(select(JobApplication).filter(JobApplication.job_id == job_id))
    return result.scalars().all()
