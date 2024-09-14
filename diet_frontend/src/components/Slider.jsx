import { Controller } from "react-hook-form";

export default function Slider({ control, name, labels }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={labels[0]}
      render={({ field }) => (
        <div className="w-full max-w-xs mx-auto">
          <input
            type="range"
            min="0"
            max={labels.length - 1}
            step="1"
            value={labels.indexOf(field.value)}
            onChange={(e) => {
              const newValue = labels[Number(e.target.value)];
              field.onChange(newValue);
            }}
            className="w-full accent-primary bg-gray-200 rounded-lg"
          />
          <div className="flex justify-center text-sm mt-2">
            <span className="text-primary font-bold">{field.value}</span>
          </div>
        </div>
      )}
    />
  );
}
