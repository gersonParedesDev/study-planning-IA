from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from apps.api.dependencies.database import get_db
from app_infrastructure.database.models.area import AreaModel

router = APIRouter(prefix="/areas", tags=["Areas"])

@router.get("/")
def get_areas(db: Session = Depends(get_db)):
    areas = db.query(AreaModel).all()
    return [{"id": str(area.id), "name": area.name} for area in areas]