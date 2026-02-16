from abc import ABC, abstractmethod
from typing import Any, Dict

class TokenProvider(ABC):
    @abstractmethod
    def create_access_token(self, data: dict) -> str:
        """Create token JWT with data users"""
        pass

    @abstractmethod
    def decode_token(self, token: str) -> Dict[str, Any]:
        pass