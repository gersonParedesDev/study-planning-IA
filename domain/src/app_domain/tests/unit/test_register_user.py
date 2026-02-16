import pytest
from unittest.mock import Mock
from app_domain.entities.user import User
from app_domain.use_cases.register_user import RegisterUserUseCase
from app_domain.dtos.input.register_user_dto import RegisterUserDTO
from app_domain.dtos.output.user_response_dto import UserResponseDTO
from app_domain.tests.factories.user_factory import UserFactory

def test_should_register_user_successfully(mock_user_repo, mock_hasher):
    user_data = UserFactory.build() 
    
    dto = RegisterUserDTO(
        email=user_data.email, 
        username=user_data.username,
        password=user_data.password,
        first_name=user_data.firstname,
        last_name=user_data.lastname,
        age=user_data.age,
        country=user_data.country,
        study_field=user_data.study_field
    )

    mock_user_repo.get_by_email.return_value = None

    use_case = RegisterUserUseCase(mock_user_repo, mock_hasher)

    result = use_case.execute(dto)

    assert isinstance(result, UserResponseDTO)
    
    assert result.email == user_data.email
    assert result.username == user_data.username
    assert result.id is not None
    
    mock_user_repo.save.assert_called_once()


def test_should_fail_if_email_already_exists(mock_user_repo, mock_hasher):
    existing_user = UserFactory(email="busy@test.com")
    mock_user_repo.get_by_email.return_value = existing_user
    
    use_case = RegisterUserUseCase(mock_user_repo, mock_hasher)

    dto = RegisterUserDTO(
        email="busy@test.com", 
        username="new_intruder", 
        password="any_password",
        first_name="Test",
        last_name="Intruder",
        age=20,
        country="AR",
        study_field="CS"
    )

    with pytest.raises(ValueError) as excinfo:
        use_case.execute(dto)

    assert str(excinfo.value) == "email is already registered"
    
    mock_user_repo.save.assert_not_called()


def test_should_register_user_with_hashed_password(mock_user_repo, mock_hasher):
    user_data = UserFactory.build(password="password123")
    
    mock_hasher.hash.return_value = "secret_hashed_123"

    dto = RegisterUserDTO(
        email=user_data.email, 
        username=user_data.username,
        password="password123",
        first_name=user_data.firstname,
        last_name=user_data.lastname,
        age=user_data.age,
        country=user_data.country,
        study_field=user_data.study_field
    )

    mock_user_repo.get_by_email.return_value = None

    use_case = RegisterUserUseCase(mock_user_repo, mock_hasher)

    result = use_case.execute(dto)

    mock_user_repo.save.assert_called_once()
    saved_user_entity = mock_user_repo.save.call_args[0][0]
    assert isinstance(saved_user_entity, User)
    assert saved_user_entity.password == "secret_hashed_123"
    
    mock_hasher.hash.assert_called_once_with("password123")