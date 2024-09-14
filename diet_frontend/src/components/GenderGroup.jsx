import { Radio } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

export default function GenderGroup({ control }) {
  return (
    <div className="flex flex-row space-y-2 justify-center">
      <Controller
        name="gender"
        control={control}
        defaultValue="male"
        rules={{ required: "Gender selection is required" }}
        render={({ field }) => (
          <div className="flex">
            <label className="flex items-center space-x-2 text-primary">
              <input
                {...field}
                type="radio"
                value="male"
                checked={field.value === "male"}
                onChange={field.onChange}
                className="appearance-none w-4 h-4 border-2 border-red-300 rounded-full checked:bg-primary"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 text-primary ml-4">
              <input
                {...field}
                type="radio"
                value="female"
                checked={field.value === "female"}
                onChange={field.onChange}
                className="appearance-none w-4 h-4 border-2 border-red-300 rounded-full checked:bg-primary"
              />
              <span>Female</span>
            </label>
          </div>
        )}
      />
    </div>
  );
}
