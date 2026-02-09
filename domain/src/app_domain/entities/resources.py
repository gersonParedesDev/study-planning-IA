from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from uuid import UUID, uuid4

class ResourceType(str, Enum):
    PDF = "pdf"
    SLIDE = "slide"
    TEXT_NOTE = "text_note"
    AUDIO = "audio"

@dataclass
class Resource:
    id: UUID
    filename: str
    file_path: str
    type: ResourceType
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def is_heavy_file(self) -> bool:
        return self.type in [ResourceType.PDF, ResourceType.AUDIO]