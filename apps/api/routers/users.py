from fastapi import APIRouter, Depends, HTTPException, status
from apps.api.schemas.users import UserRegisterRequest, UserResponse
from app_domain.use_cases.register_user import RegisterUserUseCase
from apps.api.dependencies import get_register_user_use_case

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
        created_user = await use_case.execute(
            email=request.email, 
            password=request.password
        )
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