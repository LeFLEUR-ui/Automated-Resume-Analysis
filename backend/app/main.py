from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base 
from fastapi.staticfiles import StaticFiles
import os
from app.controllers.auth_controller import router as auth_router
from app.controllers.admin_controller import router as admin_router
from app.controllers.hr_controller import router as hr_router
from app.controllers.candidate_controller import router as candidate_router

import asyncio
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
if not os.path.exists("uploads"):
    os.makedirs("uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(hr_router)
app.include_router(candidate_router)

async def create_tables():
    from app.models.user import User
    from app.models.candidate import Candidate
    from app.models.hr import HR
    from app.models.admin import Admin

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def startup():
    await create_tables()

@app.get("/", tags=["Testing"])
def root():
    logger.info("API Documentation: http://127.0.0.1:8000/docs")
    return {
        "message": "Automated Resume Analysis with Job Recommendation!", 
        "docs_url": "http://127.0.0.1:8000/docs"
    }