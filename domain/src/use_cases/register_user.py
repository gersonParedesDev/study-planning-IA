import uuid
from src.ports.services.password_hasher import PasswordHasher
from src.dtos.register_user_dto import RegisterUserDTO
from src.entities.user import User
from src.ports.repositories.user_repository import UserRepository

class RegisterUserUseCase:
    def __init__(self, user_repository: UserRepository, password_hasher: PasswordHasher):
        self.user_repo = user_repository
        self.hasher = password_hasher 

    def execute(self, data: RegisterUserDTO) -> User:
        if self.user_repo.get_by_email(data.email):
            raise ValueError("email is already registered")

        generated_id = str(uuid.uuid4())
        hashed = self.hasher.hash(data.password)

        new_user = User(
            id=generated_id,
            email=data.email,
            username=data.username,
            password=hashed
        )

        self.user_repo.save(new_user)
        return new_user