from sqlalchemy.ext.asyncio import AsyncSession

from app.models.hr import HR
from app.schemas.hr_schema import HRCreate
from app.utils.auth import hash_password

async def create_hr_profile(db: AsyncSession, hr_in: HRCreate):

    new_hr = HR(
        fullname=hr_in.fullname,
        email=hr_in.email,
        password=hash_password(hr_in.password),
        role="HR",
        company_name=hr_in.company_name,
        department=hr_in.department
    )
    
    db.add(new_hr)
    await db.commit()
    await db.refresh(new_hr)
    return new_hr