import ollama
import logging

logger = logging.getLogger(__name__)

class LLMGateway:
    """
    Gateway to handle LLM calls with automatic fallback.
    Currently uses Ollama locally. If Ollama fails, it can fallback to Gemini/OpenAI (mocked).
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
            logger.error(f"Ollama failed with error: {e}. Attempting fallback...")
            # Fallback logic would go here (e.g. Gemini, OpenAI)
            # For now, we raise the exception if fallback is not configured.
            raise e
