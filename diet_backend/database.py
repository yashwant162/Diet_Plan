from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Database connection setup
DATABASE_URL = 'sqlite:///diet_plan.db'  # Change to your preferred database
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
