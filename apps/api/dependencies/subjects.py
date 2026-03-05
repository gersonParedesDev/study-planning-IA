from app_domain.ports.output.resource_repository import ResourceRepository
from app_infrastructure.repositories.sqlalchemy_resource_repository import SqlAlchemyResourceRepository
from fastapi import Depends
from sqlalchemy.orm import Session
from app_domain.ports.output.subject_repository import SubjectRepository
from app_domain.use_cases.create_subject import CreateSubjectUseCase
from app_infrastructure.repositories.sqalchemy_subject_repository import SqlAlchemySubjectRepository
from .database import get_db
from app_domain.use_cases.get_subjects_by_user import GetSubjectsByUserUseCase
from app_domain.use_cases.delete_subject import DeleteSubjectUseCase


def get_subject_repository(db: Session = Depends(get_db)) -> SubjectRepository:
    return SqlAlchemySubjectRepository(db)

def get_resource_repository(db: Session = Depends(get_db)) -> ResourceRepository:
    return SqlAlchemyResourceRepository(db)

def get_get_subjects_by_user_use_case(
    repo: SubjectRepository = Depends(get_subject_repository)
) -> GetSubjectsByUserUseCase:
    return GetSubjectsByUserUseCase(repo)

def get_create_subject_use_case(
    repoSubject: SubjectRepository = Depends(get_subject_repository),
    repoResource: ResourceRepository = Depends(get_resource_repository)
) -> CreateSubjectUseCase:
    return CreateSubjectUseCase(repoSubject, repoResource)

def get_delete_subject_use_case(
    repo: SubjectRepository = Depends(get_subject_repository)
) -> DeleteSubjectUseCase:
    return DeleteSubjectUseCase(repo)