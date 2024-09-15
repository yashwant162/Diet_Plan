import { useForm, Controller } from "react-hook-form";
import { DietFormLogo } from "../../public/SvgComponents";
import { Input, Radio } from "@material-tailwind/react";
import GenderGroup from "./GenderGroup";
import Slider from "./Slider";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DietAnalysis from "./DietAnalysis";

export default function DietForm() {
  const [bmi, setBmi] = useState("");
  const [calories, setCalories] = useState("");
  const [recipes, setRecipes] = useState({});
  const [response, setResponse] = useState(false);
  const {
    register: dietAnalysis,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch(
        "http://127.0.0.1:8000/recommend_recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: data.age,
            height: data.height,
            weight: data.weight,
            gender: data.gender,
            activity: data.activity,
            diet_plan: data.diet_plan,
            meal_count: data.meal_count,
            diet_type: data.diet_type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setBmi(responseData.BMI);
      setCalories(responseData.total_calories);
      setRecipes(responseData.recipes);
      setResponse(true);
      
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const exerciseLabels = [
    "Little/No Exercise(0-1 day/week)",
    "Light Exercise(1-2 day/week)",
    "Moderate Exercise(3-4 day/week)",
    "Highly Active(5-6 day/week)",
    "Daily",
  ];

  const dietPlanLabels = [
    "Extreme weight gain",
    "Mild weight gain",
    "Weight gain",
    "Maintain Weight",
    "Mild weight loss",
    "Weight loss",
    "Extreme weight loss",
  ];

  const dietOptions = ["Vegetarian Diet", "Non-Vegetarian Diet", "Vegan"];

  return (
    <>
      <div className="bg-white bg-opacity-80 p-4 m-4 rounded-lg shadow-lg">
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <DietFormLogo />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                Fuel Your Body Better: Customized Diet Analysis
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <Input
                    id="age"
                    type="number"
                    defaultValue={18}
                    min={2}
                    max={115}
                    {...dietAnalysis("age", {
                      required: "Age is required",
                    })}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) < 2) {
                        e.target.value = 2;
                      }
                    }}
                    labelProps={{ className: ` peer-focus:text-primary ` }}
                    label="Age"
                  />
                  {errors.age && <p>{errors.age.message}</p>}
                </div>

                <div className="mb-4">
                  <Input
                    id="height"
                    type="number"
                    defaultValue={165}
                    min={50}
                    max={220}
                    {...dietAnalysis("height", {
                      required: "Height is required",
                    })}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) < 50) {
                        e.target.value = 50;
                      }
                    }}
                    labelProps={{ className: ` peer-focus:text-primary ` }}
                    label="Height(cm)"
                  />
                  {errors.height && (
                    <div className="mb-4 text-red-600 text-sm">
                      {errors.height.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <Input
                  id="wight"
                  type="number"
                  defaultValue={60}
                  min={10}
                  max={160}
                  {...dietAnalysis("weight", {
                    required: "Weight is required",
                  })}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) < 10) {
                      e.target.value = 10;
                    }
                  }}
                  labelProps={{ className: ` peer-focus:text-primary ` }}
                  label="Weight(kg)"
                />
                {errors.weight && <p>{errors.weight.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2">Gender:</label>
                <GenderGroup control={control} />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Activity:</label>
                <Slider
                  control={control}
                  name="activity"
                  labels={exerciseLabels}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Choose your Diet plan:</label>
                <Slider
                  control={control}
                  name="diet_plan"
                  labels={dietPlanLabels}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Meals per day:</label>
                <Slider
                  control={control}
                  name="meal_count"
                  labels={[2, 3, 4, 5]}
                />
              </div>

              <div className="mb-4">
                <DropDown
                  control={control}
                  name="diet_type"
                  label="Diet Type"
                  options={dietOptions}
                />
              </div>

              <div>
                {errorMessage && (
                  <div className="text-primary text-center mb-4">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="group relative w-full flex justify-center
              py-2 px-4 border border-transparent text-sm font-medium
              rounded-md text-white bg-primary
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              hover:shadow-[0_0_10px_2px_rgba(248,131,121,0.75)]
            focus:ring-indigo-500"
                >
                  Submit Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {response && (
        <DietAnalysis bmi={bmi} calories={calories} recipes={recipes} />
      )}
    </>
  );
}
