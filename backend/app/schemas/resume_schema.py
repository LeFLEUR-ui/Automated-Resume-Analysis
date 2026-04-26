from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class ResumeBase(BaseModel):
    filename: str
    file_url: Optional[str] = None
    parsed_data: Optional[Dict[str, Any]] = None

class ResumeCreate(ResumeBase):
    candidate_id: int

class ResumeUpdate(BaseModel):
    filename: Optional[str] = None
    file_url: Optional[str] = None
    parsed_data: Optional[Dict[str, Any]] = None

class ResumeResponse(ResumeBase):
    id: int
    candidate_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
