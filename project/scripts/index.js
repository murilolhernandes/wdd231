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
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

getRecipes().then(data => {
  if (data && data.recipes) {
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

const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

document.querySelector("#about-us").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>About Us</h2>
  <p>Welcome to Cookbook Corner, your go-to destination for discovering and sharing delicious recipes from around the world! Whether you're a seasoned chef or a home cook, our platform is designed to inspire your culinary creativity and connect you with a community of food enthusiasts.</p>
  `;
});

document.querySelector("#our-mission").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>Our Mission</h2>
  <p>At Cookbook Corner, we believe that cooking is more than just preparing meals—it's an art form that brings people together. Our mission is to create a vibrant space where food lovers can explore new flavors, share their favorite recipes, and learn from one another. We aim to make cooking accessible and enjoyable for everyone, regardless of skill level.</p>
  <p>The benefits of a Bronze Membership are:</p>
  `;
});

document.querySelector("#offer").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>What We Offer</h2>
  <ul>
    <li>Diverse Recipes: Explore a wide variety of recipes, from quick weeknight dinners to gourmet dishes, contributed by our passionate community.</li>
    <li>User-Friendly Experience: Our intuitive platform makes it easy to search for recipes, save your favorites, and share your culinary creations with others.</li>
    <li>Community Engagement: Connect with fellow food enthusiasts through comments, ratings, and discussions. Share tips, ask questions, and celebrate your love for cooking together.</li>
    <li>Inspiration and Learning: Discover new cooking techniques, ingredient highlights, and culinary trends through our curated content and featured recipes.</li>
  </ul>
  `;
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
})
