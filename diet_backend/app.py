import falcon
from resources.auth import Auth
from resources.meal_planner import MealPlanner
from resources.nutrition import NutritionTracker
from resources.dietary_restrictions import DietaryRestrictions
from resources.progress import ProgressTracker
from resources.recipes import RecipeGenerator
from resources.meal_scheduler import MealScheduler
from database import db_init  # Import your database initialization function

# Initialize the database
db_init()

app = falcon.App()
class HelloWorld:
    def on_get(self, req, resp):
        resp.media = {'message': 'Hello, World!'}

app = falcon.App()
app.add_route('/', HelloWorld())

# Authentication
auth = Auth()
app.add_route('/auth/register', auth.register)
app.add_route('/auth/login', auth.login)
app.add_route('/auth/logout', auth.logout)

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
