from enum import Enum
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from datetime import datetime

class ResourceType(str, Enum):
    PDF = "pdf"
    SLIDE = "slide"
    TEXT_NOTE = "text_note"

class Resource(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    filename: str
    file_path: str
    type: ResourceType
    created_at: datetime = Field(default_factory=datetime.now)

    def is_heavy_file(self) -> bool:
        return self.type in [ResourceType.PDF, ResourceType.AUDIO]