from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app.schemas.candidate_schema import CandidateCreate, CandidateResponse
from app.services.candidate_service import create_candidate_profile

router = APIRouter(prefix="/candidate", tags=["Candidates"])

@router.post("/register", response_model=CandidateResponse, status_code=status.HTTP_200_OK)
async def register_candidate(
    candidate_in: CandidateCreate, 
    db: AsyncSession = Depends(get_db)
):
    try:
        return await create_candidate_profile(db, candidate_in)
        
    except IntegrityError as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )
        
    except Exception as e:
        await db.rollback()
        print(f"Registration Error: {str(e)}") 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while creating your account."
        )