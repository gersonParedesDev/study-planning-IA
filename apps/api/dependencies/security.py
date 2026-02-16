from app_domain.ports.output.user_repository import UserRepository
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
import os
from app_domain.entities.user import User
from app_domain.ports.output.password_hasher import PasswordHasher
from app_domain.ports.output.token_provider import TokenProvider
from app_infrastructure.security.hasher import BcryptHasher
from app_infrastructure.security.token_provider import JwtTokenProvider

def get_hasher() -> PasswordHasher:
    return BcryptHasher()

def get_token_provider() -> TokenProvider:
    secret = os.getenv("JWT_SECRET")
    if not secret:
        raise ValueError("CRITICAL: JWT_SECRET environment variable is missing!")
    algo = os.getenv("ALGORITHM", "HS256")
    minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    
    return JwtTokenProvider(
        jwt_secret=secret, 
        algorithm=algo, 
        expire_minutes=minutes
    )

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login") 

# Importamos tus otras dependencias
from .users import get_user_repository
from .security import get_token_provider # El que ya tienes con os.getenv

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    token_provider: TokenProvider = Depends(get_token_provider),
    user_repo: UserRepository = Depends(get_user_repository)
) -> User:
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = token_provider.decode_token(token)
        email_payload = payload.get("sub")
        if not email_payload or not isinstance(email_payload, str):
            raise credentials_exception
        email: str = email_payload
            
    except Exception:
        raise credentials_exception

    # 2. Buscamos al usuario en la DB
    user = user_repo.get_by_email(email)
    if user is None:
        raise credentials_exception
        
    # 3. Devolvemos la entidad User completa
    return user