from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import UUID
from app_domain.models.enrollment_status import EnrollmentStatus

@dataclass
class Enrollment:
    id: UUID
    user_id: UUID 
    subject_id: UUID 
    status: EnrollmentStatus
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def is_active(self) -> bool:
        return self.status == EnrollmentStatus.ACTIVE
    
    def approve(self):
        self.status = EnrollmentStatus.APPROVED