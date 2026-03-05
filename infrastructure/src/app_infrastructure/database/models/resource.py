from app_domain.entities.resource import ResourceType
from sqlalchemy import UUID, String, ForeignKey, Enum as SQLEnum 
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
    file_url: Mapped[str] = mapped_column(String)
    filename: Mapped[str] = mapped_column(String)
    resource_type: Mapped[ResourceType] = mapped_column(SQLEnum(ResourceType))

    subject_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("subjects.id"))

    subject: Mapped["SubjectModel"] = relationship(back_populates="resources")