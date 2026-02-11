from app_domain.models.resource_type import ResourceType
from sqlalchemy import UUID, Column, String, ForeignKey, Enum as SQLEnum 
from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
import uuid

if TYPE_CHECKING:
    from .user import UserModel
    from .subject import SubjectModel


class ResourceModel(Base):
    __tablename__ = "resources"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String)
    filename: Mapped[str] = mapped_column(String)
    url: Mapped[str] = mapped_column(String)
    type: Mapped[ResourceType] = mapped_column(SQLEnum(ResourceType))

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    subject_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("subjects.id"))

    user: Mapped["UserModel"] = relationship(back_populates="resources_uploaded")
    subject: Mapped["SubjectModel"] = relationship(back_populates="resources")