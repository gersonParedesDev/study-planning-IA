from typing import Optional
from app_domain.entities.user import PlanType
from pydantic import BaseModel, EmailStr, Field

class RegisterUserDTO(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    firstname: str
    lastname: str
    plan: PlanType
    username: Optional[str] = None
    study_field: Optional[str] = None
    age: Optional[int] = Field(default=None, gt=0)
    country: Optional[str] = None
    