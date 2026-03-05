from uuid import UUID
from app_infrastructure.database.adapters.user_mapper import UserMapper
from app_infrastructure.database.models.user import UserModel
from sqlalchemy.orm import Session
from app_domain.entities.user import User
from app_domain.ports.output.user_repository import UserRepository

class SqlAlchemyUserRepository(UserRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: UUID) -> User | None:
        model = self.db.query(UserModel).filter(UserModel.id == user_id).first()
        return UserMapper.to_domain(model)

    def get_by_email(self, email: str) -> User | None:
        model = self.db.query(UserModel).filter(UserModel.email == email).first()
        return UserMapper.to_domain(model) 

    def save(self, user: User) -> None:
        new_model = UserMapper.to_persistence(user)
        
        self.db.merge(new_model)
        self.db.commit()