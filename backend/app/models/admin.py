from sqlalchemy import *

from app.models.user import User


class Admin(User):
    __tablename__ = "admins"

    id = Column(Integer, ForeignKey("users.id"), primary_key=True)

    managed_region = Column(String, nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "ADMIN",
    }