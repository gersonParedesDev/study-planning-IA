import uuid
from typing import List, TYPE_CHECKING, Optional
from datetime import datetime, timezone
from app_domain.entities.user import PlanType
from sqlalchemy import String, Integer, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .resource import ResourceModel
    from .subject import SubjectModel

class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    password: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)

    firstname: Mapped[str] = mapped_column(String) 
    lastname: Mapped[str] = mapped_column(String)

    plan: Mapped[PlanType] = mapped_column(SQLEnum(PlanType), default=PlanType.FREE)

    username: Mapped[Optional[str]] = mapped_column(String, unique=True, index=True, nullable=True)
    age: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    country: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    study_field: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    subjects: Mapped[List["SubjectModel"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )