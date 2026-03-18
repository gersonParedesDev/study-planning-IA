from app_domain.dtos.input.create_subject_dto import CreateSubjectDTO
from app_domain.entities.subject import Subject
from app_domain.entities.resource import Resource
from app_domain.dtos.output.subject_response_dto import ResourceOutputDTO, SubjectResponseDTO
from app_domain.ports.output.document_extractor import DocumentExtractor
from app_domain.ports.output.file_storage import FileStoragePort
import uuid

class CreateSubjectUseCase:
    def __init__(self, subject_repository, resource_repository, extractor: DocumentExtractor, storage: FileStoragePort):
        self.subject_repo = subject_repository
        self.resource_repo = resource_repository
        self.extractor = extractor
        self.storage = storage

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
            extracted_text = None
            try:
                file_bytes = self.storage.get_file_bytes(r.file_url)
                if self.extractor.is_image(r.filename):
                    extracted_text = self.extractor.extract_from_image(file_bytes)
                else:
                    extracted_text = self.extractor.extract_from_pdf(file_bytes)
            except Exception:
                extracted_text = None

            resource = Resource(
                id=uuid.uuid4(),
                subject_id=subject_id,
                title=r.title,
                file_url=r.file_url,
                filename=r.filename,
                resource_type=r.resource_type,
                extracted_text=extracted_text,
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