from uuid import UUID, uuid4
from typing import List, Optional
from pydantic import BaseModel, Field
from .resource import Resource

class Subject(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    description: Optional[str] = None
    resources: List[Resource] = Field(default_factory=list)
    
    def add_resource(self, resource: Resource):
            for existing in self.resources:
                if existing.filename == resource.filename:
                    raise ValueError(f"El recurso '{resource.filename}' ya existe en esta materia.")

            self.resources.append(resource)
        