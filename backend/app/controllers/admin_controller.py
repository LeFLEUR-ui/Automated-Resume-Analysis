from fastapi import APIRouter
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.admin_schema import AdminCreate, AdminResponse
from app.services import admin_service


router = APIRouter(prefix="/admins", tags=["Adminstrators"])

@router.post("/register", response_model=AdminResponse, status_code=status.HTTP_200_OK)
async def register_admin(
    admin_in: AdminCreate, 
    db: AsyncSession = Depends(get_db)
):

    new_admin = await admin_service.create_admin_profile(db, admin_in)
    return new_admin