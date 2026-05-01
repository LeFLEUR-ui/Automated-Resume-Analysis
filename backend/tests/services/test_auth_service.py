import pytest
from app.services import auth_service
from app.models.user import User
from sqlalchemy.future import select

@pytest.mark.asyncio
async def test_register_user_success(db_session):
    email = "test@example.com"
    password = "password123"
    role = "CANDIDATE"
    
    user = await auth_service.register_user(db_session, email, password, role, "Test User")
    
    assert user.email == email
    assert user.role == role
    
    # Verify in DB
    result = await db_session.execute(select(User).where(User.email == email))
    db_user = result.scalar_one_or_none()
    assert db_user is not None
    assert db_user.email == email

@pytest.mark.asyncio
async def test_register_user_duplicate_email(db_session):
    email = "duplicate@example.com"
    await auth_service.register_user(db_session, email, "pass1", "CANDIDATE", "Dup User")
    
    with pytest.raises(Exception) as excinfo:
        await auth_service.register_user(db_session, email, "pass2", "CANDIDATE", "Dup User 2")
    assert "Email already registered" in str(excinfo.value)

@pytest.mark.asyncio
async def test_login_user_success(db_session):
    email = "login@example.com"
    password = "secretpassword"
    await auth_service.register_user(db_session, email, password, "HR", "Login User")
    
    login_data = await auth_service.login_user(db_session, email, password)
    
    assert "token" in login_data
    assert login_data["role"] == "HR"

@pytest.mark.asyncio
async def test_login_user_wrong_password(db_session):
    email = "wrongpass@example.com"
    await auth_service.register_user(db_session, email, "correctpass", "ADMIN", "Wrong Pass User")
    
    with pytest.raises(Exception) as excinfo:
        await auth_service.login_user(db_session, email, "wrongpass")
    assert "Invalid credentials" in str(excinfo.value)

@pytest.mark.asyncio
async def test_request_password_reset(db_session):
    email = "reset@example.com"
    await auth_service.register_user(db_session, email, "pass123", "CANDIDATE", "Reset User")
    
    result = await auth_service.request_password_reset(db_session, email)
    assert result is True
    
    # In a real test we might check if a token was created in the DB
    # but since it prints to console it's harder to check without mocking the EmailService
