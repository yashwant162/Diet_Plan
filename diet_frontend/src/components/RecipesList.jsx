import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  fontFamily: "sansMedium, Arial, sans-serif",
  backgroundColor: "#f0f0f0",
}));
("@mui/material/styles");

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const parseArrayString = (data) => {
  try {
    console.log(data);
    const correctedString = data
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/(\[\s*"\s*")(\s*\d+\s*")/g, '["$1"$2') // Handle number formatting
      .replace(/(\s*"\s*\d+)(\s*"\s*])/g, '"$1"$2'); // Handle number formatting

    return JSON.parse(correctedString);
  } catch (error) {
    console.error("Error parsing the array string:", error);
    return [];
  }
};

const RecipeAccordion = ({ recipes, category }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (recipeId) => (event, newExpanded) => {
    setExpanded(newExpanded ? recipeId : false);
  };

  return (
    <div className="mt-8">
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: "1.125rem",
          fontWeight: "bold",
          marginTop: 2,
        }}
      >
        {category}
      </Typography>
      {recipes.map((recipe) => (
        <Accordion
          key={recipe.RecipeId}
          expanded={expanded === recipe.RecipeId}
          onChange={handleChange(recipe.RecipeId)}
        >
          <AccordionSummary
            aria-controls={`${recipe.RecipeId}-content`}
            id={`${recipe.RecipeId}-header`}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {recipe.Name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>Ingredients:</strong>
            </Typography>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {parseArrayString(recipe.RecipeIngredientParts).map(
                (ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                )
              )}
            </ul>
            <Typography variant="body2" mt={2}>
              <strong>Instructions:</strong>
            </Typography>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {parseArrayString(recipe.RecipeInstructions).map(
                (instruction, index) => (
                  <li key={index}> {instruction}</li>
                )
              )}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const RecipesList = ({ recipes }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {recipes.breakfast && (
        <div style={{ flex: 1, padding: "0 10px" }}>
          <RecipeAccordion recipes={recipes.breakfast} category="Breakfast" />
        </div>
      )}
      {recipes.morning_snack && (
        <div style={{ flex: 1, padding: "0 10px" }}>
          <RecipeAccordion
            recipes={recipes.morning_snack}
            category="Morning Snack"
          />
        </div>
      )}
      {recipes.lunch && (
        <div style={{ flex: 1, padding: "0 10px" }}>
          <RecipeAccordion recipes={recipes.lunch} category="Lunch" />
        </div>
      )}
      {recipes.dinner && (
        <div style={{ flex: 1, padding: "0 10px" }}>
          <RecipeAccordion recipes={recipes.dinner} category="Dinner" />
        </div>
      )}
    </div>
  );
};

export default RecipesList;
