from sqlalchemy.orm import Session
from app_domain.entities.resource import Resource
from app_infrastructure.database.models.resource import ResourceModel
from app_domain.ports.output.resource_repository import ResourceRepository

class SqlAlchemyResourceRepository(ResourceRepository):
    def __init__(self, db: Session):
        self.db = db

    def _map_to_entity(self, model: ResourceModel) -> Resource:
        return Resource(
            id=model.id,
            subject_id=model.subject_id,
            title=model.title,
            resource_type=model.resource_type,
            source_type=model.source_type,
            file_url=model.file_url,
            filename=model.filename,
            text_content=model.text_content,
            extracted_text=model.extracted_text,
        )

    def save(self, resource: Resource) -> Resource:
        model = ResourceModel(
            id=resource.id,
            subject_id=resource.subject_id,
            title=resource.title,
            resource_type=resource.resource_type,
            source_type=resource.source_type,
            file_url=resource.file_url,
            filename=resource.filename,
            text_content=resource.text_content,
            extracted_text=resource.extracted_text,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._map_to_entity(model)