from uuid import UUID
from typing import Optional
from app_domain.entities.resource import ResourceType, ResourceSourceType
from pydantic import BaseModel

class ResourceInput(BaseModel):
    title: str
    resource_type: ResourceType
    source_type: ResourceSourceType
    file_url: Optional[str] = None
    filename: Optional[str] = None
    text_content: Optional[str] = None

class ResourceOutput(BaseModel):
    id: UUID
    title: str
    resource_type: ResourceType
    source_type: ResourceSourceType
    file_url: Optional[str] = None
    text_content: Optional[str] = None

    class Config:
        from_attributes = True