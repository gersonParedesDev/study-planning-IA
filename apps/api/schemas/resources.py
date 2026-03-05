from uuid import UUID
from app_domain.entities.resource import ResourceType
from pydantic import BaseModel


class ResourceInput(BaseModel):
    title: str
    file_url: str = ""
    filename: str = ""
    resource_type: ResourceType

class ResourceOutput(BaseModel):
    id: UUID
    title: str
    resource_type: ResourceType

    class Config:
        from_attributes = True