import falcon
from falcon_cors import CORS
import pandas as pd
from model import RecipeRecommendationResource
from resources.meal_planner import MealPlanner
from resources.nutrition import NutritionTracker
from resources.dietary_restrictions import DietaryRestrictions
from resources.progress import ProgressTracker
from resources.recipes import RecipeGenerator
from resources.meal_scheduler import MealScheduler
from resources.MealPlannerController import RecipeRecommendation
from resources import auth

from database import db_init  # Import your database initialization function

# Initialize the database
db_init()
cors = CORS(allow_origins_list=['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8000', "http://172.18.1.168:8000", "http://127.0.0.1:8000"], 
            allow_all_headers=True, 
            allow_all_methods=True)

dataset=pd.read_csv('Data/dataset.csv',compression='gzip')

class HelloWorld:
    def on_get(self, req, resp):
        resp.media = {'message': 'Hello, World!'}

app = falcon.App(middleware=[cors.middleware])
app.add_route('/', HelloWorld())

# Authentication
app.add_route('/auth/register', auth.Register())
app.add_route('/auth/login', auth.Login())
app.add_route('/auth/logout', auth.Logout())

app.add_route('/recommend_recipes', RecipeRecommendation())

# Meal Planner
meal_planner = MealPlanner()
app.add_route('/meal-planner', meal_planner)
app.add_route('/meal-planner/today', meal_planner.on_get_today)
app.add_route('/meal-planner/timing', meal_planner.on_put_timing)

# Nutrition Tracker
nutrition_tracker = NutritionTracker()
app.add_route('/nutrition/track', nutrition_tracker)
app.add_route('/nutrition/dashboard', nutrition_tracker.on_get_dashboard)
app.add_route('/nutrition/alerts', nutrition_tracker.on_get_alerts)

# Dietary Restrictions
dietary_restrictions = DietaryRestrictions()
app.add_route('/dietary-restrictions', dietary_restrictions)
app.add_route('/dietary-restrictions', dietary_restrictions.on_get)

# Progress Tracker
progress_tracker = ProgressTracker()
app.add_route('/progress/log', progress_tracker)
app.add_route('/progress/report', progress_tracker.on_get_report)

# Recipe Generator
recipe_generator = RecipeGenerator()
app.add_route('/recipes/generate', recipe_generator)
app.add_route('/recipes/preferences', recipe_generator.on_get_preferences)

# Meal Scheduler
meal_scheduler = MealScheduler()
app.add_route('/schedule/meals', meal_scheduler)
app.add_route('/schedule/reminders', meal_scheduler.on_get_reminders)

recipe_recommendation = RecipeRecommendationResource()
app.add_route('/recommend', recipe_recommendation)