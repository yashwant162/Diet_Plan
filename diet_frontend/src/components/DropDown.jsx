import { Select, Option } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

export default function DropDown({ control, name, label, options }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Controller
        name={name}
        control={control}
        defaultValue={options[0]}
        render={({ field }) => (
          <Select
            size="md"
            label={label}
            labelProps={{ className: ` peer-focus:text-primary ` }}
            value={field.value || ""}
            onChange={field.onChange}
          >
            {options.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}
