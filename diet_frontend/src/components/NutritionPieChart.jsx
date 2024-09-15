import React from "react";
import ReactECharts from "echarts-for-react";

const NutritionPieChart = ({ recipes, selectedRecipes }) => {
  const recipeArray = Object.keys(selectedRecipes)
    .filter((category) => selectedRecipes[category])
    .map((category) =>
      recipes[category].find(
        (recipe) => recipe.Name === selectedRecipes[category]
      )
    );

  if (!recipeArray.length) {
    return null;
  }

  const totalNutrition = recipeArray.reduce(
    (acc, recipe) => {
      acc.Calories += recipe.Calories;
      acc.Fat += recipe.FatContent;
      acc.Protein += recipe.ProteinContent;
      acc.Carbohydrates += recipe.CarbohydrateContent;
      acc.Fiber += recipe.FiberContent;
      acc.Sugar += recipe.SugarContent;
      acc.Cholesterol += recipe.CholesterolContent;
      acc.Sodium += recipe.SodiumContent;
      return acc;
    },
    {
      Calories: 0,
      Fat: 0,
      Protein: 0,
      Carbohydrates: 0,
      Fiber: 0,
      Sugar: 0,
      Cholesterol: 0,
      Sodium: 0,
    }
  );

  const pieData = [
    { name: "Calories", value: totalNutrition.Calories },
    { name: "Fat", value: totalNutrition.Fat },
    { name: "Protein", value: totalNutrition.Protein },
    { name: "Carbohydrates", value: totalNutrition.Carbohydrates },
    { name: "Fiber", value: totalNutrition.Fiber },
    { name: "Sugar", value: totalNutrition.Sugar },
    { name: "Cholesterol", value: totalNutrition.Cholesterol },
    { name: "Sodium", value: totalNutrition.Sodium },
  ];

  const option = {
    title: {
      text: "Nutrition Breakdown",
      subtext: "Hover to see details",
      left: "center",
      top: "45%",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      data: pieData.map((item) => item.name),
    },
    series: [
      {
        name: "Nutritional Values",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: pieData,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
      },
    ],
    color: [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#FF5733",
      "#C70039",
      "#900C3F",
      "#581845",
    ],
  };

  return (
    <div className="m-10">
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "800px" }}
      />
    </div>
  );
};

export default NutritionPieChart;
