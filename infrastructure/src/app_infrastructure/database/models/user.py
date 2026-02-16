import uuid
from typing import List, TYPE_CHECKING
from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

if TYPE_CHECKING:
    from .resource import ResourceModel
    from .subject import SubjectModel

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

    resources_uploaded: Mapped[List["ResourceModel"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )

    subjects: Mapped[List["SubjectModel"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )