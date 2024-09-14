import { useForm, Controller } from "react-hook-form";
import { DietFormLogo } from "../../public/SvgComponents";
import { Input, Radio } from "@material-tailwind/react";
import GenderGroup from "./GenderGroup";
import Slider from "./Slider";
import DropDown from "./DropDown";

export default function DietForm() {
  const {
    register: dietAnalysis,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const exerciseLabels = [
    "Little/No Exercise(0-1 day/week)",
    "Light Exercise(1-2 day/week)",
    "Moderate Exercise(3-4 day/week)",
    "Highly Active(5-6 day/week)",
    "Daily",
  ];

  const dietPlanLabels = [
    "Maintain Weight",
    "Mild weight loss",
    "Weight loss",
    "Extreme weight loss",
  ];

  const dietOptions = ["Vegetarian Diet", "Non-Vegetarian Diet", "Vegan"];

  return (
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
                defaultValue={2}
                min={2}
                {...dietAnalysis("age", { required: "Age is required" })}
                labelProps={{ className: ` peer-focus:text-primary ` }}
                label="Age"
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>

            <div className="mb-4">
              <Input
                id="height"
                type="number"
                defaultValue={50}
                min={50}
                {...dietAnalysis("height", { required: "Height is required" })}
                labelProps={{ className: ` peer-focus:text-primary ` }}
                label="Height(cm)"
              />
              {errors.height && <p>{errors.height.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <Input
              id="wight"
              type="number"
              defaultValue={10}
              min={10}
              {...dietAnalysis("weight", { required: "Weight is required" })}
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
            <Slider control={control} name="activity" labels={exerciseLabels} />
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
            <Slider control={control} name="meal_count" labels={[3, 4, 5]} />
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
  );
}
