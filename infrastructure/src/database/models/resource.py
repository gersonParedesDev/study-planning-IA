from sqlalchemy import UUID, Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
import uuid

class ResourceModel(Base):
    __tablename__ = "resources"

    id = Column(UUID (as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String)
    content = Column(String)
    
    subject_id = Column(UUID (as_uuid=True), ForeignKey("subjects.id"), nullable=False)
    
    subject = relationship("SubjectModel", back_populates="resources")