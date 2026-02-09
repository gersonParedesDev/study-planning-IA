from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import UUID
from typing import List
from .subject import Subject

@dataclass
class User:
    id: UUID
    username: str
    password: str
    email: str
    firstname: str
    lastname: str
    age: int
    country: str
    study_field: str
    subjects: List[Subject] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def __post_init__(self):
        if self.age <= 12:
            raise ValueError("The user must be over 12 years old")
