from abc import ABC, abstractmethod
from app_domain.dtos import RegisterUserDTO
from app_domain.dtos import UserResponseDTO

class RegisterUserPort(ABC):
    
    @abstractmethod
    def execute(self, data: RegisterUserDTO) -> UserResponseDTO:
        pass