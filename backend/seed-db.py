import asyncio
from app.utils.database import engine, get_db
from app.models.job_description import JobDescription, JobType
from app.services.job_description_service import create_job
from app.schemas.job_description_schema import JobCreate
from sqlalchemy.ext.asyncio import AsyncSession

async def seed():
    async with engine.begin() as conn:
        from app.utils.database import Base
        # This will recreate all tables defined in the models
        await conn.run_sync(Base.metadata.create_all)
        print("Recreated all database tables.")
    
    async for db in get_db():
        # Check if job exists
        from sqlalchemy.future import select
        result = await db.execute(select(JobDescription).filter(JobDescription.job_id == "JOB-2026-2052"))
        if not result.scalars().first():
            job_in = JobCreate(
                job_id="JOB-2026-2052",
                job_title="Full-stack Web Developer",
                department="Engineering",
                job_type=JobType.FULL_TIME,
                location="Sto. Tomas, Batangas",
                salary_range="60k - 90k",
                description="Looking for an experienced developer with knowledge in React, FastAPI, and PostgreSQL.",
                skills_requirements="Python, React, Javascript, Typescript, SQL, PostgreSQL, FastAPI",
                is_active=True
            )
            await create_job(db, job_in)
            print("Seeded job: JOB-2026-2052")
        else:
            print("Job JOB-2026-2052 already exists")
        break

if __name__ == "__main__":
    asyncio.run(seed())
