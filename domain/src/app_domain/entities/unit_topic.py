from dataclasses import dataclass, field
from datetime import datetime
from uuid import UUID
from typing import Optional

@dataclass
class UnitTopic:
    id: UUID
    unit_id: UUID
    number: int
    title: str
    theory_content: Optional[str] = None   # generado por IA
    examples_content: Optional[str] = None # generado por IA
    is_completed: bool = False             # el usuario lo marca como visto
    created_at: datetime = field(default_factory=datetime.now)

    def mark_as_completed(self) -> None:
        self.is_completed = True