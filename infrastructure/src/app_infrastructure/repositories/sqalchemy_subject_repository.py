from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from app_domain.entities.subject import Subject
from app_infrastructure.database.models.subject import SubjectModel
from app_domain.ports.output.subject_repository import SubjectRepository

class SqlAlchemySubjectRepository(SubjectRepository):
    def __init__(self, db: Session):
        self.db = db

    def _map_to_entity(self, model: SubjectModel) -> Subject:
        return Subject(
            id=model.id,
            area_id=model.area_id,
            user_id=model.user_id,
            name=model.name,
            description=model.description,
            exam_date=model.exam_date,
            area_name=model.area.name if model.area else None,  # 👈 JOIN automático
        )

    def save(self, subject: Subject) -> Subject:
        subject_model = SubjectModel(
            id=subject.id,
            user_id=subject.user_id,
            area_id=subject.area_id,
            name=subject.name,
            description=subject.description,
            exam_date=subject.exam_date,
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

    def get_all_by_user_id(self, user_id: UUID) -> List[Subject]:
        models = self.db.query(SubjectModel).filter(SubjectModel.user_id == user_id).all()
        return [self._map_to_entity(model) for model in models]

    def delete_by_id(self, subject_id: UUID) -> None:
        model = self.db.query(SubjectModel).filter(SubjectModel.id == subject_id).first()
        if model:
            self.db.delete(model)
            self.db.commit()
        else:
            raise ValueError("subject not found")

    def update(self, subject: Subject) -> Subject:
        model = self.db.query(SubjectModel).filter(SubjectModel.id == subject.id).first()
        if not model:
            raise ValueError("Subject model not found")

        model.name = subject.name
        model.description = subject.description

        self.db.commit()
        self.db.refresh(model)
        return self._map_to_entity(model)