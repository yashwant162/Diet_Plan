import falcon
import json
from helper import calculate_bmi, calculate_bmr, calories_calculator, generate_recommendations

class CalculateBMI:
    def on_post(self, req, resp):
        try:
            plans={
                "Maintain Weight": 1,
                "Mild weight loss": 0.9,
                "Weight loss": 0.8,
                "Extreme weight loss": 0.6,
            }
            losses=['-0 kg/week','-0.25 kg/week','-0.5 kg/week','-1 kg/week']
            raw_json = req.bounded_stream.read()
            payload = json.loads(raw_json)
            age = int(payload.get('age',2))
            weight = int(payload.get('weight',50))
            height = int(payload.get('height',10))
            gender = payload.get('gender','male')
            activity = payload.get('activity')
            diet_plan = payload.get('diet_plan')
            meal_count = int(payload.get('meal_count'))
            diet_type = payload.get('diet_type')
            weight_loss = int(plans.get(diet_plan))

            if meal_count == 2:
                meals_calories_perc={'lunch':0.60,'dinner':0.40}
            elif meal_count==3:
                meals_calories_perc={'breakfast':0.35,'lunch':0.40,'dinner':0.25}
            elif meal_count==4:
                meals_calories_perc={'breakfast':0.30,'morning snack':0.05,'lunch':0.40,'dinner':0.25}
            else:
                meals_calories_perc={'breakfast':0.30,'morning snack':0.05,'lunch':0.40,'afternoon snack':0.05,'dinner':0.20}

            bmi = calculate_bmi(weight, height)
            bmr = calculate_bmr(weight, height, age, gender)
            recipes = generate_recommendations(weight, height, age, gender, activity, weight_loss, meals_calories_perc)
            resp.status = falcon.HTTP_200
            resp.body = json.dumps({'BMI': bmi, "BMR": bmr, "recipes": recipes})

        except Exception as e:
            print("Calculate BMI failed due to: ", str(e))
            resp.status = falcon.HTTP_400
            resp.body = json.dumps({'error': str(e)})

