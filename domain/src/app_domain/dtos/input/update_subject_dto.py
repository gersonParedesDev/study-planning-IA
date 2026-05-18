from dataclasses import dataclass
from typing import Optional
from uuid import UUID

@dataclass
class UpdateSubjectDTO:
    subject_id: UUID
    name: Optional[str] = None
    description: Optional[str] = None
