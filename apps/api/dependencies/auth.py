from fastapi import Depends
from app_domain.use_cases.login_user import LoginUserUseCase

from apps.api.dependencies.users import get_user_repository
from apps.api.dependencies.security import get_hasher, get_token_provider

from app_domain.ports.output.user_repository import UserRepository
from app_domain.ports.output.password_hasher import PasswordHasher
from app_domain.ports.output.token_provider import TokenProvider

def get_login_user_use_case(
    repo: UserRepository = Depends(get_user_repository),
    hasher: PasswordHasher = Depends(get_hasher),
    token_provider: TokenProvider = Depends(get_token_provider)
) -> LoginUserUseCase:
    return LoginUserUseCase(repo, hasher, token_provider)