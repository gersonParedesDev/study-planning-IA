from app_domain.dtos.input.create_subject_dto import CreateSubjectDTO
from app_domain.entities.subject import Subject
from app_domain.entities.resource import Resource
from app_domain.dtos.output.subject_response_dto import ResourceOutputDTO, SubjectResponseDTO
import uuid

class CreateSubjectUseCase:
    def __init__(self, subject_repository, resource_repository):
        self.subject_repo = subject_repository
        self.resource_repo = resource_repository

    def execute(self, data: CreateSubjectDTO) -> SubjectResponseDTO:
        if self.subject_repo.get_by_name(data.name):
            raise ValueError("subject name already exists")

        subject_id = uuid.uuid4()

        new_subject = Subject(
            id=subject_id,
            user_id=data.user_id,
            area_id=data.area_id,
            name=data.name,
        )
        self.subject_repo.save(new_subject)

        saved_resources = []

        for r in data.resources:
            resource = Resource(
                id=uuid.uuid4(),
                subject_id=subject_id,
                title=r.title,
                file_url=r.file_url,
                filename=r.filename,
                resource_type=r.resource_type,
            )
            self.resource_repo.save(resource)

            saved_resources.append(resource)

        return SubjectResponseDTO(
            id=new_subject.id,
            user_id=new_subject.user_id,
            area_id=new_subject.area_id,
            name=new_subject.name,
            resources=[
                ResourceOutputDTO(
                    id=r.id,
                    title=r.title,
                    resource_type=r.resource_type,
                ) for r in saved_resources
            ]
        )