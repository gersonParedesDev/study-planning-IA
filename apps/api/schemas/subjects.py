from pydantic import BaseModel
from uuid import UUID
from typing import List
from app_domain.entities.resource import ResourceType
from apps.api.schemas.resources import ResourceInput, ResourceOutput

class CreateSubjectRequest(BaseModel):
    name: str
    area_id: UUID
    resources: List[ResourceInput]


class SubjectResponse(BaseModel):
    id: UUID
    user_id: UUID
    area_id: UUID
    name: str
    resources: List[ResourceOutput] = []

    class Config:
        from_attributes = True