from typing import List, Optional
from datetime import datetime
from app_domain.entities.resource import ResourceType, ResourceSourceType
from pydantic import BaseModel
from uuid import UUID

class ResourceOutputDTO(BaseModel):
    id: UUID
    title: str
    resource_type: ResourceType
    source_type: ResourceSourceType
    file_url: Optional[str] = None
    extracted_text: Optional[str] = None

class SubjectResponseDTO(BaseModel):
    id: UUID
    user_id: UUID
    area_id: UUID
    area_name: Optional[str] = None 
    name: str
    description: Optional[str] = None
    exam_date: Optional[datetime] = None
    resources: List[ResourceOutputDTO] = []

    class Config:
        from_attributes = True