from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class CreateSubjectRequest(BaseModel):
    name: str
    description: Optional[str] = None

class SubjectResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True