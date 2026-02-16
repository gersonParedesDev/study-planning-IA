# apps/api/dependencies/users.py
from fastapi import Depends
from sqlalchemy.orm import Session
from app_domain.ports.output.user_repository import UserRepository
from app_domain.use_cases.register_user import RegisterUserUseCase
from app_infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
from .database import get_db
from .security import get_hasher
from app_domain.ports.output.password_hasher import PasswordHasher

def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)

def get_register_user_use_case(
    repo: UserRepository = Depends(get_user_repository),
    hasher: PasswordHasher = Depends(get_hasher)
) -> RegisterUserUseCase:
    return RegisterUserUseCase(repo, hasher)