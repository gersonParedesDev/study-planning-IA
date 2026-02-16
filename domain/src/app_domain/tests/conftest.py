from unittest.mock import Mock
from app_domain.ports.output.subject_repository import SubjectRepository
import pytest
from app_domain.ports.services.password_hasher import PasswordHasher
from app_domain.ports.output.user_repository import UserRepository
from app_domain.entities.user import User

@pytest.fixture
def mock_user_repo():
    return Mock(spec=UserRepository)

@pytest.fixture
def mock_hasher():
    hasher = Mock(spec=PasswordHasher)
    hasher.hash.return_value = "secret_hashed_123" 
    return hasher

@pytest.fixture
def mock_subject_repo():
    return Mock(spec=SubjectRepository)