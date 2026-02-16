import uuid
from app_domain.entities.subject import Subject
from app_infrastructure.database.models.subject import SubjectModel
from app_infrastructure.repositories.sqalchemy_subject_repository import SqlAlchemySubjectRepository
from app_infrastructure.tests.factories.user_factory import UserModelFactory
from app_infrastructure.tests.factories.subject_factory import SubjectModelFactory 

def test_save_subject(db_session):
    owner = UserModelFactory() 

    new_subject_entity = Subject(
        id=uuid.uuid4(),
        user_id=owner.id,
        name="Matemática Avanzada",
        description="Cálculo integral y diferencial"
    )
    
    repo = SqlAlchemySubjectRepository(db_session)

    repo.save(new_subject_entity)

    saved_model = db_session.query(SubjectModel).filter_by(id=new_subject_entity.id).first()
    
    assert saved_model is not None
    assert saved_model.name == "Matemática Avanzada"
    assert saved_model.user_id == owner.id 

def test_get_subject_by_name_found(db_session):
    owner = UserModelFactory()
    SubjectModelFactory(name="Física I", user_id=owner.id)

    repo = SqlAlchemySubjectRepository(db_session)

    found_subject = repo.get_by_name("Física I")

    assert found_subject is not None
    assert found_subject.name == "Física I"
    assert found_subject.user_id == owner.id

def test_get_subject_by_name_not_found(db_session):
    repo = SqlAlchemySubjectRepository(db_session)

    subject = repo.get_by_name("Materia Fantasma")

    assert subject is None