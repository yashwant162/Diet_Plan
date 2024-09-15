import React from 'react';
import ReactECharts from 'echarts-for-react';

const NutritionPieChart = ({ recipes }) => {
  // Flatten the recipes object to an array
  const recipeArray = Object.values(recipes).flat();

  // Check if recipeArray is valid and has data
  if (!Array.isArray(recipeArray) || recipeArray.length === 0) {
    return null; // Don't render anything if there are no recipes
  }

  const totalNutrition = recipeArray.reduce((acc, recipe) => {
    acc.Calories += recipe.Calories;
    acc.Fat += recipe.FatContent;
    acc.Protein += recipe.ProteinContent;
    acc.Carbohydrates += recipe.CarbohydrateContent;
    acc.Fiber += recipe.FiberContent;
    acc.Sugar += recipe.SugarContent;
    acc.Cholesterol += recipe.CholesterolContent;
    acc.Sodium += recipe.SodiumContent;
    return acc;
  }, {
    Calories: 0,
    Fat: 0,
    Protein: 0,
    Carbohydrates: 0,
    Fiber: 0,
    Sugar: 0,
    Cholesterol: 0,
    Sodium: 0
  });

  const pieData = [
    { name: 'Calories', value: totalNutrition.Calories },
    { name: 'Fat', value: totalNutrition.Fat },
    { name: 'Protein', value: totalNutrition.Protein },
    { name: 'Carbohydrates', value: totalNutrition.Carbohydrates },
    { name: 'Fiber', value: totalNutrition.Fiber },
    { name: 'Sugar', value: totalNutrition.Sugar },
    { name: 'Cholesterol', value: totalNutrition.Cholesterol },
    { name: 'Sodium', value: totalNutrition.Sodium },
  ];

  const option = {
    title: {
      text: 'Nutrition Breakdown',
      subtext: 'Hover to see details',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: 'Nutrition',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
          }
        },
        labelLine: {
          show: false,
        },
        data: pieData,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
      }
    ],
    color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733', '#C70039', '#900C3F', '#581845'],
  };

  return (
    <ReactECharts option={option} style={{ height: '400px', width: '800px' }} />
  );
};

export default NutritionPieChart;
