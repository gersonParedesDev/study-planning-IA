from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional
from datetime import datetime
from apps.api.schemas.resources import ResourceInput, ResourceOutput

class CreateSubjectRequest(BaseModel):
    name: str
    area_id: UUID
    description: Optional[str] = None
    exam_date: Optional[datetime] = None
    resources: List[ResourceInput]

class UpdateSubjectRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class SubjectResponse(BaseModel):
    id: UUID
    user_id: UUID
    area_id: UUID
    area_name: Optional[str] = None 
    name: str
    description: Optional[str] = None
    exam_date: Optional[datetime] = None
    resources: List[ResourceOutput] = []

    class Config:
        from_attributes = True