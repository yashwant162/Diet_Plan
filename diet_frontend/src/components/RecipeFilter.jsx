import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

export default function RecipeFilter({
  recipes,
  selectedRecipes,
  setSelectedRecipes,
}) {
  const categories = Object.keys(recipes);

  const handleSelectChange = (category) => (event) => {
    setSelectedRecipes({
      ...selectedRecipes,
      [category]: event,
    });
    console.log(event);
  };

  const humanize = (str) => {
    return str
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex flex-row justify-center gap-6 mt-6">
      {categories.map((category) => (
        <div key={category} className="w-full md:w-1/3">
          <Select
            size="md"
            label={humanize(category)}
            labelProps={{ className: `peer-focus:text-primary` }}
            value={selectedRecipes[category]}
            onChange={handleSelectChange(category)}
          >
            {recipes[category].map((recipe, index) => (
              <Option key={index} value={recipe.Name}>
                {recipe.Name}
              </Option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}
