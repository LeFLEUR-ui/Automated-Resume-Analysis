import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.schemas.admin_schema import AdminCreate, AdminResponse, AdminUpdate
from app.schemas.user_schema import UserResponse
from app.services import admin_service


router = APIRouter(prefix="/admins", tags=["Adminstrators"])

@router.get("/users", response_model=List[UserResponse])
async def read_users(db: AsyncSession = Depends(get_db)):
    users = await admin_service.get_all_users(db)
    return users

@router.post("/register", response_model=AdminResponse, status_code=status.HTTP_200_OK)
async def register_admin(
    admin_in: AdminCreate, 
    db: AsyncSession = Depends(get_db)
):

    new_admin = await admin_service.create_admin_profile(db, admin_in)
    return new_admin

@router.get("/profile/{admin_id}", response_model=AdminResponse)
async def get_admin_profile_details(admin_id: int, db: AsyncSession = Depends(get_db)):
    profile = await admin_service.get_admin_profile(db, admin_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Admin profile not found")
    return profile

@router.put("/profile/{admin_id}", response_model=AdminResponse)
async def update_admin_profile_details(admin_id: int, admin_update: AdminUpdate, db: AsyncSession = Depends(get_db)):
    updated_profile = await admin_service.update_admin_profile(db, admin_id, admin_update)
    if not updated_profile:
        raise HTTPException(status_code=404, detail="Admin profile not found")
    return updated_profile

@router.post("/upload-profile-image/{admin_id}")
async def upload_admin_profile_image(admin_id: int, file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    upload_dir = "uploads/profile_images"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"admin_{admin_id}{file_extension}"
    file_path = os.path.join(upload_dir, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    image_url = f"http://localhost:8000/{file_path}"
    await admin_service.update_admin_profile(db, admin_id, AdminUpdate(profile_image_url=image_url))
    
    return {"image_url": image_url}