from dataclasses import dataclass, field
from typing import List
from uuid import UUID
from app_domain.entities.subject import Subject

@dataclass
class Area:
    id: UUID
    name: str
    subjects: List[Subject] = field(default_factory=list)
    