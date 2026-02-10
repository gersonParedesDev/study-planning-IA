import uuid
from typing import List
from datetime import datetime, timezone
from .subject import SubjectModel
from sqlalchemy import String, Integer, DateTime, Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

user_subject_association = Table(
    'user_subjects',
    Base.metadata,
    Column('user_id', UUID(as_uuid=True), ForeignKey('users.id'), primary_key=True),
    Column('subject_id', UUID(as_uuid=True), ForeignKey('subjects.id'), primary_key=True)
)

class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    username: Mapped[str] = mapped_column(String, unique=True, index=True)
    password: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)

    firstname: Mapped[str] = mapped_column("first_name", String) 
    lastname: Mapped[str] = mapped_column("last_name", String)
    
    age: Mapped[int] = mapped_column(Integer)
    country: Mapped[str] = mapped_column(String)
    study_field: Mapped[str] = mapped_column(String)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    subjects: Mapped[List["SubjectModel"]] = relationship(
        "SubjectModel",
        secondary=user_subject_association,
        back_populates="users" 
    )