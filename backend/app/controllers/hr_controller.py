from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.hr_schema import HRCreate, HRResponse
from app.services import hr_service


router = APIRouter(prefix="/hr", tags=["HR Management"])

@router.post("/register", response_model=HRResponse)
async def register_hr(hr_in: HRCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await hr_service.create_hr_profile(db, hr_in)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")