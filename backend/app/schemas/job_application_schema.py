from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class JobInfo(BaseModel):
    id: int
    job_title: str
    location: str
    department: str

class JobApplicationBase(BaseModel):
    candidate_name: str
    candidate_email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    job_title: Optional[str] = None
    company: Optional[str] = None
    relevance: Optional[str] = None
    degree: Optional[str] = None
    college: Optional[str] = None
    skills: Optional[List[str]] = None
    match_score: Optional[float] = None

class JobApplicationCreate(JobApplicationBase):
    job_id: str

class JobApplicationResponse(JobApplicationBase):
    id: int
    job_id: int
    status: str
    created_at: datetime
    updated_at: datetime
    job: Optional[JobInfo] = None

    class Config:
        from_attributes = True
