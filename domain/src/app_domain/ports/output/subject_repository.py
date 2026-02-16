from abc import ABC, abstractmethod
from typing import Optional
from ...entities.subject import Subject

class SubjectRepository(ABC):
    
    @abstractmethod
    def save(self, subject: Subject) -> None:
        pass

    @abstractmethod
    def get_by_name(self, name: str) -> Optional[Subject]:
        pass