from dataclasses import dataclass, field
from typing import List, Optional, TYPE_CHECKING
from uuid import UUID
from datetime import datetime
import uuid
from app_domain.entities.unit_topic import UnitTopic
from app_domain.entities.unit_exam_attempt import UnitExamAttempt

@dataclass
class SubjectUnit:
    id: UUID
    subject_id: UUID
    number: int
    title: str
    is_unlocked: bool = False
    is_completed: bool = False
    description: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)
    topics: List[UnitTopic] = field(default_factory=list)
    exam_attempts: List[UnitExamAttempt] = field(default_factory=list)

    def unlock(self) -> None:
        self.is_unlocked = True

    def complete(self, score: int) -> None:
        if not self.is_unlocked:
            raise ValueError("Cannot complete a locked unit.")
        attempt = UnitExamAttempt(
            id=uuid.uuid4(),
            unit_id=self.id,
            user_id=None,
            score=score,
        )
        self.exam_attempts.append(attempt)
        if attempt.passed:
            self.is_completed = True

    def best_score(self) -> int:
        if not self.exam_attempts:
            return 0
        return max(a.score for a in self.exam_attempts)

    def progress(self) -> float:
        if not self.topics:
            return 0.0
        completed = sum(1 for t in self.topics if t.is_completed)
        return round(completed / len(self.topics) * 100, 1)

    def can_take_exam(self) -> bool:
        return self.is_unlocked and not self.is_completed