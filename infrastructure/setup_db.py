import sys
import os

sys.path.append(os.getcwd())

from infrastructure.src.app_infrastructure.database.config import engine
from infrastructure.src.app_infrastructure.database.models.base import Base
# ... tus imports de modelos siguen igual ...
from infrastructure.src.app_infrastructure.database.models.user import UserModel
from infrastructure.src.app_infrastructure.database.models.subject import SubjectModel
from infrastructure.src.app_infrastructure.database.models.resource import ResourceModel
from infrastructure.src.app_infrastructure.database.models.enrollment import EnrollmentModel

def init_db():
    # 👇 ESTO ES LO NUEVO: Imprimimos la verdad
    url = engine.url
    print(f"👀 PYTHON ESTÁ VIENDO ESTA DIRECCIÓN:")
    print(f"👉 HOST: {url.host}")
    print(f"👉 PORT: {url.port}")
    print(f"👉 DB:   {url.database}")
    
    if url.port != 5433:
        print("❌ ¡ALERTA ROJA! No estás apuntando al puerto 5433 de Docker.")
        print("   Revisa tu archivo .env y asegúrate de haberlo guardado.")
        return

    print("🚀 Conectando y reseteando tablas...")
    
    # Vamos a FORZAR el borrado para ver los logs de creación sí o sí
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    print("✅ Tablas recreadas en Docker (Puerto 5433)!")

if __name__ == "__main__":
    init_db()