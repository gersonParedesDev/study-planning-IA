from dataclasses import dataclass, field
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app_domain.entities.resource import Resource
from app_domain.entities.subject_unit import SubjectUnit

@dataclass
class Subject:
    id: UUID
    user_id: UUID
    area_id: UUID
    name: str
    exam_date: Optional[datetime] = None
    created_at: datetime = field(default_factory=datetime.now)

    resources: List[Resource] = field(default_factory=list)
    units: List[SubjectUnit] = field(default_factory=list)

    def add_resource(self, resource: Resource) -> None:
        if resource.subject_id != self.id:
            raise ValueError("The appeal does not belong to this subject.")
        self.resources.append(resource)

    def add_unit(self, unit: SubjectUnit) -> None:
        if unit.subject_id != self.id:
            raise ValueError("The unit does not belong to this subject.")
        self.units.append(unit)