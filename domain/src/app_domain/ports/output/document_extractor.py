from abc import ABC, abstractmethod

class DocumentExtractor(ABC):

    @abstractmethod
    def extract_from_pdf(self, file_bytes: bytes) -> str:
        pass

    @abstractmethod
    def extract_from_image(self, file_bytes: bytes) -> str:
        pass

    @staticmethod
    @abstractmethod
    def is_image(filename: str) -> bool:
        pass