from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app_domain.use_cases.login_user import LoginUserUseCase
from apps.api.dependencies.auth import get_login_user_use_case

router = APIRouter(tags=["Auth"])

@router.post("/auth/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    use_case: LoginUserUseCase = Depends(get_login_user_use_case)
):
    try:
        result = use_case.execute(
            email=form_data.username,
            password=form_data.password
        )
        return result
        
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )