from app_infrastructure.database.config import engine
from app_infrastructure.database.models.base import Base


def init_db():
    print("🚀 Create tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("✅ table creates !")

if __name__ == "__main__":
    init_db()