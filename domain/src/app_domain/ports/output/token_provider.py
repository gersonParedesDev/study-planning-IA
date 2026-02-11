from abc import ABC, abstractmethod

class TokenProvider(ABC):
    @abstractmethod
    def create_access_token(self, data: dict) -> str:
        """Create token JWT with data users"""
        pass