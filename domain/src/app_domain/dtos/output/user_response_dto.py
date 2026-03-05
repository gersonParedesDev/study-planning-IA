from typing import Optional
from app_domain.entities.user import PlanType
from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserResponseDTO(BaseModel):
    id: UUID
    email: EmailStr
    firstname: str
    lastname: str
    plan: PlanType
    study_field: Optional[str] = None
    username: Optional[str] = None
    age: Optional[int] = None
    country: Optional[str] = None
