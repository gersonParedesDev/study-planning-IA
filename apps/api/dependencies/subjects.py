from fastapi import Depends
from sqlalchemy.orm import Session
from app_domain.ports.output.subject_repository import SubjectRepository
from app_domain.use_cases.create_subject import CreateSubjectUseCase
from app_infrastructure.repositories.sqalchemy_subject_repository import SqlAlchemySubjectRepository
from .database import get_db

def get_subject_repository(db: Session = Depends(get_db)) -> SubjectRepository:
    return SqlAlchemySubjectRepository(db)

def get_create_subject_use_case(
    repo: SubjectRepository = Depends(get_subject_repository)
) -> CreateSubjectUseCase:
    return CreateSubjectUseCase(repo)