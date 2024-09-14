from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash
import settings
from passlib.context import CryptContext

Base = declarative_base()

# Create a password context for PBKDF2 hashing
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)  # Ensure sufficient length

    def set_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def check_password(self, password):
        return pwd_context.verify(password, self.password_hash)

class MealPlan(Base):
    __tablename__ = 'meal_plans'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    meal_name = Column(String(100))
    portion_size = Column(Float)
    calories = Column(Float)

    user = relationship("User")

class DietaryRestriction(Base):
    __tablename__ = 'dietary_restrictions'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    restriction = Column(String(100))

    user = relationship("User")

class NutritionEntry(Base):
    __tablename__ = 'nutrition_entries'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    meal_name = Column(String(100))
    calories = Column(Float)
    protein = Column(Float)
    fat = Column(Float)
    carbohydrates = Column(Float)

    user = relationship("User")

class ProgressEntry(Base):
    __tablename__ = 'progress_entries'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    weight = Column(Float)
    date_logged = Column(String(50))

    user = relationship("User")

# Database setup
def db_init():
    engine = create_engine(f'mysql+pymysql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}/{settings.DB_DATABASE}')  # Change to your preferred database
    Base.metadata.create_all(engine)
