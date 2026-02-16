from dataclasses import dataclass

@dataclass
class LoginOutput:
    access_token: str
    token_type: str = "bearer"