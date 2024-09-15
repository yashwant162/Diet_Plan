import falcon
from sqlalchemy.orm import Session
from models import MealPlan, User
from database import get_db
from falcon import HTTPBadRequest, HTTPNotFound
import json

class MealPlanner:
    def on_post(self, req, resp):
        # Logic for creating a meal plan
        db = next(get_db())  # Get a database session

        try:
            raw_json = req.bounded_stream.read()
            payload = json.loads(raw_json)
            user_id = payload.get('user_id')
            meal_name = payload.get('meal_name')
            portion_size = payload.get('portion_size')
            calories = payload.get('calories')

            # Validate user existence
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPNotFound(description='User not found.')

            # Create a new meal plan entry
            new_meal_plan = MealPlan(
                user_id=user_id,
                meal_name=meal_name,
                portion_size=portion_size,
                calories=calories
            )
            db.add(new_meal_plan)
            db.commit()

            resp.media = {
                'message': 'Meal plan created successfully.',
                'meal_plan': {
                    'id': new_meal_plan.id,
                    'meal_name': new_meal_plan.meal_name,
                    'portion_size': new_meal_plan.portion_size,
                    'calories': new_meal_plan.calories
                }
            }
            resp.status = falcon.HTTP_201  # 201 Created

        except Exception as e:
            db.rollback()  # Rollback in case of error
            raise HTTPBadRequest(description=str(e))

    def on_get_today(self, req, resp):
        # Fetch today's meal recommendations
        db = next(get_db())  # Get a database session

        try:
            raw_json = req.bounded_stream.read()
            payload = json.loads(raw_json)
            user_id = payload.get('user_id')

            # Validate user existence
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPNotFound(description='User not found.')

            # Fetch today's meals (you can customize this logic based on your needs)
            meals = db.query(MealPlan).filter(MealPlan.user_id == user_id).all()
            if not meals:
                raise HTTPNotFound(description='No meals found for today.')

            resp.media = {
                'today_meal_plan': [
                    {
                        'id': meal.id,
                        'meal_name': meal.meal_name,
                        'portion_size': meal.portion_size,
                        'calories': meal.calories
                    } for meal in meals
                ]
            }
            resp.status = falcon.HTTP_200  # 200 OK

        except Exception as e:
            raise HTTPBadRequest(description=str(e))

    def on_put_timing(self, req, resp):
        raw_json = req.bounded_stream.read()
        payload = json.loads(raw_json)
        user_id = payload.get('user_id')
        meal_timing = payload.get('timing')

        # Update meal timing preferences (this part is left as a placeholder for now)
        # You would typically store timing preferences in the user model or another table.

        resp.media = {'message': 'Meal timing updated'}
        resp.status = falcon.HTTP_200  # 200 OK
