from passlib.context import CryptContext
from app_domain.ports.output.password_hasher import PasswordHasher 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class BcryptHasher(PasswordHasher):
    
    def hash(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)