from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from apps.api.routers import users

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 API initializing...")
    yield
    print("🛑API are shutting down...")

app = FastAPI(
    title="Study Planning University API",
    description="API Clean Architecture con FastAPI y PostgreSQL",
    version="1.0.0",
    lifespan=lifespan
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])

@app.get("/")
def health_check():
    return {
        "status": "ok", 
        "message": "Study Planning API is running! 🚀",
        "env": os.getenv("ENVIRONMENT", "unknown")
    }