from sqlalchemy import UUID, Column, String, DateTime
import uuid
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(UUID (as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    subjects = relationship("SubjectModel", back_populates="owner", cascade="all, delete-orphan")

    created_at = Column(DateTime, default=datetime.utcnow)