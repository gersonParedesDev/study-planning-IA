from dataclasses import dataclass, field
from typing import List, Optional, TYPE_CHECKING
from uuid import UUID, uuid4
from datetime import datetime

if TYPE_CHECKING:
    from app_domain.entities.resource import Resource

@dataclass
class Subject:
    id: UUID
    user_id: UUID
    name: str
    description: Optional[str] = None

    created_at: datetime = field(default_factory=datetime.now)

    resources: List['Resource'] = field(default_factory=list)

    def add_resource(self, resource: 'Resource') -> None:
        if resource.subject_id != self.id:
             raise ValueError("The appeal does not belong to this subject.")
             
        self.resources.append(resource)