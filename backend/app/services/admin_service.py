from sqlalchemy.ext.asyncio import AsyncSession
from app.models.admin import Admin
from app.schemas.admin_schema import AdminCreate
from app.utils.auth import hash_password

async def create_admin_profile(db: AsyncSession, admin_in: AdminCreate):
    """
    Creates a new Admin profile. 
    SQLAlchemy handles the polymorphic 'users' table entry automatically.
    """
    new_admin = Admin(
        fullname=admin_in.fullname,
        email=admin_in.email,
        password=hash_password(admin_in.password),
        role="ADMIN",
        managed_region=admin_in.managed_region
    )
    
    db.add(new_admin)
    await db.commit()
    await db.refresh(new_admin)
    return new_admin