import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from app_infrastructure.database.models.base import Base
from app_infrastructure.tests.factories.user_factory import UserModelFactory

TEST_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture(scope="function")
def db_session():
    """
    Create a new data base
    """
    engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = scoped_session(SessionLocal) 

    setattr(UserModelFactory._meta, "sqlalchemy_session", db)

    yield db

    db.close()
    Base.metadata.drop_all(bind=engine)