from app_domain.dtos.input.create_subject_dto import CreateSubjectDTO
from app_domain.entities.subject import Subject
from app_domain.dtos.output.subject_response_dto import SubjectResponseDTO
import uuid

class CreateSubjectUseCase:
    def __init__(self, subject_repository):
        self.subject_repo = subject_repository

    def execute(self, data: CreateSubjectDTO) -> SubjectResponseDTO:
        if self.subject_repo.get_by_name(data.name):
            raise ValueError("subject name already exists")

        generated_id = uuid.uuid4()

        new_subject = Subject(
            id=generated_id,
            user_id=data.user_id,
            name=data.name,
            description=data.description
        )

        self.subject_repo.save(new_subject)

        return SubjectResponseDTO(
            id=new_subject.id,
            user_id=new_subject.user_id,
            name=new_subject.name,
            description=new_subject.description
        )