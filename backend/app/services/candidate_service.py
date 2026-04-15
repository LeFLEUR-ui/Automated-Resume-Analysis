from sqlalchemy.ext.asyncio import AsyncSession

from app.models.candidate import Candidate
from app.schemas.candidate_schema import CandidateCreate
from app.utils.auth import hash_password

async def create_candidate_profile(db: AsyncSession, candidate_in: CandidateCreate):
    """
    Creates a new Candidate profile. 
    SQLAlchemy handles the polymorphic 'users' table entry automatically.
    """
    new_candidate = Candidate(
        fullname=candidate_in.fullname,
        email=candidate_in.email,
        password=hash_password(candidate_in.password),
        role="CANDIDATE",
        resume_url=candidate_in.resume_url,
        experience_years=candidate_in.experience_years
    )
    
    db.add(new_candidate)
    await db.commit()
    await db.refresh(new_candidate)
    return new_candidate