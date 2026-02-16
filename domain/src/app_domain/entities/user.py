from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import UUID, uuid4
from typing import List
from app_domain.entities.subject import Subject

@dataclass
class User:
    id: UUID
    username: str
    email: str
    password: str
    firstname: str
    lastname: str
    age: int
    country: str
    study_field: str

    subjects: List[Subject] = field(default_factory=list)
    
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def __post_init__(self):
        if self.age <= 12:
            raise ValueError("User must be over 12 years old.")
