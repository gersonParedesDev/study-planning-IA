from sqlalchemy.orm import Session
from uuid import UUID
from app_domain.entities.user import User
from app_domain.entities.subject import Subject 
from app_domain.ports.output.user_repository import UserRepository
from app_infrastructure.database.models.user import UserModel
from app_infrastructure.database.models.subject import SubjectModel

class SqlAlchemyUserRepository(UserRepository):
    def __init__(self, db: Session):
        self.db = db

    def _map_to_entity(self, model: UserModel) -> User:
        """Helper privado para convertir Modelo SQL -> Entidad Dominio"""
        
        domain_subjects = [
            Subject(
                id=s.id,
                name=s.name,
                user_id=s.user_id,
                description=s.description
            ) for s in model.subjects
        ]

        return User(
            id=model.id,
            username=model.username,
            password=model.password,
            email=model.email,
            firstname=model.firstname, 
            lastname=model.lastname,
            age=model.age,
            country=model.country,
            study_field=model.study_field,
            created_at=model.created_at,
        )

    def get_by_id(self, user_id: UUID) -> User | None:
        model = self.db.query(UserModel).filter(UserModel.id == user_id).first()
        if not model:
            return None
        return self._map_to_entity(model)

    def get_by_email(self, email: str) -> User | None:
        model = self.db.query(UserModel).filter(UserModel.email == email).first()
        if not model:
            return None
        return self._map_to_entity(model)

    def save(self, user: User) -> User:

        user_model = UserModel(
            id=user.id,
            username=user.username,
            password=user.password,
            email=user.email,
            firstname=user.firstname,
            lastname=user.lastname,
            age=user.age,
            country=user.country,
            study_field=user.study_field,
            created_at=user.created_at
        )

        self.db.add(user_model)
        self.db.commit()
        self.db.refresh(user_model)
        
        return self._map_to_entity(user_model)