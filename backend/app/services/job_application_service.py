from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.job_application import JobApplication
from app.schemas.job_application_schema import JobApplicationCreate
from app.services.notification_service import create_notification

async def create_job_application(db: AsyncSession, application_in: JobApplicationCreate, db_job_id: int) -> JobApplication:
    data = application_in.model_dump()
    
    # Remove job_id from data as we'll pass the internal ID
    if 'job_id' in data:
        del data['job_id']
        
    new_application = JobApplication(
        job_id=db_job_id,
        **data
    )
    
    db.add(new_application)
    await db.commit()
    
    # Refresh with job relationship loaded for serialization
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(JobApplication)
        .options(selectinload(JobApplication.job))
        .filter(JobApplication.id == new_application.id)
    )
    new_application = result.scalars().first()
    
    # Trigger notification
    try:
        job_title = application_in.job_title if application_in.job_title else "a position"
        await create_notification(
            db=db,
            title="New Application Submitted",
            message=f"{application_in.candidate_name} applied for {job_title}.",
            type="application"
        )
    except Exception as notif_err:
        print(f"WARNING: Notification failed but application saved: {notif_err}")
        
    return new_application

async def get_applications_by_job(db: AsyncSession, job_id: int) -> list[JobApplication]:
    result = await db.execute(select(JobApplication).filter(JobApplication.job_id == job_id))
    return result.scalars().all()

async def get_applications_by_email(db: AsyncSession, email: str) -> list[JobApplication]:
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(JobApplication)
        .options(selectinload(JobApplication.job))
        .filter(JobApplication.candidate_email == email)
        .order_by(JobApplication.created_at.desc())
    )
    return result.scalars().all()

async def get_all_applications(db: AsyncSession) -> list[JobApplication]:
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(JobApplication).options(selectinload(JobApplication.job)).order_by(JobApplication.created_at.desc())
    )
    return result.scalars().all()

async def update_application_status(db: AsyncSession, application_id: int, new_status: str) -> Optional[JobApplication]:
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(JobApplication)
        .options(selectinload(JobApplication.job))
        .filter(JobApplication.id == application_id)
    )
    db_application = result.scalars().first()
    
    if not db_application:
        return None
        
    db_application.status = new_status
    await db.commit()
    await db.refresh(db_application)
    
    # Optional: Send notification about status change
    try:
        await create_notification(
            db=db,
            title="Application Status Updated",
            message=f"Application for {db_application.candidate_name} marked as {new_status}.",
            type="application_update"
        )
    except:
        pass
        
    return db_application
