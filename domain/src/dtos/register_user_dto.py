from pydantic import BaseModel, EmailStr

class RegisterUserDTO(BaseModel):
    email: EmailStr
    username: str
    password: str

class LoginUserDTO(BaseModel):
    email: EmailStr
    password: str
