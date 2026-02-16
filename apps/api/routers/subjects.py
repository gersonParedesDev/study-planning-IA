from app_domain.dtos.input.create_subject_dto import CreateSubjectDTO
from fastapi import APIRouter, Depends, status, HTTPException
from apps.api.dependencies.security import get_current_user
from apps.api.schemas.subjects import CreateSubjectRequest, SubjectResponse
from apps.api.dependencies.subjects import get_create_subject_use_case
from app_domain.use_cases.create_subject import CreateSubjectUseCase
from app_domain.entities.user import User

router = APIRouter(prefix="/subjects", tags=["Subjects"])

@router.post(
    "/", 
    response_model=SubjectResponse, 
    status_code=status.HTTP_201_CREATED,
    summary="Create a new subject for the current user"
)
async def create_subject(
    payload: CreateSubjectRequest,
    use_case: CreateSubjectUseCase = Depends(get_create_subject_use_case),
    current_user: User = Depends(get_current_user)
):
    try:
        subject_dto = CreateSubjectDTO(
            name=payload.name,
            description=payload.description,
            user_id=current_user.id
        )

        created_subject = use_case.execute(subject_dto) 

        return created_subject
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error"
        )