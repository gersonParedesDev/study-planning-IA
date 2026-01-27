from abc import ABC, abstractmethod
from typing import BinaryIO

class FileStorage(ABC):

    @abstractmethod
    def save(self, file_name: str, file_content: BinaryIO) -> str:
        pass

    @abstractmethod
    def delete(self, file_path: str) -> None:
        pass