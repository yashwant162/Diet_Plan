import { useForm, Controller } from "react-hook-form";
import { DietFormLogo } from "../../public/SvgComponents";
import { Input, Radio } from "@material-tailwind/react";
import GenderGroup from "./GenderGroup";
import Slider from "./Slider";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import BMIDisplay from "./BMIDisplay";
import CalorieDisplay from "./CalorieDisplay";
import { useState } from "react";
import DietAnalysis from "./DietAnalysis";

export default function DietForm() {
  const [bmi, setBmi] = useState("22.04 kg/m²");
  const [calories, setCalories] = useState("1855.5 Calories/day");
  const [recipes, setRecipes] = useState({
    breakfast: [
      {
        RecipeId: 43761,
        Name: "Lots-A-Veggies Stew",
        CookTime: "PT5H",
        PrepTime: "PT30M",
        TotalTime: "PT5H30M",
        RecipeIngredientParts:
          'c("ground beef", "onion", "garlic", "kidney beans", "butter beans", "beef broth", "whole kernel corn", "tomato paste", "green pepper", "carrot", "celery", "chili powder", "dried oregano", "dried thyme", "salt", "dried marjoram", "pepper")',
        Calories: 292.5,
        FatContent: 9,
        SaturatedFatContent: 3,
        CholesterolContent: 31.3,
        SodiumContent: 1215.2,
        CarbohydrateContent: 38.3,
        FiberContent: 8.4,
        SugarContent: 10.3,
        ProteinContent: 18.5,
        RecipeInstructions:
          'c("In a skillet, cook beef, onion and garlic over medium heat until meat is no longer pink; drain.", "Transfer 2 a 5 qt.", "slow cooker.", "Add the remaining ingredients and mix well.", "Cover and cook on low for 5 hours or until vegetables are tender.")',
      },
      {
        RecipeId: 162283,
        Name: "Pan Fried Fish Fillets",
        CookTime: "PT10M",
        PrepTime: "PT15M",
        TotalTime: "PT25M",
        RecipeIngredientParts:
          'c("flour", "cornmeal", "salt", "white pepper", "cayenne", "lemon pepper", "mustard powder", "onion powder", "mace", "milk", "buttermilk")',
        Calories: 245.7,
        FatContent: 4.8,
        SaturatedFatContent: 1.8,
        CholesterolContent: 70.2,
        SodiumContent: 1846.7,
        CarbohydrateContent: 27.7,
        FiberContent: 1.9,
        SugarContent: 0.3,
        ProteinContent: 22.2,
        RecipeInstructions:
          'c("Dust the fish, oysters, or shrimp in the mixture and shake off the excess.", "Dunk it in a cup of milk or buttermilk and dip it again.", "Fry immediately in a small amount of canola oil with about one pat of butter.")',
      },
      {
        RecipeId: 220745,
        Name: "Lasagne",
        CookTime: "PT30M",
        PrepTime: "PT30M",
        TotalTime: "PT1H",
        RecipeIngredientParts:
          'c("ground beef", "salt", "pepper", "oregano", "tomato paste", "whole tomatoes", "onion", "cottage cheese", "pre-shredded mozzarella cheese")',
        Calories: 446.8,
        FatContent: 18.1,
        SaturatedFatContent: 7.8,
        CholesterolContent: 72.8,
        SodiumContent: 1177.9,
        CarbohydrateContent: 41.9,
        FiberContent: 4.7,
        SugarContent: 9.7,
        ProteinContent: 29.8,
        RecipeInstructions:
          'c("Brown Ground Beef - then drain & rinse.", "Add the all of the list 1 ingredients to the browned ground beef.", "Boil lasagne noodles until tender.", "In 9 x 13 pan put a layer of noodles, cover with meat sauce, then a thin layer of cottage cheese.  Add another layer of noodles and then rest of the meat sauce.  Top it off with the mozzarella cheese.", "Bake at 350 degrees for 1/2 hour.")',
      },
      {
        RecipeId: 241314,
        Name: "Doughnut Drops",
        CookTime: "",
        PrepTime: "PT30M",
        TotalTime: "PT30M",
        RecipeIngredientParts:
          'c("flour", "sugar", "baking powder", "salt", "nutmeg", "egg", "milk", "confectioners\' sugar")',
        Calories: 579.5,
        FatContent: 18.6,
        SaturatedFatContent: 4,
        CholesterolContent: 79,
        SodiumContent: 805.7,
        CarbohydrateContent: 90.2,
        FiberContent: 2.4,
        SugarContent: 22.8,
        ProteinContent: 12.8,
        RecipeInstructions:
          'c("Sift together dry ingredients.", "Mix in one at a time, egg, milk, and oil, and stir until smooth.", "Heat 1 inch of oil in pan to 365 degrees.", "Drop dough by teaspoons into hot oil, turning after a few seconds.", "Fry until evenly browned.", "Remove with slotted spoon.", "Drain on paper towls.", "Roll in sugar of choice and serve warm.")',
      },
      {
        RecipeId: 18399,
        Name: "Grilled Chicken Legs with Gubbins Sauce",
        CookTime: "PT40M",
        PrepTime: "PT0S",
        TotalTime: "PT40M",
        RecipeIngredientParts:
          'c("chicken drumsticks", "butter", "English mustard", "tarragon vinegar", "heavy whipping cream")',
        Calories: 412.4,
        FatContent: 31.4,
        SaturatedFatContent: 14.3,
        CholesterolContent: 169.3,
        SodiumContent: 228.7,
        CarbohydrateContent: 1.8,
        FiberContent: 0.6,
        SugarContent: 0.3,
        ProteinContent: 29.8,
        RecipeInstructions:
          'c("----GUBBINSSAUCE----.", "Make the sauce in the top of a double boiler over gently simmering water that should be low enough not to touch the base of the top pan.", "Melt the butter, stir in the mustard, the vinegar and lastly the cream.", "Season with salt and pepper and keep the sauce hot over the simmering water.", "----CHICKEN----.", "Brush the chicken drumsticks with oil, season them with salt and pepper and cover the ends of the leg bones with kitchen foil.", "Broil under a hot broiler (or grill them outdoors) for 20 minutes, turning occasionally.", \n"Test by piercing with a skewer at the fattest part of the leg, if a colourless bead of liquid falls it is done, if rose-red it needs a little longer.", "When the chicken legs are done serve them immediately with the Gubbins Sauce poured over them.")',
      },
      {
        RecipeId: 296197,
        Name: "Blueberry Muffins - Dairy Free",
        CookTime: "PT20M",
        PrepTime: "PT10M",
        TotalTime: "PT30M",
        RecipeIngredientParts:
          'c("flour", "sugar", "baking powder", "salt", "blueberries", "egg", "water", "vanilla", "sugar", "cinnamon")',
        Calories: 214.6,
        FatContent: 14.2,
        SaturatedFatContent: 1.9,
        CholesterolContent: 15.5,
        SodiumContent: 164.1,
        CarbohydrateContent: 19.6,
        FiberContent: 0.7,
        SugarContent: 5.2,
        ProteinContent: 2.5,
        RecipeInstructions:
          'c("Preheat oven to 400, grease muffin cups.", "Sift flour, sugar, baking powder and salt together into a mixing bowl.", "Stir in blueberries.", "Mix egg, oil, vanilla and water together, then stir them into the flour mixture.", "Stir until well combined.", "Spoon into muffin cups.", "Sprinkle top with optional sugar and cinammon (if desired).", "Bake 13 - 20 minutes.")',
      },
      {
        RecipeId: 114847,
        Name: "Monte Cristo Sandwich",
        CookTime: "PT20M",
        PrepTime: "PT15M",
        TotalTime: "PT35M",
        RecipeIngredientParts:
          'c("all-purpose flour", "salt", "baking powder", "water", "eggs", "white turkey meat", "swiss cheese", "ham", "canola oil")',
        Calories: 733,
        FatContent: 18,
        SaturatedFatContent: 7.9,
        CholesterolContent: 204.4,
        SodiumContent: 1770.5,
        CarbohydrateContent: 101.2,
        FiberContent: 4,
        SugarContent: 2.2,
        ProteinContent: 39.5,
        RecipeInstructions:
          'c("BATTER:  Sift flour, salt and baking powder together.", "Add water to beaten egg, then add to flour mixture and mix well.  Set aside.", "SANDWICH:  Make a sandwich using turkey first, then Swiss cheese, and then ham.", "Cut sandwich into quarters using toothpicks to hold sandwich together.", "Dip sandwich in egg batter and fry in 360°F canola oil until golden brown.", "Remove toothpicks and sprinkle with powdered sugar.", "Serve with raspberry jelly.")',
      },
      {
        RecipeId: 132296,
        Name: "Black Bean Burritos",
        CookTime: "PT15M",
        PrepTime: "PT20M",
        TotalTime: "PT35M",
        RecipeIngredientParts:
          'c("black beans", "fresh tomato", "green onions", "fresh cilantro", "garlic clove", "lime juice", "canola oil", "crushed red pepper flakes", "flour tortillas", "Hass avocadoes", "cooked rice", "monterey jack cheese")',
        Calories: 487.6,
        FatContent: 22.3,
        SaturatedFatContent: 2.9,
        CholesterolContent: 0,
        SodiumContent: 331.1,
        CarbohydrateContent: 62.3,
        FiberContent: 10.5,
        SugarContent: 2,
        ProteinContent: 11.5,
        RecipeInstructions:
          'c("In a large bowl mix together the beans, tomato, green onion, and cilantro. Set aside.", "In a small bowl, combine the garlic and the lime juice. In a slow, steady stream whisk in the oil until the dressing has emulsified. Combine the lime dressing and bean mixture. Stir in the crushed red pepper and hot sauce. Season with salt and freshly ground pepper.", "Preheat the oven to 350°F Soften the tortillas briefly in the oven; remove from oven.", "Spread on the avocado, followed by the cheese, rice, and bean mixture. Roll up the tortillas and arrange on a baking sheet. Place in the oven and heat through for 15 minutes or until the cheese has melted."\n)',
      },
      {
        RecipeId: 162270,
        Name: "Mexican Coleslaw",
        CookTime: "",
        PrepTime: "PT15M",
        TotalTime: "PT15M",
        RecipeIngredientParts:
          'c("cabbage", "cilantro", "lime juice", "sea salt", "sugar", "sugar substitute")',
        Calories: 57.8,
        FatContent: 2.9,
        SaturatedFatContent: 0.4,
        CholesterolContent: 0,
        SodiumContent: 230.3,
        CarbohydrateContent: 8,
        FiberContent: 2,
        SugarContent: 4.7,
        ProteinContent: 1.1,
        RecipeInstructions:
          'c("Combine the cabbage, onion, cilantro and jalapeños in a salad bowl and set aside.", "Combine the lime juice, olive oil, sea salt and sugar and whisk until the sugar and salt are dissolved, then pour over the cabbage mixture and serve immediately.", "I do not like this dish as a leftover, it loses it\'s crispness and clean taste.")',
      },
      {
        RecipeId: 337349,
        Name: "Potato Salad &amp; Mustard Dressing",
        CookTime: "PT20M",
        PrepTime: "PT5M",
        TotalTime: "PT25M",
        RecipeIngredientParts: 'c("potatoes", "red onion", "dill")',
        Calories: 171.1,
        FatContent: 0.3,
        SaturatedFatContent: 0.1,
        CholesterolContent: 0,
        SodiumContent: 53.3,
        CarbohydrateContent: 38.8,
        FiberContent: 5.8,
        SugarContent: 5.4,
        ProteinContent: 4.7,
        RecipeInstructions:
          'c("Place potatoes in a large saucepan and cover with cold water. Bring to the boil over medium-high heat. Boil, uncovered, for 20 minutes or until just cooked when tested with a skewer. Drain. Allow to cool slightly. Cut in half and place in a large bowl.", "Add beets, dijonnaise and onion to warm potatoes. Season with salt and pepper. Toss gently to combine. Sprinkle with dill. Serve.")',
      },
    ],
    lunch: [
      {
        RecipeId: 43761,
        Name: "Lots-A-Veggies Stew",
        CookTime: "PT5H",
        PrepTime: "PT30M",
        TotalTime: "PT5H30M",
        RecipeIngredientParts:
          'c("ground beef", "onion", "garlic", "kidney beans", "butter beans", "beef broth", "whole kernel corn", "tomato paste", "green pepper", "carrot", "celery", "chili powder", "dried oregano", "dried thyme", "salt", "dried marjoram", "pepper")',
        Calories: 292.5,
        FatContent: 9,
        SaturatedFatContent: 3,
        CholesterolContent: 31.3,
        SodiumContent: 1215.2,
        CarbohydrateContent: 38.3,
        FiberContent: 8.4,
        SugarContent: 10.3,
        ProteinContent: 18.5,
        RecipeInstructions:
          'c("In a skillet, cook beef, onion and garlic over medium heat until meat is no longer pink; drain.", "Transfer 2 a 5 qt.", "slow cooker.", "Add the remaining ingredients and mix well.", "Cover and cook on low for 5 hours or until vegetables are tender.")',
      },
      {
        RecipeId: 162283,
        Name: "Pan Fried Fish Fillets",
        CookTime: "PT10M",
        PrepTime: "PT15M",
        TotalTime: "PT25M",
        RecipeIngredientParts:
          'c("flour", "cornmeal", "salt", "white pepper", "cayenne", "lemon pepper", "mustard powder", "onion powder", "mace", "milk", "buttermilk")',
        Calories: 245.7,
        FatContent: 4.8,
        SaturatedFatContent: 1.8,
        CholesterolContent: 70.2,
        SodiumContent: 1846.7,
        CarbohydrateContent: 27.7,
        FiberContent: 1.9,
        SugarContent: 0.3,
        ProteinContent: 22.2,
        RecipeInstructions:
          'c("Dust the fish, oysters, or shrimp in the mixture and shake off the excess.", "Dunk it in a cup of milk or buttermilk and dip it again.", "Fry immediately in a small amount of canola oil with about one pat of butter.")',
      },
      {
        RecipeId: 220745,
        Name: "Lasagne",
        CookTime: "PT30M",
        PrepTime: "PT30M",
        TotalTime: "PT1H",
        RecipeIngredientParts:
          'c("ground beef", "salt", "pepper", "oregano", "tomato paste", "whole tomatoes", "onion", "cottage cheese", "pre-shredded mozzarella cheese")',
        Calories: 446.8,
        FatContent: 18.1,
        SaturatedFatContent: 7.8,
        CholesterolContent: 72.8,
        SodiumContent: 1177.9,
        CarbohydrateContent: 41.9,
        FiberContent: 4.7,
        SugarContent: 9.7,
        ProteinContent: 29.8,
        RecipeInstructions:
          'c("Brown Ground Beef - then drain & rinse.", "Add the all of the list 1 ingredients to the browned ground beef.", "Boil lasagne noodles until tender.", "In 9 x 13 pan put a layer of noodles, cover with meat sauce, then a thin layer of cottage cheese.  Add another layer of noodles and then rest of the meat sauce.  Top it off with the mozzarella cheese.", "Bake at 350 degrees for 1/2 hour.")',
      },
      {
        RecipeId: 241314,
        Name: "Doughnut Drops",
        CookTime: "",
        PrepTime: "PT30M",
        TotalTime: "PT30M",
        RecipeIngredientParts:
          'c("flour", "sugar", "baking powder", "salt", "nutmeg", "egg", "milk", "confectioners\' sugar")',
        Calories: 579.5,
        FatContent: 18.6,
        SaturatedFatContent: 4,
        CholesterolContent: 79,
        SodiumContent: 805.7,
        CarbohydrateContent: 90.2,
        FiberContent: 2.4,
        SugarContent: 22.8,
        ProteinContent: 12.8,
        RecipeInstructions:
          'c("Sift together dry ingredients.", "Mix in one at a time, egg, milk, and oil, and stir until smooth.", "Heat 1 inch of oil in pan to 365 degrees.", "Drop dough by teaspoons into hot oil, turning after a few seconds.", "Fry until evenly browned.", "Remove with slotted spoon.", "Drain on paper towls.", "Roll in sugar of choice and serve warm.")',
      },
      {
        RecipeId: 18399,
        Name: "Grilled Chicken Legs with Gubbins Sauce",
        CookTime: "PT40M",
        PrepTime: "PT0S",
        TotalTime: "PT40M",
        RecipeIngredientParts:
          'c("chicken drumsticks", "butter", "English mustard", "tarragon vinegar", "heavy whipping cream")',
        Calories: 412.4,
        FatContent: 31.4,
        SaturatedFatContent: 14.3,
        CholesterolContent: 169.3,
        SodiumContent: 228.7,
        CarbohydrateContent: 1.8,
        FiberContent: 0.6,
        SugarContent: 0.3,
        ProteinContent: 29.8,
        RecipeInstructions:
          'c("----GUBBINSSAUCE----.", "Make the sauce in the top of a double boiler over gently simmering water that should be low enough not to touch the base of the top pan.", "Melt the butter, stir in the mustard, the vinegar and lastly the cream.", "Season with salt and pepper and keep the sauce hot over the simmering water.", "----CHICKEN----.", "Brush the chicken drumsticks with oil, season them with salt and pepper and cover the ends of the leg bones with kitchen foil.", "Broil under a hot broiler (or grill them outdoors) for 20 minutes, turning occasionally.", \n"Test by piercing with a skewer at the fattest part of the leg, if a colourless bead of liquid falls it is done, if rose-red it needs a little longer.", "When the chicken legs are done serve them immediately with the Gubbins Sauce poured over them.")',
      },
      {
        RecipeId: 296197,
        Name: "Blueberry Muffins - Dairy Free",
        CookTime: "PT20M",
        PrepTime: "PT10M",
        TotalTime: "PT30M",
        RecipeIngredientParts:
          'c("flour", "sugar", "baking powder", "salt", "blueberries", "egg", "water", "vanilla", "sugar", "cinnamon")',
        Calories: 214.6,
        FatContent: 14.2,
        SaturatedFatContent: 1.9,
        CholesterolContent: 15.5,
        SodiumContent: 164.1,
        CarbohydrateContent: 19.6,
        FiberContent: 0.7,
        SugarContent: 5.2,
        ProteinContent: 2.5,
        RecipeInstructions:
          'c("Preheat oven to 400, grease muffin cups.", "Sift flour, sugar, baking powder and salt together into a mixing bowl.", "Stir in blueberries.", "Mix egg, oil, vanilla and water together, then stir them into the flour mixture.", "Stir until well combined.", "Spoon into muffin cups.", "Sprinkle top with optional sugar and cinammon (if desired).", "Bake 13 - 20 minutes.")',
      },
      {
        RecipeId: 114847,
        Name: "Monte Cristo Sandwich",
        CookTime: "PT20M",
        PrepTime: "PT15M",
        TotalTime: "PT35M",
        RecipeIngredientParts:
          'c("all-purpose flour", "salt", "baking powder", "water", "eggs", "white turkey meat", "swiss cheese", "ham", "canola oil")',
        Calories: 733,
        FatContent: 18,
        SaturatedFatContent: 7.9,
        CholesterolContent: 204.4,
        SodiumContent: 1770.5,
        CarbohydrateContent: 101.2,
        FiberContent: 4,
        SugarContent: 2.2,
        ProteinContent: 39.5,
        RecipeInstructions:
          'c("BATTER:  Sift flour, salt and baking powder together.", "Add water to beaten egg, then add to flour mixture and mix well.  Set aside.", "SANDWICH:  Make a sandwich using turkey first, then Swiss cheese, and then ham.", "Cut sandwich into quarters using toothpicks to hold sandwich together.", "Dip sandwich in egg batter and fry in 360°F canola oil until golden brown.", "Remove toothpicks and sprinkle with powdered sugar.", "Serve with raspberry jelly.")',
      },
      {
        RecipeId: 132296,
        Name: "Black Bean Burritos",
        CookTime: "PT15M",
        PrepTime: "PT20M",
        TotalTime: "PT35M",
        RecipeIngredientParts:
          'c("black beans", "fresh tomato", "green onions", "fresh cilantro", "garlic clove", "lime juice", "canola oil", "crushed red pepper flakes", "flour tortillas", "Hass avocadoes", "cooked rice", "monterey jack cheese")',
        Calories: 487.6,
        FatContent: 22.3,
        SaturatedFatContent: 2.9,
        CholesterolContent: 0,
        SodiumContent: 331.1,
        CarbohydrateContent: 62.3,
        FiberContent: 10.5,
        SugarContent: 2,
        ProteinContent: 11.5,
        RecipeInstructions:
          'c("In a large bowl mix together the beans, tomato, green onion, and cilantro. Set aside.", "In a small bowl, combine the garlic and the lime juice. In a slow, steady stream whisk in the oil until the dressing has emulsified. Combine the lime dressing and bean mixture. Stir in the crushed red pepper and hot sauce. Season with salt and freshly ground pepper.", "Preheat the oven to 350°F Soften the tortillas briefly in the oven; remove from oven.", "Spread on the avocado, followed by the cheese, rice, and bean mixture. Roll up the tortillas and arrange on a baking sheet. Place in the oven and heat through for 15 minutes or until the cheese has melted."\n)',
      },
      {
        RecipeId: 162270,
        Name: "Mexican Coleslaw",
        CookTime: "",
        PrepTime: "PT15M",
        TotalTime: "PT15M",
        RecipeIngredientParts:
          'c("cabbage", "cilantro", "lime juice", "sea salt", "sugar", "sugar substitute")',
        Calories: 57.8,
        FatContent: 2.9,
        SaturatedFatContent: 0.4,
        CholesterolContent: 0,
        SodiumContent: 230.3,
        CarbohydrateContent: 8,
        FiberContent: 2,
        SugarContent: 4.7,
        ProteinContent: 1.1,
        RecipeInstructions:
          'c("Combine the cabbage, onion, cilantro and jalapeños in a salad bowl and set aside.", "Combine the lime juice, olive oil, sea salt and sugar and whisk until the sugar and salt are dissolved, then pour over the cabbage mixture and serve immediately.", "I do not like this dish as a leftover, it loses it\'s crispness and clean taste.")',
      },
      {
        RecipeId: 337349,
        Name: "Potato Salad &amp; Mustard Dressing",
        CookTime: "PT20M",
        PrepTime: "PT5M",
        TotalTime: "PT25M",
        RecipeIngredientParts: 'c("potatoes", "red onion", "dill")',
        Calories: 171.1,
        FatContent: 0.3,
        SaturatedFatContent: 0.1,
        CholesterolContent: 0,
        SodiumContent: 53.3,
        CarbohydrateContent: 38.8,
        FiberContent: 5.8,
        SugarContent: 5.4,
        ProteinContent: 4.7,
        RecipeInstructions:
          'c("Place potatoes in a large saucepan and cover with cold water. Bring to the boil over medium-high heat. Boil, uncovered, for 20 minutes or until just cooked when tested with a skewer. Drain. Allow to cool slightly. Cut in half and place in a large bowl.", "Add beets, dijonnaise and onion to warm potatoes. Season with salt and pepper. Toss gently to combine. Sprinkle with dill. Serve.")',
      },
    ],
    dinner: [
      {
        RecipeId: 43761,
        Name: "Lots-A-Veggies Stew",
        CookTime: "PT5H",
        PrepTime: "PT30M",
        TotalTime: "PT5H30M",
        RecipeIngredientParts:
          'c("ground beef", "onion", "garlic", "kidney beans", "butter beans", "beef broth", "whole kernel corn", "tomato paste", "green pepper", "carrot", "celery", "chili powder", "dried oregano", "dried thyme", "salt", "dried marjoram", "pepper")',
        Calories: 292.5,
        FatContent: 9,
        SaturatedFatContent: 3,
        CholesterolContent: 31.3,
        SodiumContent: 1215.2,
        CarbohydrateContent: 38.3,
        FiberContent: 8.4,
        SugarContent: 10.3,
        ProteinContent: 18.5,
        RecipeInstructions:
          'c("In a skillet, cook beef, onion and garlic over medium heat until meat is no longer pink; drain.", "Transfer 2 a 5 qt.", "slow cooker.", "Add the remaining ingredients and mix well.", "Cover and cook on low for 5 hours or until vegetables are tender.")',
      },
      {
        RecipeId: 165528,
        Name: "Pudding Ice Cream #3 - Lemon Berry",
        CookTime: "PT6H",
        PrepTime: "PT10M",
        TotalTime: "PT6H10M",
        RecipeIngredientParts:
          'c("instant lemon pudding", "fresh strawberries", "non-dairy whipped topping")',
        Calories: 341.4,
        FatContent: 25.2,
        SaturatedFatContent: 17.9,
        CholesterolContent: 52.8,
        SodiumContent: 257.2,
        CarbohydrateContent: 28,
        FiberContent: 0.2,
        SugarContent: 9.4,
        ProteinContent: 2.7,
        RecipeInstructions:
          'c("Pour cold cream into a cold bowl. Add pudding mix.", "Using an electric mixer at low speed, beat until well blended. about 2 minutes.", "Let stand for 5 minutes.", "Fold in the berries and whipped topping.", "Pour into a 2-qt. covered container.", "Freeze 6 hours.")',
      },
      {
        RecipeId: 280159,
        Name: "Mom's Roast Sauce",
        CookTime: "PT10M",
        PrepTime: "PT5M",
        TotalTime: "PT15M",
        RecipeIngredientParts:
          'c("butter", "catsup", "water", "cider vinegar", "brown sugar", "Worcestershire sauce", "salt", "yellow mustard", "pepper")',
        Calories: 85.5,
        FatContent: 5.8,
        SaturatedFatContent: 3.7,
        CholesterolContent: 15.3,
        SodiumContent: 683.9,
        CarbohydrateContent: 8.8,
        FiberContent: 0.2,
        SugarContent: 7.5,
        ProteinContent: 0.5,
        RecipeInstructions:
          'c("In a medium saucepan, simmer diced onion in butter until tender.", "Add Catsup, water, vinegar, brown sugar, worcestershire, salt, mustard, and pepper.", "Stir and heat until it boils.", "Pour over roast of your choice and veggies if desired.  Bake your roast as you normally would.")',
      },
      {
        RecipeId: 114847,
        Name: "Monte Cristo Sandwich",
        CookTime: "PT20M",
        PrepTime: "PT15M",
        TotalTime: "PT35M",
        RecipeIngredientParts:
          'c("all-purpose flour", "salt", "baking powder", "water", "eggs", "white turkey meat", "swiss cheese", "ham", "canola oil")',
        Calories: 733,
        FatContent: 18,
        SaturatedFatContent: 7.9,
        CholesterolContent: 204.4,
        SodiumContent: 1770.5,
        CarbohydrateContent: 101.2,
        FiberContent: 4,
        SugarContent: 2.2,
        ProteinContent: 39.5,
        RecipeInstructions:
          'c("BATTER:  Sift flour, salt and baking powder together.", "Add water to beaten egg, then add to flour mixture and mix well.  Set aside.", "SANDWICH:  Make a sandwich using turkey first, then Swiss cheese, and then ham.", "Cut sandwich into quarters using toothpicks to hold sandwich together.", "Dip sandwich in egg batter and fry in 360°F canola oil until golden brown.", "Remove toothpicks and sprinkle with powdered sugar.", "Serve with raspberry jelly.")',
      },
      {
        RecipeId: 20385,
        Name: "Vegetarian Tossed Hearts Of Romaine With Peppers & Honey-Lemon Dressing",
        CookTime: "",
        PrepTime: "PT15M",
        TotalTime: "PT15M",
        RecipeIngredientParts:
          'c("honey", "fresh rosemary", "red bell pepper", "yellow bell pepper", "green bell pepper", "romaine lettuce")',
        Calories: 100.6,
        FatContent: 1,
        SaturatedFatContent: 0.1,
        CholesterolContent: 0,
        SodiumContent: 26.6,
        CarbohydrateContent: 23.1,
        FiberContent: 7.2,
        SugarContent: 13.5,
        ProteinContent: 4.3,
        RecipeInstructions:
          'c("Thoroughly whisk together the lemon juice, honey and rosemary.", "Cut the base end off of the romaine hearts, separate the leaves, then wash and dry them thoroughly.", "Place the leave and peppers in a mixing bowl with the dressing to coat them completely.", "To serve stack the romaine leaves on individual plates in crosswise layers.", "Top each serving with any remaining peppers that do not cling to the leaves.")',
      },
      {
        RecipeId: 106591,
        Name: "Pollo a Las Rajas",
        CookTime: "",
        PrepTime: "PT45M",
        TotalTime: "PT45M",
        RecipeIngredientParts:
          'c("chicken breast halves", "red bell pepper", "Spanish onion", "poblano chile", "garlic", "ground black pepper", "sour cream", "monterey jack cheese", "half-and-half")',
        Calories: 704.1,
        FatContent: 58.8,
        SaturatedFatContent: 23.3,
        CholesterolContent: 133,
        SodiumContent: 593,
        CarbohydrateContent: 12.1,
        FiberContent: 1.6,
        SugarContent: 4.2,
        ProteinContent: 32.6,
        RecipeInstructions:
          'c("Season the chicken breast halves with garlic, salt, and black pepper.", "Place the chicken breast halves in a roasting pan (uncovered) and cook in the oven at 350°F for 20 minutes or until cooked.", "In a saucepan heat 2 tablespoons of oil and lightly sauté poblano pepper until skin starts separating; Peel skin from poblano pepper; Make a slit and remove all the seeds.", "Slice onion, bell pepper, and poblano pepper into strips.", "In a heavy skillet heat remaining 3 tablespoons of oil, and add chorizo, garlic, onion, and peppers.", \n"Cook over medium high heat stirring occasionally until onions and peppers are soft.", "Add sour cream, half-and-half, black pepper and salt and simmer for three minutes.", "On ovenproof serving dishes, place 3/4 cup of vegetable mixture.", "Top with roasted chicken breast.", "Sprinkle 1/4 cup Monterey Jack cheese on each serving plate.", "Broil until cheese melts and turns golden.", "Serve.")',
      },
      {
        RecipeId: 18399,
        Name: "Grilled Chicken Legs with Gubbins Sauce",
        CookTime: "PT40M",
        PrepTime: "PT0S",
        TotalTime: "PT40M",
        RecipeIngredientParts:
          'c("chicken drumsticks", "butter", "English mustard", "tarragon vinegar", "heavy whipping cream")',
        Calories: 412.4,
        FatContent: 31.4,
        SaturatedFatContent: 14.3,
        CholesterolContent: 169.3,
        SodiumContent: 228.7,
        CarbohydrateContent: 1.8,
        FiberContent: 0.6,
        SugarContent: 0.3,
        ProteinContent: 29.8,
        RecipeInstructions:
          'c("----GUBBINSSAUCE----.", "Make the sauce in the top of a double boiler over gently simmering water that should be low enough not to touch the base of the top pan.", "Melt the butter, stir in the mustard, the vinegar and lastly the cream.", "Season with salt and pepper and keep the sauce hot over the simmering water.", "----CHICKEN----.", "Brush the chicken drumsticks with oil, season them with salt and pepper and cover the ends of the leg bones with kitchen foil.", "Broil under a hot broiler (or grill them outdoors) for 20 minutes, turning occasionally.", \n"Test by piercing with a skewer at the fattest part of the leg, if a colourless bead of liquid falls it is done, if rose-red it needs a little longer.", "When the chicken legs are done serve them immediately with the Gubbins Sauce poured over them.")',
      },
      {
        RecipeId: 23410,
        Name: "Oyster Sauce",
        CookTime: "PT5M",
        PrepTime: "PT5M",
        TotalTime: "PT10M",
        RecipeIngredientParts:
          'c("oyster sauce", "beef", "cornstarch", "water", "sugar")',
        Calories: 76,
        FatContent: 0.1,
        SaturatedFatContent: 0,
        CholesterolContent: 0,
        SodiumContent: 1315.2,
        CarbohydrateContent: 17.8,
        FiberContent: 0.2,
        SugarContent: 2.8,
        ProteinContent: 0.7,
        RecipeInstructions:
          'c("Mix together in a small pot the cornstarch, water and sugar.", "Add the oyster sauce and heat till it thickens.", "I like this added to snow peas, mushrooms etc.", "Also nice in a stir fry of your choice.")',
      },
      {
        RecipeId: 162283,
        Name: "Pan Fried Fish Fillets",
        CookTime: "PT10M",
        PrepTime: "PT15M",
        TotalTime: "PT25M",
        RecipeIngredientParts:
          'c("flour", "cornmeal", "salt", "white pepper", "cayenne", "lemon pepper", "mustard powder", "onion powder", "mace", "milk", "buttermilk")',
        Calories: 245.7,
        FatContent: 4.8,
        SaturatedFatContent: 1.8,
        CholesterolContent: 70.2,
        SodiumContent: 1846.7,
        CarbohydrateContent: 27.7,
        FiberContent: 1.9,
        SugarContent: 0.3,
        ProteinContent: 22.2,
        RecipeInstructions:
          'c("Dust the fish, oysters, or shrimp in the mixture and shake off the excess.", "Dunk it in a cup of milk or buttermilk and dip it again.", "Fry immediately in a small amount of canola oil with about one pat of butter.")',
      },
      {
        RecipeId: 220745,
        Name: "Lasagne",
        CookTime: "PT30M",
        PrepTime: "PT30M",
        TotalTime: "PT1H",
        RecipeIngredientParts:
          'c("ground beef", "salt", "pepper", "oregano", "tomato paste", "whole tomatoes", "onion", "cottage cheese", "pre-shredded mozzarella cheese")',
        Calories: 446.8,
        FatContent: 18.1,
        SaturatedFatContent: 7.8,
        CholesterolContent: 72.8,
        SodiumContent: 1177.9,
        CarbohydrateContent: 41.9,
        FiberContent: 4.7,
        SugarContent: 9.7,
        ProteinContent: 29.8,
        RecipeInstructions:
          'c("Brown Ground Beef - then drain & rinse.", "Add the all of the list 1 ingredients to the browned ground beef.", "Boil lasagne noodles until tender.", "In 9 x 13 pan put a layer of noodles, cover with meat sauce, then a thin layer of cottage cheese.  Add another layer of noodles and then rest of the meat sauce.  Top it off with the mozzarella cheese.", "Bake at 350 degrees for 1/2 hour.")',
      },
    ],
  });
  const [response, setResponse] = useState(true);
  const {
    register: dietAnalysis,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch(
        "http://172.18.1.168:8000/recommend_recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: data.age,
            height: data.height,
            weight: data.weight,
            gender: data.gender,
            activity: data.activity,
            diet_plan: data.diet_plan,
            meal_count: data.meal_count,
            diet_type: data.diet_type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setBmi(responseData.BMI);
      setCalories(responseData.total_calories);
      setRecipes(responseData.recipes);
      setResponse(true);
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const exerciseLabels = [
    "Little/No Exercise(0-1 day/week)",
    "Light Exercise(1-2 day/week)",
    "Moderate Exercise(3-4 day/week)",
    "Highly Active(5-6 day/week)",
    "Daily",
  ];

  const dietPlanLabels = [
    "Extreme weight gain",
    "Mild weight gain",
    "Weight gain",
    "Maintain Weight",
    "Mild weight loss",
    "Weight loss",
    "Extreme weight loss",
  ];

  const dietOptions = ["Vegetarian Diet", "Non-Vegetarian Diet", "Vegan"];

  return (
    <>
      <div className="bg-white bg-opacity-80 p-4 m-4 rounded-lg shadow-lg">
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
                    defaultValue={18}
                    min={2}
                    max={115}
                    {...dietAnalysis("age", {
                      required: "Age is required",
                    })}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) < 2) {
                        e.target.value = 2;
                      }
                    }}
                    labelProps={{ className: ` peer-focus:text-primary ` }}
                    label="Age"
                  />
                  {errors.age && <p>{errors.age.message}</p>}
                </div>

                <div className="mb-4">
                  <Input
                    id="height"
                    type="number"
                    defaultValue={165}
                    min={50}
                    max={220}
                    {...dietAnalysis("height", {
                      required: "Height is required",
                    })}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (value === "" || Number(value) < 50) {
                        e.target.value = 50;
                      }
                    }}
                    labelProps={{ className: ` peer-focus:text-primary ` }}
                    label="Height(cm)"
                  />
                  {errors.height && (
                    <div className="mb-4 text-red-600 text-sm">
                      {errors.height.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <Input
                  id="wight"
                  type="number"
                  defaultValue={60}
                  min={10}
                  max={160}
                  {...dietAnalysis("weight", {
                    required: "Weight is required",
                  })}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) < 10) {
                      e.target.value = 10;
                    }
                  }}
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
                <Slider
                  control={control}
                  name="activity"
                  labels={exerciseLabels}
                />
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
                <Slider
                  control={control}
                  name="meal_count"
                  labels={[2, 3, 4, 5]}
                />
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
                {errorMessage && (
                  <div className="text-primary text-center mb-4">
                    {errorMessage}
                  </div>
                )}
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
      </div>

      {response && (
        <DietAnalysis bmi={bmi} calories={calories} recipes={recipes} />
      )}
    </>
  );
}
