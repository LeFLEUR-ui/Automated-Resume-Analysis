from sqlalchemy import *

from app.models.user import User


class Candidate(User):
    __tablename__ = "candidates"

    id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    resume_url = Column(String, nullable=True)
    experience_years = Column(Integer, default=0)

    __mapper_args__ = {
        "polymorphic_identity": "CANDIDATE",
    }