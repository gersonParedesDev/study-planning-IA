from typing import List
from app_domain.entities.resource import ResourceType
from pydantic import BaseModel
from uuid import UUID

class ResourceOutputDTO(BaseModel):
    id: UUID
    title: str
    resource_type: ResourceType

class SubjectResponseDTO(BaseModel):
    id: UUID
    user_id: UUID
    area_id: UUID
    name: str
    resources: List[ResourceOutputDTO] = []