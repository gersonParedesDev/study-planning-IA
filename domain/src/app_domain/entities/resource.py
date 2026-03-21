from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from uuid import UUID
from typing import Optional

class ResourceType(str, Enum):
    SYLLABUS = "syllabus"
    BOOK = "book"
    EXAM = "exam"
    PRACTICE = "practice"
    NOTES = "notes"
    OTHER = "other"

class ResourceSourceType(str, Enum):
    TEXT = "text"
    PDF = "pdf"
    IMAGE = "image"
    TITLE_ONLY = "title_only"

@dataclass
class Resource:
    id: UUID
    subject_id: UUID
    title: str
    resource_type: ResourceType
    source_type: ResourceSourceType
    filename: Optional[str] = None
    file_url: Optional[str] = None
    text_content: Optional[str] = None
    extracted_text: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)

    def __post_init__(self):
        if self.source_type == ResourceSourceType.TITLE_ONLY:
            if self.resource_type != ResourceType.BOOK:
                raise ValueError("TITLE_ONLY source is only valid for BOOK resources.")
            if not self.title:
                raise ValueError("Title is required for TITLE_ONLY resources.")

        if self.source_type in (ResourceSourceType.PDF, ResourceSourceType.IMAGE):
            if not self.file_url:
                raise ValueError(f"{self.source_type} resources require a file_url.")

        if self.source_type == ResourceSourceType.TEXT:
            if not self.text_content:
                raise ValueError("TEXT resources require text_content.")

    def is_processable(self) -> bool:
        return self.source_type in (
            ResourceSourceType.PDF,
            ResourceSourceType.IMAGE,
            ResourceSourceType.TEXT
        )

    def needs_vision(self) -> bool:
        return self.source_type == ResourceSourceType.IMAGE