from app_domain.dtos.input.update_subject_dto import UpdateSubjectDTO
from app_domain.ports.output.subject_repository import SubjectRepository
from app_domain.dtos.output.subject_response_dto import SubjectResponseDTO

class UpdateSubjectUseCase:
    def __init__(self, subject_repository: SubjectRepository):
        self.subject_repository = subject_repository

    def execute(self, dto: UpdateSubjectDTO) -> SubjectResponseDTO:
        subject = self.subject_repository.get_by_id(dto.subject_id)
        if not subject:
            raise ValueError("Subject not found")

        if dto.name is not None:
            subject.name = dto.name
        if dto.description is not None:
            subject.description = dto.description

        updated_subject = self.subject_repository.update(subject)
        
        return SubjectResponseDTO(
            id=updated_subject.id,
            name=updated_subject.name,
            description=updated_subject.description,
            exam_date=updated_subject.exam_date,
            area_name=updated_subject.area_name,
            resources=[] # Simplified for now
        )
