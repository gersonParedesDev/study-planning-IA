from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum
from typing import List

class RoleMessageType(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

@dataclass
class Message:
    role: RoleMessageType
    content: str

class AIProvider(ABC):

    @abstractmethod
    def chat(self, system_prompt: str, messages: List[Message]) -> str:
        """
        system_prompt: contexto del agente (quién es, qué material tiene)
        messages: historial de la conversación
        returns: respuesta de la IA como string
        """
        pass