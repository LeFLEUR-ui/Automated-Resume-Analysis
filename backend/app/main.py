from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.utils.limiter import limiter
from app.utils.database import engine, Base 
from app.models import *
from app.controllers.auth_controller import router as auth_router
from app.controllers.admin_controller import router as admin_router
from app.controllers.hr_controller import router as hr_router
from app.controllers.candidate_controller import router as candidate_router
from app.controllers.resume_controller import router as resume_router
from app.controllers.job_application_controller import router as job_application_router
from app.controllers.notification_controller import router as notification_router
from app.controllers.job_matching_controller import router as job_matching_router
from app.controllers.chat_controller import router as chat_router
from app.controllers.ai_caller_controller import router as ai_caller_router

import os
import asyncio
import logging

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    "http://localhost:3000",
    "http://127.0.0.1:3000",

    "http://192.168.1.15:5173",
]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Fast API",
    description="""
    An AI-powered system for analyzing resumes and providing automated job recommendations.
    
    ## Features
    * **Authentication**: Secure login and registration.
    * **Resume Analysis**: Extract and process candidate data.
    * **Job Matching**: AI-driven job recommendations based on candidate profiles.
    * **Real-time Notifications**: Updates for job applications and status changes.
    """,
    version="1.0.0",
    contact={
        "name": "API Support",
        "url": "http://127.0.0.1:8000/docs",
    }
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not os.path.exists("uploads"):
    os.makedirs("uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(hr_router)
app.include_router(candidate_router)
app.include_router(resume_router)
app.include_router(job_application_router)
app.include_router(notification_router)
app.include_router(job_matching_router)
app.include_router(chat_router)
app.include_router(ai_caller_router)

async def create_tables():
    from app.models.user import User
    from app.models.candidate import Candidate
    from app.models.hr import HR
    from app.models.admin import Admin
    from app.models.resume import Resume
    from app.models.job_application import JobApplication
    from app.models.notification import Notification
    from app.models.message import Message
    from app.models.password_reset import PasswordReset

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def startup():
    await create_tables()

@app.get("/", tags=["Testing"])
async def root():
    logger.info("API Documentation: http://127.0.0.1:8000/docs")
    return {
        "message": "Automated Resume Analysis with Job Recommendation!", 
        "docs_url": "http://127.0.0.1:8000/docs"
    }