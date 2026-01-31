from pydantic import BaseModel, EmailStr, Field

class RegisterUserDTO(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=8)
    first_name: str
    last_name: str
    age: int = Field(..., gt=0,)
    country: str
    study_field: str = Field(...)