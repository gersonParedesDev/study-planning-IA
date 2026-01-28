import pytest
from unittest.mock import Mock
from src.tests.conftest import mock_hasher
from src.entities.user import User
from src.use_cases.register_user import RegisterUserDTO, RegisterUserUseCase
from src.tests.factories.user_factory import UserFactory

def test_should_register_user_successfully(mock_user_repo, mock_hasher):
    user_data = UserFactory.build() 
    
    dto = RegisterUserDTO(
        email=user_data.email, 
        username=user_data.username,
        password=user_data.password
    )

    mock_user_repo.get_by_email.return_value = None

    use_case = RegisterUserUseCase(mock_user_repo, mock_hasher)

    result = use_case.execute(dto)

    assert isinstance(result, User)
    assert result.email == user_data.email
    mock_user_repo.save.assert_called_once()

def test_should_fail_if_email_already_exists(mock_user_repo, mock_hasher):

    existing_user = UserFactory(email="busy@test.com")

    mock_user_repo.get_by_email.return_value = existing_user
    
    use_case = RegisterUserUseCase(mock_user_repo, mock_hasher)

    dto = RegisterUserDTO(email="busy@test.com", username="new_intruder", password="any_password")

    with pytest.raises(ValueError) as excinfo:
        use_case.execute(dto)

    assert str(excinfo.value) == "email is already registered"
    
    mock_user_repo.save.assert_not_called()

def test_should_register_user_with_hashed_password(mock_user_repo, mock_hasher):
    user_data = UserFactory.build(password="password123")
    
    dto = RegisterUserDTO(
        email=user_data.email, 
        username=user_data.username,
        password=user_data.password
    )

    mock_user_repo.get_by_email.return_value = None

    use_case = RegisterUserUseCase(mock_user_repo, mock_hasher)

    result = use_case.execute(dto)

    assert result.password == "secret_hashed_123"
    assert result.password != "password123"

    mock_hasher.hash.assert_called_once_with("password123")
    
    saved_user = mock_user_repo.save.call_args[0][0]
    assert saved_user.password == "secret_hashed_123"