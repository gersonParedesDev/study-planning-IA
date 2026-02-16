from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional
from app_domain.entities.subject import Subject
from app_infrastructure.database.models.subject import SubjectModel
from app_domain.ports.output.subject_repository import SubjectRepository

class SqlAlchemySubjectRepository(SubjectRepository):
    def __init__(self, db: Session):
        self.db = db

    def _map_to_entity(self, model: SubjectModel) -> Subject:
        return Subject(
            id=model.id,
            user_id=model.user_id,
            name=model.name,
            description=model.description,
        )

    def save(self, subject: Subject) -> Subject:
        subject_model = SubjectModel(
            id=subject.id,
            user_id=subject.user_id,
            name=subject.name,
            description=subject.description
        )

        self.db.add(subject_model)
        self.db.commit()
        self.db.refresh(subject_model)

        return self._map_to_entity(subject_model)

    def get_by_name(self, name: str) -> Optional[Subject]:
        model = self.db.query(SubjectModel).filter(SubjectModel.name == name).first()
        
        if not model:
            return None
        return self._map_to_entity(model)

    def get_by_id(self, subject_id: UUID) -> Optional[Subject]:
        model = self.db.query(SubjectModel).filter(SubjectModel.id == subject_id).first()
        
        if not model:
            return None
        return self._map_to_entity(model)