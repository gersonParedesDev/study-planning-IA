from dataclasses import dataclass, field
from datetime import datetime, timezone
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

@dataclass
class Resource:
    id: UUID
    subject_id: UUID
    title: str 
    resource_type: ResourceType
    filename: str
    file_url: str
    created_at: datetime = field(default_factory=datetime.now) 
