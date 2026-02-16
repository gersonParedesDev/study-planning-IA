from app_domain.tests.factories.subject_factory import SubjectFactory
from app_domain.dtos.input.create_subject_dto import CreateSubjectDTO
from app_domain.dtos.output.subject_response_dto import SubjectResponseDTO
from app_domain.use_cases.create_subject import CreateSubjectUseCase
import pytest

def test_should_create_subject_succesfully(mock_subject_repo):
    subject_data = SubjectFactory.build()

    dto = CreateSubjectDTO(
        user_id=subject_data.user_id,
        name=subject_data.name,
        description=subject_data.description,
    )

    mock_subject_repo.get_by_name.return_value = None

    mock_subject_repo.save.side_effect = lambda x: x

    use_case = CreateSubjectUseCase(mock_subject_repo)

    result = use_case.execute(dto)

    assert isinstance(result, SubjectResponseDTO)
    
    assert isinstance(result, SubjectResponseDTO)
    assert result.name == dto.name
    assert result.user_id == dto.user_id
    
    mock_subject_repo.save.assert_called_once()

def test_should_raise_error_if_subject_name_already_exists(mock_subject_repo):
    subject_data = SubjectFactory.build()
    dto = CreateSubjectDTO(
        user_id=subject_data.user_id, 
        name="Matematica"
    )

    mock_subject_repo.get_by_name.return_value = subject_data 

    use_case = CreateSubjectUseCase(mock_subject_repo)

    with pytest.raises(ValueError) as excinfo:
        use_case.execute(dto)
    
    assert str(excinfo.value) == "subject name already exists"
    
    mock_subject_repo.save.assert_not_called()
