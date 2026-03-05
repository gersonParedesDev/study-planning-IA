from typing import List
from uuid import UUID
from app_domain.dtos.output.subject_response_dto import SubjectResponseDTO
from app_domain.ports.output.subject_repository import SubjectRepository

class GetSubjectsByUserUseCase:
    def __init__(self, subject_repository: SubjectRepository):
        self.subject_repo = subject_repository

    def execute(self, user_id: UUID) -> List[SubjectResponseDTO]:
        subjects = self.subject_repo.get_all_by_user_id(user_id)

        return [
            SubjectResponseDTO(
                id=subject.id,
                user_id=subject.user_id,
                area_id=subject.area_id,
                name=subject.name,
            ) for subject in subjects
        ]