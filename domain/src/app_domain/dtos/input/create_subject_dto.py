from pydantic import BaseModel, field_validator
from uuid import UUID
from typing import List, Optional
from datetime import datetime
from app_domain.entities.resource import ResourceType, ResourceSourceType

class ResourceInputDTO(BaseModel):
    title: str
    resource_type: ResourceType
    source_type: ResourceSourceType
    file_url: Optional[str] = None
    filename: Optional[str] = None
    text_content: Optional[str] = None

class CreateSubjectDTO(BaseModel):
    user_id: UUID
    area_id: UUID
    name: str
    description: Optional[str] = None
    exam_date: Optional[datetime] = None
    resources: List[ResourceInputDTO]

    @field_validator("resources")
    def resources_not_empty(cls, v):
        if not v:
            raise ValueError("At least one resource is required")
        return v