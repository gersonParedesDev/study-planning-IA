from dataclasses import dataclass
from uuid import UUID
from app_domain.entities.user import PlanType

@dataclass
class LoginOutput:
    id: UUID
    access_token: str
    firstname: str
    lastname: str
    email: str
    plan: PlanType
    token_type: str = "bearer"