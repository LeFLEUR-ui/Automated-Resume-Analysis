from pydantic import BaseModel, Field
from typing import Optional
from app.models.job_description import JobType

class JobBase(BaseModel):
    job_id: str = Field(..., example="JOB-2024-001")
    job_title: str
    department: str
    job_type: JobType
    location: str
    salary_range: Optional[str] = None
    description: str
    skills_requirements: str
    is_active: bool = True

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: int

    class Config:
        from_attributes = True