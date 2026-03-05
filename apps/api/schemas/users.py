from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field
from app_domain.entities.user import PlanType 

# LO QUE ENTRA DESDE REACT (que espero recibir en el front)
class UserRegisterRequest(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str = Field(..., min_length=8) 
    plan: PlanType

    username: Optional[str] = None
    age: Optional[int] = Field(default=None, gt=0)
    country: Optional[str] = None
    study_field: Optional[str] = None

# LO QUE SALE HACIA REACT (lo que voy a devolver)
class UserResponse(BaseModel):
    id: UUID
    firstname: str
    lastname: str
    email: EmailStr
    plan: PlanType

    username: Optional[str] = None
    age: Optional[int] = None
    country: Optional[str] = None
    study_field: Optional[str] = None