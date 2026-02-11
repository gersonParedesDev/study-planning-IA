from dataclasses import dataclass, field
from typing import List, Optional
from uuid import UUID, uuid4
from app_domain.entities.enrollment import Enrollment
from .resources import Resource

@dataclass
class Subject:
    id: UUID
    name: str
    description: Optional[str] = None

    resources: List[Resource] = field(default_factory=list)

    enrollments: List[Enrollment] = field(default_factory=list)

    def add_resource(self, resource: Resource) -> None:
        if resource.subject_id != self.id:
             raise ValueError("The appeal does not belong to this subject.")
             
        self.resources.append(resource)