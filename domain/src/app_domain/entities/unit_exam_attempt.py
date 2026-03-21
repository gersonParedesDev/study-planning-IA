from dataclasses import dataclass, field
from typing import Optional
from uuid import UUID
from datetime import datetime

PASSING_SCORE = 80

SCORE_WEIGHTS = {
    "vf":      15,   # 5 preguntas × 3 pts
    "mc":      20,   # 2 preguntas × 10 pts
    "numeric": 25,   # 2 preguntas × 12.5 pts
    "photo":   40,   # 1 pregunta  × 40 pts
}

@dataclass
class UnitExamAttempt:
    id: UUID
    unit_id: UUID
    user_id: Optional[UUID]
    score: int
    passed: bool = field(init=False)
    answers: Optional[dict] = None
    created_at: datetime = field(default_factory=datetime.now)

    def __post_init__(self):
        if self.score < 0 or self.score > 100:
            raise ValueError("Score must be between 0 and 100.")
        self.passed = self.score >= PASSING_SCORE

    @staticmethod
    def calculate_score(
        vf_correct: int,
        mc_correct: int,
        numeric_correct: int,
        photo_score: int
    ) -> int:
        vf_pts =      (vf_correct / 5)  * SCORE_WEIGHTS["vf"]
        mc_pts =      (mc_correct / 2)  * SCORE_WEIGHTS["mc"]
        numeric_pts = (numeric_correct / 2) * SCORE_WEIGHTS["numeric"]
        photo_pts =   (photo_score / 40) * SCORE_WEIGHTS["photo"]
        return round(vf_pts + mc_pts + numeric_pts + photo_pts)

    def summary(self) -> dict:
        return {
            "score": self.score,
            "passed": self.passed,
            "needed": PASSING_SCORE,
            "difference": self.score - PASSING_SCORE
        }