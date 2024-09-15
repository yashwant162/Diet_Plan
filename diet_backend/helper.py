import pdb
import random
import numpy as np
import re
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer
import falcon
import joblib

scaler = StandardScaler()
neigh = NearestNeighbors(metric='cosine', algorithm='brute')
prep_data = np.load('Data/prep_data.npy')
scaler = joblib.load('Data/scaler.pkl')
# dataset=pd.read_csv('Data/dataset_2.csv',compression='gzip')
non_veg_dataset=pd.read_csv('Data/non_veg_dataset.csv',compression='gzip')
veg_dataset=pd.read_csv('Data/veg_dataset.csv',compression='gzip')


scaler.fit(prep_data)
neigh.fit(prep_data)


def calculate_bmi(weight, height):
    bmi=round(weight/((height/100)**2),2)
    return bmi

def display_result(weight, height):
    bmi=calculate_bmi(weight, height)
    bmi_string=f'{bmi} kg/m²'
    if bmi<18.5:
        category='Underweight'
        color='Red'
    elif 18.5<=bmi<25:
        category='Normal'
        color='Green'
    elif 25<=bmi<30:
        category='Overweight'
        color='Yellow'
    else:
        category='Obesity'
        color='Red'
    return bmi_string,category,color

def calculate_bmr(weight, height, age, gender='male'):
    try:
        if gender=='male':
            bmr=10*weight+6.25*height-5*age+5
        else:
            bmr=10*weight+6.25*height-5*age-161
        return bmr
    except Exception as e:
        print("Error while calculating BMR: ", str(e))

def calories_calculator(weight, height, age, gender, activity):
    try:
        activities=['Little/No Exercise(0-1 day/week)', 'Light Exercise(1-2 day/week)', 'Moderate Exercise(3-4 day/week)', 'Highly Active(5-6 day/week)', 'Daily']
        weights=[1.2,1.375,1.55,1.725,1.9]
        bmr_weight = weights[activities.index(activity)]
        maintain_calories = calculate_bmr(weight, height, age, gender)*bmr_weight
        return maintain_calories
    except Exception as e:
        print("Error while calculating calories:", str(e))

def generate_recommendations(weight, height, age, gender, activity, weight_loss, meals_calories_perc, keywords, ingredients, diet_type):
    try:
        if diet_type == "Vegetarian Diet" and diet_type == "Vegan":
            extracted_data = veg_dataset.copy() 
        else:
            extracted_data = non_veg_dataset.copy() 

        total_calories=weight_loss*calories_calculator(weight, height, age, gender, activity)
        recommendations={}

        for meal in meals_calories_perc:
            meal_calories=meals_calories_perc[meal]*total_calories
            if meal=='breakfast':
                recommended_nutrition = [meal_calories,random.randint(10,30),random.randint(0,4),random.randint(0,30),random.randint(0,400),random.randint(40,75),random.randint(4,10),random.randint(0,10),random.randint(30,100)]
            elif meal=='launch':
                recommended_nutrition = [meal_calories,random.randint(20,40),random.randint(0,4),random.randint(0,30),random.randint(0,400),random.randint(40,75),random.randint(4,20),random.randint(0,10),random.randint(50,175)]
            elif meal=='dinner':
                recommended_nutrition = [meal_calories,random.randint(20,40),random.randint(0,4),random.randint(0,30),random.randint(0,400),random.randint(40,75),random.randint(4,20),random.randint(0,10),random.randint(50,175)] 
            else:
                recommended_nutrition = [meal_calories,random.randint(10,30),random.randint(0,4),random.randint(0,30),random.randint(0,400),random.randint(40,75),random.randint(4,10),random.randint(0,10),random.randint(30,100)]
            recommended_nutrition = np.array(recommended_nutrition).reshape(1, -1)
            input_scaled = scaler.transform(recommended_nutrition)

            # Find similar recipes using the precomputed nearest neighbors model
            recommendations_idx = neigh.kneighbors(input_scaled, n_neighbors=30, return_distance=False)[0]
            extracted_data.fillna('',inplace=True)
            recommended_recipes = extracted_data[[
                "RecipeId", "Name", "CookTime", "PrepTime", "TotalTime", 
                "RecipeIngredientParts", "Calories", "FatContent", 
                "SaturatedFatContent", "CholesterolContent", "SodiumContent", 
                "CarbohydrateContent", "FiberContent", "SugarContent", 
                "ProteinContent", "RecipeInstructions"
            ]].iloc[recommendations_idx]
            recommended_recipes = recommended_recipes.to_dict(orient='records')
            recommendations[meal] = recommended_recipes
            # Send response with the recommended recipes
        return total_calories,recommendations
    except Exception as e:
        print("Error in generating recipes: ", str(e))
    

def extract_ingredient_filtered_data(dataframe, ingredients):
    try:
        extracted_data=dataframe.copy()
        regex_string=''.join(map(lambda x:f'(?=.*{x})', ingredients))
        extracted_data=extracted_data[extracted_data['RecipeIngredientParts'].str.contains(regex_string,regex=True,flags=re.IGNORECASE)]
        return extracted_data
    except Exception as e:
        print("error in extract_ingredient_filtered_data:", str(e))

def extract_keywords_filtered_data(dataframe, keywords):
    try:
        extracted_data=dataframe.copy()
        regex_string=''.join(map(lambda x:f'(?=.*{x})', keywords))
        extracted_data=extracted_data.dropna()[extracted_data.dropna()['Keywords'].str.contains(regex_string,regex=True,flags=re.IGNORECASE)]
        return extracted_data
    except Exception as e:
        print("error in extract_keywords_filtered_data:", str(e))
        # for recommendation in recommendations:
        #     for recipe in recommendation:
        #         recipe['image_link']=find_image(recipe['Name']) 
        # return recommendations

# def generate_recommendations(self,):
#     total_calories=self.weight_loss*self.calories_calculator()
#     recommendations=[]
#     for meal in self.meals_calories_perc:
#         meal_calories=self.meals_calories_perc[meal]*total_calories
#         if meal=='breakfast':        
#             recommended_nutrition = [meal_calories,rnd(10,30),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,10),rnd(0,10),rnd(30,100)]
#         elif meal=='launch':
#             recommended_nutrition = [meal_calories,rnd(20,40),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,20),rnd(0,10),rnd(50,175)]
#         elif meal=='dinner':
#             recommended_nutrition = [meal_calories,rnd(20,40),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,20),rnd(0,10),rnd(50,175)] 
#         else:
#             recommended_nutrition = [meal_calories,rnd(10,30),rnd(0,4),rnd(0,30),rnd(0,400),rnd(40,75),rnd(4,10),rnd(0,10),rnd(30,100)]
#         generator=Generator(recommended_nutrition)
#         recommended_recipes=generator.generate().json()['output']
#         recommendations.append(recommended_recipes)
#     for recommendation in recommendations:
#         for recipe in recommendation:
#             recipe['image_link']=find_image(recipe['Name']) 
#     return recommendations