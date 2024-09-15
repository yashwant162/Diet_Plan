import BMIDisplay from "./BMIDisplay";
import CalorieDisplay from "./CalorieDisplay";

export default function DietAnalysis({ bmi, calories, recipes }) {
  return (
    <div className="bg-white bg-opacity-80 p-4 m-4 rounded-lg shadow-lg">
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {bmi && <BMIDisplay bmi={bmi} />}
          {calories && <CalorieDisplay calorie={calories} />}
        </div>
      </div>
    </div>
  );
}
