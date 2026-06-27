import fitz  # PyMuPDF
import logging

logger = logging.getLogger(__name__)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from a PDF file using PyMuPDF (offline)."""
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text("text") + "\n"
        doc.close()
        return text.strip()
    except Exception as e:
        logger.error(f"Failed to parse PDF: {e}")
        raise ValueError("Invalid PDF format or corrupted file.")
