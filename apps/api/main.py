from contextlib import asynccontextmanager
from app_infrastructure.database.models.base import Base
from app_infrastructure.database.config import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from apps.api.routers import resources, subjects, users, auth, areas 

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 API initializing...")

    Base.metadata.create_all(bind=engine)

    print("✅ Base de datos sincronizada exitosamente.")
    
    yield
    print("🛑 API are shutting down...")

app = FastAPI(
    title="Study Planning University API",
    description="API Clean Architecture con FastAPI y PostgreSQL",
    version="1.0.0",
    lifespan=lifespan
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(auth.router)
app.include_router(subjects.router)
app.include_router(resources.router)
app.include_router(areas.router)

@app.get("/")
def health_check():
    return {
        "status": "ok", 
        "message": "Study Planning API is running! 🚀",
        "env": os.getenv("ENVIRONMENT", "unknown")
    }