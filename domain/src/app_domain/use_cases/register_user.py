import uuid
from app_domain.dtos.register_user_dto import RegisterUserDTO
from app_domain.entities.user import User
from app_domain.ports.output.password_hasher import PasswordHasher
from app_domain.ports.output.user_repository import UserRepository
from app_domain.dtos.user_response_dto import UserResponseDTO 

class RegisterUserUseCase:
    def __init__(self, user_repository: UserRepository, password_hasher: PasswordHasher):
        self.user_repo = user_repository
        self.hasher = password_hasher 

    def execute(self, data: RegisterUserDTO) -> UserResponseDTO:
        if self.user_repo.get_by_email(data.email):
            raise ValueError("email is already registered")

        generated_id = uuid.uuid4()
        hashed = self.hasher.hash(data.password)

        new_user = User(
            id=generated_id,
            firstname=data.first_name,
            lastname=data.last_name,
            age=data.age,
            country=data.country,
            study_field=data.study_field,
            email=data.email,
            username=data.username,
            password=hashed
        )

        self.user_repo.save(new_user)

        return UserResponseDTO(
            id=new_user.id,
            username=new_user.username,
            email=new_user.email,
            first_name=new_user.firstname,
            last_name=new_user.lastname,
            age=new_user.age,
            country=new_user.country,
            study_field=new_user.study_field
        )