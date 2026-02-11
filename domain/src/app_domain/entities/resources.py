from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from uuid import UUID, uuid4
from app_domain.models.resource_type import ResourceType

@dataclass
class Resource:
    id: UUID
    title: str
    filename: str
    url: str
    type: ResourceType

    user_id: UUID
    subject_id: UUID
    
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def is_heavy_file(self) -> bool:
        return self.type in [ResourceType.PDF, ResourceType.AUDIO]