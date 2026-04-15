from sqlalchemy import *

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    fullname = Column(String, nullable=False) 
    role = Column(String)

    __mapper_args__ = {
        "polymorphic_on": role,
        "polymorphic_identity": "user"
    }