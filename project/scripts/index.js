import { initializeHeaderAndFooter } from "./header-and-footer-module.js";
initializeHeaderAndFooter();

const recipes = "./data/recipes.json";
const card = document.querySelector(".cards");

const categoryDisplayNames = {
  mainDishes: "Main Dishes",
  desserts: "Desserts",
  snacks: "Snacks"
};

async function getRecipes() {
  try {
    const response = await fetch(recipes);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    // console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

getRecipes().then(data => {
  if (data && data.recipes) {
    // console.log('Recipes data:', data.recipes);
    displayCategoryOverview(data.recipes);
  } else {
    console.error('No recipes property found in data');
  }
});

function displayCategoryOverview(recipesData) {
  if (!recipesData) {
    console.error('No recipe data to display');
    return;
  }

  const categories = Object.keys(recipesData);
  // console.log('Categories found:', categories);

  categories.forEach((category) => {
    const randomIndex = Math.floor(Math.random() * recipesData[category].length);
    const randomRecipe = recipesData[category][randomIndex];

    let section = document.createElement("section");
    let div = document.createElement("div");
    let categoryName = document.createElement("h2");
    let image = document.createElement("img");
    let button = document.createElement("button");

    
    categoryName.textContent = categoryDisplayNames[category] || category;
    image.setAttribute("src", randomRecipe.imgURL);
    image.setAttribute("alt", `${randomRecipe.name} recipe image`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", randomRecipe.width);
    image.setAttribute("height", randomRecipe.height);
    button.setAttribute("data-category", category);
    button.setAttribute("aria-label", `${categoryDisplayNames[category] || category} Explore button`)
    button.textContent = `Explore ${categoryDisplayNames[category] || category}`;
    div.classList.add("p-button");

    div.appendChild(categoryName);
    div.appendChild(button);
    section.appendChild(image);
    section.appendChild(div);

    card.appendChild(section);

    document.querySelectorAll(".p-button button[data-category]").forEach(button => {
      console.log(`Button found: ${button}`);
      button.addEventListener("click", (event) => {
        const category = event.target.getAttribute("data-category");
        console.log(`Button clicked: ${category}`);
        window.location.href = `https://murilolhernandes.github.io/wdd231/project/recipes.html?filter=${category}`;
      });
    });
  });
}

