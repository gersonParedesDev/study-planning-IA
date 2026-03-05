import sys
import os
sys.path.append(os.getcwd())
from infrastructure.src.app_infrastructure.database.config import engine
from infrastructure.src.app_infrastructure.database.models.base import Base

def init_db():
    url = engine.url
    print(f"👀 PYTHON ESTÁ VIENDO ESTA DIRECCIÓN:")
    print(f"👉 HOST: {url.host}")
    print(f"👉 PORT: {url.port}")
    print(f"👉 DB:   {url.database}")
    
    if url.port != 5433:
        print("❌ No estás apuntando al puerto 5433 de Docker.")
        print("Revisa tu archivo .env y asegúrate de haberlo guardado.")
        return

    print("🚀 Conectando y reseteando tablas...")

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    print("✅ Tablas recreadas en Docker (Puerto 5433)!")

if __name__ == "__main__":
    init_db()