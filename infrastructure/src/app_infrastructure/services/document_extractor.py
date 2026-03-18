import pymupdf
from app_domain.ports.output.document_extractor import DocumentExtractor

class PyMuPDFExtractor(DocumentExtractor):

    def extract_from_pdf(self, file_bytes: bytes) -> str:
        doc = pymupdf.open(stream=file_bytes, filetype="pdf")
        extracted_pages: list[str] = []
        for page in doc:
            page_text = str(page.get_text("text"))
            extracted_pages.append(page_text)
        doc.close()
        return "\n".join(extracted_pages).strip()

    def extract_from_image(self, file_bytes: bytes) -> str:
        raise NotImplementedError("Image extraction not implemented yet")
    
    @staticmethod
    def is_image(filename: str) -> bool:
        return filename.split(".")[-1].lower() in ["jpg", "jpeg", "png", "webp"]