from app_domain.ports.output.file_storage import FileStoragePort
from app_infrastructure.minio_client import minio_client, BUCKET_NAME

class MinioFileStorage(FileStoragePort):
    
    def get_file_bytes(self, file_url: str) -> bytes:
        # "http://localhost:9000/study-resources/uuid.pdf" → "uuid.pdf"
        object_name = file_url.split(f"/{BUCKET_NAME}/")[-1]
        
        response = minio_client.get_object(BUCKET_NAME, object_name)
        file_bytes = response.read()
        response.close()
        return file_bytes