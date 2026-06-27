import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

class Settings:
    # Fallback SQLite DB
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./regintel.db")
    # Primary PostgreSQL DB
    DATABASE_URL1 = os.getenv("DATABASE_URL1")
    
    SECRET_KEY = os.getenv("SECRET_KEY", "hackathon-secret")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

settings = Settings()
