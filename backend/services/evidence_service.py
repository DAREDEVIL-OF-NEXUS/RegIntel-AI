import logging
import base64
import ollama
import google.generativeai as genai
from config.settings import settings

logger = logging.getLogger(__name__)

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

class EvidenceService:
    """
    Handles validation of uploaded photographic/document evidence against MAPs
    using LLaVA (Offline) with a Gemini Vision fallback.
    """
    
    @staticmethod
    def validate_evidence(file_bytes: bytes, mime_type: str, map_text: str) -> dict:
        logger.info(f"Validating evidence against MAP: {map_text}")
        
        prompt = f"Does this image prove compliance with the following regulatory requirement? Requirement: {map_text}. Answer with either APPROVED or REJECTED on the first line, followed by a short reason."
        
        # 1. Attempt LLaVA (Ollama)
        try:
            logger.info("Attempting LLaVA offline vision model...")
            response = ollama.chat(
                model="llava",
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                        "images": [file_bytes]
                    }
                ]
            )
            result_text = response["message"]["content"]
            status = "APPROVED" if "APPROVED" in result_text.upper() else "REJECTED"
            return {
                "status": status,
                "reason": result_text,
                "model_used": "llava (offline)"
            }
        except Exception as e:
            logger.error(f"LLaVA offline model failed: {e}. Attempting Gemini Vision fallback...")
            
            # 2. Attempt Gemini Vision
            if settings.GEMINI_API_KEY:
                try:
                    # Gemini expects specific format for bytes
                    model = genai.GenerativeModel("gemini-2.5-flash")
                    image_parts = [
                        {
                            "mime_type": mime_type,
                            "data": file_bytes
                        }
                    ]
                    response = model.generate_content([prompt, image_parts[0]])
                    result_text = response.text
                    status = "APPROVED" if "APPROVED" in result_text.upper() else "REJECTED"
                    return {
                        "status": status,
                        "reason": result_text,
                        "model_used": "gemini-2.5-flash (cloud fallback)"
                    }
                except Exception as gemini_e:
                    logger.error(f"Gemini Vision failed: {gemini_e}")
                    raise ValueError("Both LLaVA and Gemini Vision validation failed.")
            else:
                raise ValueError("LLaVA failed and no GEMINI_API_KEY is configured for fallback.")
