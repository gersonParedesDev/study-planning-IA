from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import UUID, uuid4
from typing import List
from .enrollment import Enrollment, EnrollmentStatus

@dataclass
class User:
    id: UUID
    username: str
    email: str
    password: str
    firstname: str
    lastname: str
    age: int
    country: str
    study_field: str

    enrollments: List[Enrollment] = field(default_factory=list)
    
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def __post_init__(self):
        if self.age <= 12:
            raise ValueError("User must be over 12 years old.")

    def enroll(self, subject_id: UUID) -> Enrollment:
        for enrollment in self.enrollments:
            if enrollment.subject_id == subject_id:
                 raise ValueError("User is already enrolled in this subject.")

        new_enrollment = Enrollment(
            id=uuid4(),
            user_id=self.id,
            subject_id=subject_id,
            status=EnrollmentStatus.PENDING
        )
        self.enrollments.append(new_enrollment)
        return new_enrollment