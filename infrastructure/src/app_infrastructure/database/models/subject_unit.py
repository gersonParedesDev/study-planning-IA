from __future__ import annotations
import uuid
from typing import List, TYPE_CHECKING, Optional
from datetime import datetime, timezone
from sqlalchemy import String, Integer, Boolean, ForeignKey, DateTime
from sqlalchemy import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .subject import SubjectModel
    from .unit_topic import UnitTopicModel
    from .unit_exam_attempt import UnitExamAttemptModel

class SubjectUnitModel(Base):
    __tablename__ = "subject_units"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("subjects.id"), nullable=False)
    number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    is_unlocked: Mapped[bool] = mapped_column(Boolean, default=False)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    subject: Mapped["SubjectModel"] = relationship(back_populates="units")
    topics: Mapped[List["UnitTopicModel"]] = relationship(back_populates="unit", cascade="all, delete-orphan")
    exam_attempts: Mapped[List["UnitExamAttemptModel"]] = relationship(back_populates="unit", cascade="all, delete-orphan")