from __future__ import annotations
from typing import TYPE_CHECKING, List
import uuid
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .subject import SubjectModel

class AreaModel(Base):
    __tablename__ = "areas"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, unique=True)

    subjects: Mapped[List["SubjectModel"]] = relationship(back_populates="area")