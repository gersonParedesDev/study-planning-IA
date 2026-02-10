import uuid
from typing import List, TYPE_CHECKING
from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .user import UserModel
    from .resource import ResourceModel

class SubjectModel(Base):
    __tablename__ = "subjects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, index=True)
    description: Mapped[str | None] = mapped_column(String, nullable=True)

    users: Mapped[List["UserModel"]] = relationship(
        "UserModel",
        secondary="user_subjects",
        back_populates="subjects"
    )

    resources: Mapped[List["ResourceModel"]] = relationship(
        "ResourceModel", 
        back_populates="subject", 
        cascade="all, delete-orphan"
    )