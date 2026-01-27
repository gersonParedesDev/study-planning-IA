from uuid import UUID, uuid4
from typing import List
from pydantic import BaseModel, EmailStr, Field
from .subject import Subject

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    email: EmailStr
    subjects: List[Subject] = Field(default_factory=list)