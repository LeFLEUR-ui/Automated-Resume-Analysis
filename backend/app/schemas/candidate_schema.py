from typing import Optional

from pydantic import BaseModel, EmailStr


class CandidateCreate(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    resume_url: Optional[str] = None
    experience_years: Optional[int] = 0

class CandidateResponse(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    resume_url: Optional[str]
    experience_years: int
    role: str

    class Config:
        from_attributes = True