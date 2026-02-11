from pydantic import BaseModel, EmailStr, Field

class UserRegisterRequest(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str
    username: str
    age: int = Field(..., gt=0)
    country: str
    study_field: str

class UserResponse(BaseModel):
    id: str
    firstname: str
    lastname: str
    email: EmailStr
    username: str
