from pydantic import BaseModel
from uuid import UUID

class UserResponseDTO(BaseModel):
    id: UUID
    username: str
    email: str
    first_name: str
    last_name: str
    age: int
    country: str
    study_field: str