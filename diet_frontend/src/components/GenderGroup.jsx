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
              <Radio
                {...field}
                value="male"
                checked={field.value === "male"}
                className="checked:border-primary"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 text-primary">
              <Radio
                {...field}
                value="female"
                checked={field.value === "female"}
                className="checked:border-primary"
              />
              <span>Female</span>
            </label>
          </div>
        )}
      />
    </div>
  );
}
