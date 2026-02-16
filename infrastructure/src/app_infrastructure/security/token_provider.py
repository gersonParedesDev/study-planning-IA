from datetime import datetime, timedelta, timezone
from typing import Dict
from jose import jwt
from app_domain.ports.output.token_provider import TokenProvider

class JwtTokenProvider(TokenProvider):
    def __init__(self, jwt_secret: str, algorithm: str, expire_minutes: int):
        self.jwt_secret = jwt_secret
        self.algorithm = algorithm
        self.expire_minutes = expire_minutes

    def create_access_token(self, data: dict) -> str:
        to_encode = data.copy()
        
        expire = datetime.now(timezone.utc) + timedelta(minutes=self.expire_minutes)
        
        to_encode.update({"exp": expire})

        encoded_jwt = jwt.encode(to_encode, self.jwt_secret, algorithm=self.algorithm)
        
        return encoded_jwt
    
    def decode_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(
                token, 
                self.jwt_secret, 
                algorithms=[self.algorithm]
            )
            return payload
        except Exception:
            raise ValueError("Invalid or expired token")