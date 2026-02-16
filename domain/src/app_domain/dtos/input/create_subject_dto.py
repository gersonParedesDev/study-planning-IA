from pydantic import BaseModel
from uuid import UUID

class CreateSubjectDTO(BaseModel):
    user_id: UUID
    name: str
    description: str | None = None