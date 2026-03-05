from uuid import UUID

from app_domain.dtos.input.create_subject_dto import CreateSubjectDTO, ResourceInputDTO
from app_domain.use_cases.delete_subject import DeleteSubjectUseCase
from fastapi import APIRouter, Depends, status, HTTPException
from apps.api.dependencies.security import get_current_user
from apps.api.schemas.subjects import CreateSubjectRequest, SubjectResponse
from apps.api.dependencies.subjects import get_create_subject_use_case, get_delete_subject_use_case
from app_domain.use_cases.create_subject import CreateSubjectUseCase
from app_domain.entities.user import User

from app_domain.use_cases.get_subjects_by_user import GetSubjectsByUserUseCase
from apps.api.dependencies.subjects import get_get_subjects_by_user_use_case
from typing import List

router = APIRouter(prefix="/subjects", tags=["Subjects"])

@router.get(
    "/",
    response_model=List[SubjectResponse],
    status_code=status.HTTP_200_OK,
    summary="Get all subjects for the current user"
)
async def get_subjects(
    use_case: GetSubjectsByUserUseCase = Depends(get_get_subjects_by_user_use_case),
    current_user: User = Depends(get_current_user)
):
    try:
        return use_case.execute(user_id=current_user.id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error"
        )

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
            area_id=payload.area_id,
            user_id=current_user.id,
            resources=[
                ResourceInputDTO(
                    title=r.title,
                    file_url=r.file_url,
                    filename=r.filename,
                    resource_type=r.resource_type,
                ) for r in payload.resources
            ]
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

@router.delete(
    "/{subject_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a subject by ID"
)
async def delete_subject(
    subject_id: UUID,
    use_case: DeleteSubjectUseCase = Depends(get_delete_subject_use_case),
    current_user: User = Depends(get_current_user)
):
    try:
        use_case.execute(subject_id=subject_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )