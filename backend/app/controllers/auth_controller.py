from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

from app.schemas.user_schema import Token, UserCreate, UserLogin
from app.services import auth_service
from app.utils.auth import require_role

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        new_user = await auth_service.register_user(
            db, user.email, user.password, user.role
        )
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=Token)
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    try:
        data = await auth_service.login_user(
            db, user.email, user.password
        )
        return {
            "access_token": data["token"],
            "token_type": "bearer",
            "role": data["role"]
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    
