from passlib.context import CryptContext
from domain.src.ports.services.password_hasher import PasswordHasher

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class BcryptHasher(PasswordHasher):
    def hash(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify(self, password: str, hashed_password: str) -> bool:
        return pwd_context.verify(password, hashed_password)