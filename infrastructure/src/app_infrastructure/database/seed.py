import uuid
from app_infrastructure.database.config import SessionLocal
from app_infrastructure.database.models.area import AreaModel as AreaModel

def seed_areas():
    db = SessionLocal()
    
    areas_to_seed = [
        "Matemática", 
        "Filosofía", 
        "Física", 
        "Química", 
        "Biología", 
        "Derecho", 
        "Medicina", 
        "Sistemas",
        "Psicología",
        "Economía",
        "Arquitectura",
        "Historia",
        "Sociología",
        "Letras",
        "Ingeniería Civil",
        "Ciencias Políticas",
        "Arte",
        "Educación",
        "Administración",
        "Comunicación"
    ]

    try:
        for area_name in areas_to_seed:
            # Ahora AreaModel.name sí es una columna de SQLAlchemy
            existing_area = db.query(AreaModel).filter(AreaModel.name == area_name).first()
            
            if not existing_area:
                # Generamos un UUID real para la nueva área
                new_area = AreaModel(
                    id=uuid.uuid4(), 
                    name=area_name
                )
                db.add(new_area)
                print(f"✔️ Área '{area_name}' agregada.")
            else:
                print(f"➖ Área '{area_name}' ya existía.")
                
        db.commit()
        print("✅ Seeding completado con éxito.")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_areas()