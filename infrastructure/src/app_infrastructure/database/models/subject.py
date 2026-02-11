from __future__ import annotations
import uuid
from typing import List, TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .enrollment import EnrollmentModel
    from .resource import ResourceModel

class SubjectModel(Base):
    __tablename__ = "subjects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, index=True, unique=True)
    description: Mapped[str | None] = mapped_column(String, nullable=True)

    enrollments: Mapped[List["EnrollmentModel"]] = relationship(
        back_populates="subject"
    )

    resources: Mapped[List["ResourceModel"]] = relationship(
        back_populates="subject", 
        cascade="all, delete-orphan"
    )