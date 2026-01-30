from sqlalchemy import UUID, Column, String, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from .base import Base

class SubjectModel(Base):
    __tablename__ = "subjects"

    id = Column(UUID (as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    
    user_id = Column(UUID, ForeignKey("users.id"))
    
    owner = relationship("UserModel", back_populates="subjects")
    resources = relationship("ResourceModel", back_populates="subject", cascade="all, delete-orphan")