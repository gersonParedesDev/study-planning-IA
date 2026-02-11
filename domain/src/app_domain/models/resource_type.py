from enum import Enum

class ResourceType(str, Enum):
    PDF = "pdf"
    SLIDE = "slide"
    TEXT_NOTE = "text_note"
    AUDIO = "audio"

