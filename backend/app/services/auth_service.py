from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.user import User
from app.utils.auth import hash_password, verify_password, create_access_token

async def register_user(db: AsyncSession, email: str, password: str, role: str):
    result = await db.execute(select(User).where(User.email == email))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise Exception("Email already registered")

    if role not in ["CANDIDATE", "HR", "ADMIN"]:
        raise Exception("Invalid role")

    new_user = User(
        email=email,
        password=hash_password(password),
        role=role
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


async def login_user(db: AsyncSession, email: str, password: str):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user:
        raise Exception("Invalid credentials")

    if not verify_password(password, user.password):
        raise Exception("Invalid credentials")

    token = create_access_token({
        "sub": user.email,
        "role": user.role
    })

    return {"token": token, "role": user.role}