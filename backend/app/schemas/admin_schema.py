from typing import Optional
from pydantic import BaseModel, EmailStr


class AdminCreate(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    managed_region: Optional[str] = None


class AdminResponse(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    managed_region: Optional[str]
    role: str

    class Config:
        from_attributes = True
