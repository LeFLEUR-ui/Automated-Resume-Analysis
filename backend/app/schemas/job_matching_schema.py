from pydantic import BaseModel
from typing import Optional


class JobMatchResult(BaseModel):
    job_id: str
    job_title: str
    department: str
    location: str
    job_type: Optional[str] = None
    match_percentage: float
    skills_score: float
    experience_score: float
    education_score: float
    matched_skills: list[str]
    missing_skills: list[str]


class MatchResponse(BaseModel):
    results: list[JobMatchResult]


class ResumeMatchRequest(BaseModel):
    """Accept already-parsed resume data for matching."""
    skills: Optional[str] = ""
    years_experience: Optional[int] = 0
    highest_degree: Optional[str] = ""
    fullname: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    experience: Optional[str] = ""
    education: Optional[str] = ""
    profile_image_url: Optional[str] = None
