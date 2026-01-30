from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Usamos SQLite por ahora (se crea un archivo 'app.db' en tu carpeta)
DATABASE_URL = "sqlite:///./app.db"

# 1. El Engine es el motor de conexión
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} # Solo necesario para SQLite
)

# 2. SessionLocal es la fábrica de sesiones para cada petición
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Base para crear los modelos (Tablas)
Base = declarative_base()