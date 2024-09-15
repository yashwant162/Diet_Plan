import React from "react";

const BMIDisplay = ({ bmi }) => {
  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-bold">BMI Calculator</h3>
        <p className="text-xl">{bmi} kg/m²</p>
        <p className="text-md">{category}</p>
        <p className="text-sm text-gray-500">
          Healthy BMI range: 18.5 kg/m² - 24.9 kg/m²
        </p>
      </div>
    </div>
  );
};

export default BMIDisplay;
