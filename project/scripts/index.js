const today = new Date();
document.getElementById("currentYear").innerHTML = `&copy; ${today.getFullYear()} Rexburg Chamber of Commerce`;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.getElementById("menu");
const navigation = document.querySelectorAll(".nav");
const header = document.querySelector("header");
const headerContainer = document.querySelector(".header-container");
const image = document.querySelector(".logo");

hamButton.addEventListener("click", () => {
  navigation.forEach(nav => nav.classList.toggle("open"));
  hamButton.classList.toggle("open");
  header.classList.toggle("open");
  headerContainer.classList.toggle("open");
  image.classList.toggle("close");
});

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
    button.setAttribute("aria-label", `${categoryDisplayNames[category] || category} Explore button`)
    button.textContent = `Explore ${categoryDisplayNames[category] || category}`;
    div.classList.add("p-button");

    div.appendChild(categoryName);
    div.appendChild(button);
    section.appendChild(image);
    section.appendChild(div);

    card.appendChild(section);
  });
}