import enum

class EnrollmentStatus(str, enum.Enum):
    PENDING = "Pendiente"
    ACTIVE = "Cursando"
    APPROVED = "Aprobado"
    FAILED = "Desaprobado"
    DROPPED = "Abandono"