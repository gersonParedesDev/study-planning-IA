from pydantic import BaseModel
from uuid import UUID

class SubjectResponseDTO(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    description: str | None = None