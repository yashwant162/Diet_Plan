import BMIDisplay from "./BMIDisplay";
import CalorieDisplay from "./CalorieDisplay";
import RecipesList from "./RecipesList";
import NutritionPieChart from "./NutritionPieChart";

export default function DietAnalysis({ bmi, calories, recipes }) {
  return (
    <div className="bg-white bg-opacity-80 p-4 m-4 rounded-lg shadow-lg w-11/12">
      <div className="min-h-full flex flex-col items-center justify-evenly px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-start justify-evenly w-full">
          {bmi && <BMIDisplay bmi={bmi} />}
          {calories && <CalorieDisplay calorie={calories} />}
        </div>
        <div className="items-start justify-evenly w-full">
          {recipes && <RecipesList recipes={recipes} />}
        </div>
        {recipes && <NutritionPieChart recipes={recipes} />}
      </div>
    </div>
  );
}
