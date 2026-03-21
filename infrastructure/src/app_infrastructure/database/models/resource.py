from datetime import datetime, timezone

from app_domain.entities.resource import ResourceSourceType, ResourceType
from sqlalchemy import UUID, DateTime, String, ForeignKey, Enum as SQLEnum, Text 
from typing import TYPE_CHECKING, Optional
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
import uuid

if TYPE_CHECKING:
    from .user import UserModel
    from .subject import SubjectModel

class ResourceModel(Base):
    __tablename__ = "resources"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("subjects.id"))
    title: Mapped[str] = mapped_column(String, nullable=False)
    resource_type: Mapped[ResourceType] = mapped_column(SQLEnum(ResourceType), nullable=False)
    source_type: Mapped[ResourceSourceType] = mapped_column(SQLEnum(ResourceSourceType), nullable=False)
    file_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    filename: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    text_content: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    extracted_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    subject: Mapped["SubjectModel"] = relationship(back_populates="resources")