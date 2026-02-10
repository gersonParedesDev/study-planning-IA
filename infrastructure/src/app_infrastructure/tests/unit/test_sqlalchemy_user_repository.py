import uuid
from app_domain.entities.user import User
from app_infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
from app_infrastructure.database.models.user import UserModel
from app_infrastructure.tests.factories.user_factory import UserModelFactory

def test_save_user(db_session):

    new_user_entity = User(
        id=uuid.uuid4(),
        username="gerson_test",
        email="gerson@test.com",
        password="hashed_secret",
        firstname="Gerson",
        lastname="Test",
        age=25,
        country="AR",
        study_field="Systems"
    )
    
    repo = SqlAlchemyUserRepository(db_session)

    repo.save(new_user_entity)

    saved_model = db_session.query(UserModel).filter_by(id=new_user_entity.id).first()
    
    assert saved_model is not None
    assert saved_model.email == "gerson@test.com"

def test_get_user_by_email_found(db_session):

    UserModelFactory(email="buscado@test.com")

    repository = SqlAlchemyUserRepository(db_session)

    found_user = repository.get_by_email("buscado@test.com")

    assert found_user is not None
    assert found_user.email == "buscado@test.com"

def test_get_user_by_email_not_found(db_session):
    repository = SqlAlchemyUserRepository(db_session)
    user = repository.get_by_email("no_existo@test.com")

    assert user is None