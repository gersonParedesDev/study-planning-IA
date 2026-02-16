from app_domain.dtos.input.register_user_dto import RegisterUserDTO
from fastapi import APIRouter, Depends, HTTPException, status
from apps.api.schemas.users import UserRegisterRequest, UserResponse
from app_domain.use_cases.register_user import RegisterUserUseCase
from apps.api.dependencies.users import get_register_user_use_case

router = APIRouter()

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def register_user(
    request: UserRegisterRequest,
    use_case: RegisterUserUseCase = Depends(get_register_user_use_case)
):
    try:

        user_dto = RegisterUserDTO(
            email=request.email,
            password=request.password,
            first_name=request.firstname,
            last_name=request.lastname,
            age=request.age,
            country=request.country,
            study_field=request.study_field,
            username=request.username
        )

        created_user = use_case.execute(user_dto) 
        
        return created_user

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )
    except Exception as e:
        print(f"Error in register: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error intern server"
        )