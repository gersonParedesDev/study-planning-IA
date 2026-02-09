from dataclasses import dataclass, field
from typing import List, Optional
from uuid import UUID, uuid4
from .resources import Resource

@dataclass
class Subject:
    id: UUID
    name: str = ""
    description: Optional[str] = None
    resources: List[Resource] = field(default_factory=list)

    def add_resource(self, resource: Resource) -> None:
        for existing in self.resources:
            if existing.filename == resource.filename:
                raise ValueError(f"El recurso '{resource.filename}' ya existe.")
        self.resources.append(resource)