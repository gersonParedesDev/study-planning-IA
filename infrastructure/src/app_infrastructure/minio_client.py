import os
from minio import Minio
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

minio_client = Minio(
    endpoint=os.getenv("MINIO_ENDPOINT", "localhost:9000"),
    access_key=os.getenv("MINIO_ACCESS_KEY", "admin_minio"),
    secret_key=os.getenv("MINIO_SECRET_KEY", "supersecretpassword123"),
    secure=os.getenv("MINIO_SECURE", "False").lower() == "true"
)

BUCKET_NAME = os.getenv("MINIO_BUCKET_NAME", "study-resources")

def init_minio():
    """Verifica si el bucket existe, y si no, lo crea automáticamente."""
    try:
        if not minio_client.bucket_exists(BUCKET_NAME):
            minio_client.make_bucket(BUCKET_NAME)
            print(f"🪣 Bucket '{BUCKET_NAME}' creado exitosamente en MinIO.")
        else:
            print(f"🪣 Bucket '{BUCKET_NAME}' ya existe.")
    except Exception as e:
        print(f"❌ Error conectando a MinIO: {e}")

init_minio()