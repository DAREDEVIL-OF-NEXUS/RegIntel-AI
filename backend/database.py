import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config.settings import settings

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

engine = None
engine_kwargs = {}

# 1. Try Primary Database (PostgreSQL)
if settings.DATABASE_URL1:
    try:
        logger.info("Attempting to connect to primary database (DATABASE_URL1)...")
        temp_engine = create_engine(settings.DATABASE_URL1)
        # Actively test the connection
        with temp_engine.connect() as conn:
            pass
        engine = temp_engine
        logger.info("✅ Successfully connected to primary PostgreSQL database.")
    except Exception as e:
        logger.warning(f"❌ Failed to connect to primary database. Error: {e}")
        logger.warning("Falling back to secondary database.")

# 2. Fallback to Secondary Database (SQLite)
if engine is None:
    logger.info(f"Attempting to connect to fallback database: {settings.DATABASE_URL}")
    if settings.DATABASE_URL.startswith("sqlite"):
        engine_kwargs["connect_args"] = {"check_same_thread": False}
    
    engine = create_engine(settings.DATABASE_URL, **engine_kwargs)
    logger.info("✅ Successfully connected to fallback database.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()