import React from "react";

const CalorieDisplay = ({ calorie }) => {
  return (
    <div className="max-w-md w-full space-y-8">
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-bold">Daily Calorie Estimates</h3>
        <p className="text-xl mb-11">Total Calorie: {calorie}</p>
        {/* <p className="text-xl">Mild Weight Loss: {calories.mild} Calories/day (-0.25 kg/week)</p>
        <p className="text-xl">Weight Loss: {calories.loss} Calories/day (-0.5 kg/week)</p>
        <p className="text-xl">Extreme Weight Loss: {calories.extreme} Calories/day (-1 kg/week)</p> */}
      </div>
    </div>
  );
};

export default CalorieDisplay;
