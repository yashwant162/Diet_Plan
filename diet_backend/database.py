from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import settings

# Database connection setup

DATABASE_URL = f'mysql+pymysql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}/{settings.DB_DATABASE}'

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def db_init():
    from models import Base
    Base.metadata.create_all(bind=engine)
