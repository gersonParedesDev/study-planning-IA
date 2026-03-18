from abc import ABC, abstractmethod

class FileStoragePort(ABC):
    """
    Puerto de salida para interactuar con el almacenamiento de archivos.
    El dominio no sabe si es MinIO, S3 o un disco local.
    """

    @abstractmethod
    def get_file_bytes(self, filename: str) -> bytes:
        """Descarga un archivo y devuelve sus bytes en memoria."""
        pass