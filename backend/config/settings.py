import os

class Settings:
    # Use SQLite by default for local dev, but allow PostgreSQL via env var for Production
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./regintel.db")
    SECRET_KEY = os.getenv("SECRET_KEY", "hackathon-secret")

settings = Settings()
