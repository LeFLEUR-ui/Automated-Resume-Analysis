from typing import Optional

from pydantic import BaseModel, EmailStr


class HRCreate(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    company_name: str
    department: Optional[str] = None

class HRResponse(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    company_name: str
    role: str

    class Config:
        from_attributes = True