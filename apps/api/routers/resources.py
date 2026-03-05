import uuid
from fastapi import APIRouter, Depends, UploadFile, File, status, HTTPException
from apps.api.dependencies.security import get_current_user
from app_domain.entities.user import User
from app_infrastructure.minio_client import minio_client, BUCKET_NAME

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
    summary="Upload a physical file (PDF, Image) to MinIO"
)
async def upload_resource_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    try:
        filename = file.filename or "file"
        file_extension = filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"

        file.file.seek(0, 2)
        file_size = file.file.tell()
        file.file.seek(0)

        minio_client.put_object(
            bucket_name=BUCKET_NAME,
            object_name=unique_filename,
            data=file.file,
            length=file_size,
            content_type=file.content_type or "application/octet-stream" 
        )

        file_url = f"http://localhost:9000/{BUCKET_NAME}/{unique_filename}"

        return {
            "original_filename": file.filename,
            "saved_filename": unique_filename,
            "file_url": file_url,
            "message": "File uploaded successfully to MinIO"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file to MinIO: {str(e)}"
        )