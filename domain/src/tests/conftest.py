from unittest.mock import Mock
import pytest
from src.ports.services.password_hasher import PasswordHasher
from src.ports.repositories.user_repository import UserRepository
from src.entities.user import User

@pytest.fixture
def mock_user_repo():
    repo = Mock(spec=UserRepository)
    return repo

@pytest.fixture
def mock_user_repo():
    return Mock(spec=UserRepository)

@pytest.fixture
def mock_hasher():
    hasher = Mock(spec=PasswordHasher)
    hasher.hash.return_value = "secret_hashed_123" 
    return hasher