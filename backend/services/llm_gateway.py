import ollama
import logging
import google.generativeai as genai
from config.settings import settings

logger = logging.getLogger(__name__)

# Configure Gemini if key exists
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

class LLMGateway:
    """
    Gateway to handle LLM calls with automatic fallback.
    Currently uses Ollama locally. If Ollama fails, it falls back to Gemini.
    """
    
    @staticmethod
    def generate(prompt: str, model: str = "llama3.2") -> str:
        try:
            # Primary: Ollama
            response = ollama.chat(
                model=model,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
            return response["message"]["content"]
        except Exception as e:
            logger.error(f"Ollama failed with error: {e}. Attempting Fallback to Gemini...")
            
            # Fallback logic: Gemini
            if settings.GEMINI_API_KEY:
                try:
                    gemini_model = genai.GenerativeModel("gemini-2.5-flash")
                    response = gemini_model.generate_content(prompt)
                    logger.info("Successfully used Gemini as fallback.")
                    return response.text
                except Exception as gemini_e:
                    logger.error(f"Gemini fallback also failed: {gemini_e}")
                    raise Exception(f"Both Ollama and Gemini failed. Primary Error: {e}, Fallback Error: {gemini_e}")
            else:
                logger.error("GEMINI_API_KEY is not set in environment. Cannot use fallback.")
                raise Exception(f"Ollama failed and no Gemini fallback is configured. Error: {e}")
