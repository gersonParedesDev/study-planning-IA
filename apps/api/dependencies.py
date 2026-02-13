import os

from fastapi import Depends
from sqlalchemy.orm import Session

from app_domain.use_cases.register_user import RegisterUserUseCase
from app_domain.ports.output.token_provider import TokenProvider
from app_domain.ports.output.password_hasher import PasswordHasher
from app_domain.ports.output.user_repository import UserRepository

from app_infrastructure.database.config import SessionLocal
from app_infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
from app_infrastructure.security.hasher import BcryptHasher
from app_infrastructure.security.token_provider import JwtTokenProvider

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)

def get_hasher() -> PasswordHasher:
    return BcryptHasher()

def get_register_user_use_case(
    repo: UserRepository = Depends(get_user_repository),
    hasher: PasswordHasher = Depends(get_hasher)
) -> RegisterUserUseCase:
    return RegisterUserUseCase(repo, hasher)

def get_token_provider() -> TokenProvider:
    secret = os.getenv("JWT_SECRET")
    if not secret:
        raise ValueError("CRITICAL: JWT_SECRET environment variable is missing!")
    algo = os.getenv("ALGORITHM", "HS256")
    minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    
    return JwtTokenProvider(
        jwt_secret=secret, 
        algorithm=algo, 
        expire_minutes=minutes
    )