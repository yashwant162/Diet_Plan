from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    target_weight = Column(Float)
    calorie_intake = Column(Float)
    
    meals = relationship("MealPlan", back_populates="user")
    dietary_restrictions = relationship("DietaryRestriction", back_populates="user")
    progress_entries = relationship("ProgressEntry", back_populates="user")

class MealPlan(Base):
    __tablename__ = 'meal_plans'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    meal_name = Column(String(100))
    portion_size = Column(Float)
    calories = Column(Float)

    user = relationship("User", back_populates="meals")

class DietaryRestriction(Base):
    __tablename__ = 'dietary_restrictions'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    restriction = Column(String(100))

    user = relationship("User", back_populates="dietary_restrictions")

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

    user = relationship("User", back_populates="progress_entries")

# Database setup
def db_init():
    engine = create_engine('sqlite:///diet_plan.db')  # Change to your preferred database
    Base.metadata.create_all(engine)