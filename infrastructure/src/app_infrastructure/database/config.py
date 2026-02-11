import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# 1. ENCONTRAR LA RAÍZ DEL PROYECTO
# Buscamos la carpeta 'study-planning-IA' subiendo desde este archivo
base_dir = Path(__file__).resolve().parent.parent.parent.parent.parent
env_path = base_dir / ".env"

# 2. FORZAR LA CARGA DEL .ENV
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

# --- DEBUG MEJORADO ---
print(f"📂 Buscando .env en: {env_path}")
if env_path.exists():
    print("✅ El archivo .env FÍSICAMENTE existe.")
else:
    print("❌ El archivo .env NO EXISTE en esa ruta.")

if not DATABASE_URL:
    print("❌ DATABASE_URL sigue siendo None. Revisa el contenido interno del .env")
    DATABASE_URL = "sqlite:///./definitivo_error.db"
# ----------------------

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass