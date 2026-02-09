from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID
from ...entities.subject import Subject

class SubjectRepository(ABC):
    
    @abstractmethod
    def save(self, subject: Subject) -> None:
        pass

    @abstractmethod
    def get_by_id(self, subject_id: UUID) -> Optional[Subject]:
        pass

    @abstractmethod
    def get_all_by_user_id(self, user_id: UUID) -> List[Subject]:
        pass