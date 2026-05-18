from __future__ import annotations
from datetime import datetime
import uuid
from typing import List, TYPE_CHECKING, Optional
from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .resource import ResourceModel
    from .user import UserModel
    from .area import AreaModel
    from .subject_unit import SubjectUnitModel  # 👈

class SubjectModel(Base):
    __tablename__ = "subjects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    area_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("areas.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, index=True, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    exam_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    user: Mapped["UserModel"] = relationship(back_populates="subjects")
    area: Mapped["AreaModel"] = relationship(back_populates="subjects")

    resources: Mapped[List["ResourceModel"]] = relationship(
        back_populates="subject",
        cascade="all, delete-orphan"
    )
    units: Mapped[List["SubjectUnitModel"]] = relationship(
        back_populates="subject",
        cascade="all, delete-orphan"
    )