from pydantic import BaseModel, field_validator
from uuid import UUID
from typing import List
from app_domain.entities.resource import ResourceType

class ResourceInputDTO(BaseModel):
    title: str
    file_url: str = ""
    filename: str = ""
    resource_type: ResourceType

class CreateSubjectDTO(BaseModel):
    user_id: UUID
    area_id: UUID
    name: str
    resources: List[ResourceInputDTO]

    @field_validator("resources")
    def resources_not_empty(cls, v):
        if not v:
            raise ValueError("At least one resource is required")
        return v