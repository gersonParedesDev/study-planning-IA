from abc import ABC, abstractmethod
from typing import Optional, List
from uuid import UUID
from ...entities.subject import Subject

class SubjectRepository(ABC):

    @abstractmethod
    def save(self, subject: Subject) -> Subject:
        pass

    @abstractmethod
    def get_by_name(self, name: str) -> Optional[Subject]:
        pass

    @abstractmethod
    def get_by_id(self, subject_id: UUID) -> Optional[Subject]:
        pass

    @abstractmethod
    def get_all_by_user_id(self, user_id: UUID) -> List[Subject]:
        pass

    @abstractmethod
    def delete_by_id(self, subject_id: UUID) -> None:
        pass