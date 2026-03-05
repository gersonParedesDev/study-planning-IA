from typing import Optional

from app_domain.entities.user import User
from app_infrastructure.database.models.user import UserModel

class UserMapper:
    @staticmethod
    def to_domain(model: Optional[UserModel]) -> Optional[User]:
        """Convierte de Base de Datos a Dominio"""
        if not model:
            return None
            
        return User(
            id=model.id,
            username=model.username,
            email=model.email,
            password=model.password,
            firstname=model.firstname,
            lastname=model.lastname,
            plan=model.plan,
            study_field=model.study_field,
            age=model.age,
            country=model.country,
            created_at=model.created_at
        )

    @staticmethod
    def to_persistence(entity: User) -> UserModel:
        """Convierte de Dominio a Base de Datos"""
        return UserModel(
            id=entity.id,
            username=entity.username,
            email=entity.email,
            password=entity.password,
            firstname=entity.firstname,
            lastname=entity.lastname,
            plan=entity.plan,
            study_field=entity.study_field,
            age=entity.age,
            country=entity.country,
            created_at=entity.created_at
        )