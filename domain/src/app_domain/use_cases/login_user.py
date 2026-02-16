from typing import Dict

from app_domain.dtos.output.login_output import LoginOutput
from app_domain.ports.output.user_repository import UserRepository
from app_domain.ports.output.password_hasher import PasswordHasher
from app_domain.ports.output.token_provider import TokenProvider


class LoginUserUseCase:
    def __init__(
        self, 
        user_repository: UserRepository,
        password_hasher: PasswordHasher,
        token_provider: TokenProvider
    ):
        self.user_repository = user_repository
        self.password_hasher = password_hasher
        self.token_provider = token_provider

    def execute(self, email: str, password: str) -> LoginOutput:
        user = self.user_repository.get_by_email(email)
        
        if not user or not self.password_hasher.verify(password, user.password):
            raise ValueError("Invalid credentials") 

        token = self.token_provider.create_access_token(data={"sub": user.email})

        return LoginOutput(access_token=token)