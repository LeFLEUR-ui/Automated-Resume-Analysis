from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job_descriptions.id"), nullable=False)
    
    # Candidate details
    candidate_name = Column(String, nullable=False)
    candidate_email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    
    # Parsed resume and form data
    job_title = Column(String, nullable=True)
    company = Column(String, nullable=True)
    relevance = Column(String, nullable=True)
    degree = Column(String, nullable=True)
    college = Column(String, nullable=True)
    skills = Column(JSON, nullable=True)
    
    status = Column(String, default="PENDING") # PENDING, REVIEWED, REJECTED, ACCEPTED
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    job = relationship("JobDescription", back_populates="applications")
