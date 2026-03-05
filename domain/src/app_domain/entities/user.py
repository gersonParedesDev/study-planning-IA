from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import UUID
from typing import List, Optional
from enum import Enum
from app_domain.entities.subject import Subject
from pydantic import EmailStr

class PlanType(str, Enum):
    FREE = "free"
    PRO = "pro"

@dataclass
class User:
    id: UUID
    email: EmailStr
    password: str
    firstname: str
    lastname: str
    plan: PlanType
    username: Optional[str] = None
    study_field: Optional[str] = None 
    age: Optional[int] = None
    country: Optional[str] = None

    subjects: List[Subject] = field(default_factory=list)
    
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def __post_init__(self):
        if self.age is not None:
            if self.age < 0:
                raise ValueError("Age cannot be negative.")
            if self.age <= 12:
                raise ValueError("User must be over 12 years old.")
        if not isinstance(self.plan, PlanType):
            try:
                self.plan = PlanType(self.plan)
            except ValueError:
                raise ValueError(f"Invalid plan type. Must be one of: {[p.value for p in PlanType]}")