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

const filterButtons = document.querySelector(".filterButtons");

let filters = [
  {
    buttonName: "All Recipes",
    id: "all",
    class: "filters",
    ariaLabel: "All Recipes"
  },
  {
    buttonName: "Main Dishes",
    id: "main",
    class: "filters",
    ariaLabel: "Main Dishes"
  },
  {
    buttonName: "Desserts",
    id: "desserts",
    class: "filters",
    ariaLabel: "Desserts"
  },
  {
    buttonName: "Snacks",
    id: "snacks",
    class: "filters",
    ariaLabel: "Snacks"
  }
];

createButtons();

function createButtons() {
  for (let i = 0; i < filters.length; i++) {
    let id = filters[i].id;
    let className = filters[i].class;
    let ariaLabel = filters[i].ariaLabel;
    let objectName = filters[i].buttonName;
    filterButtons.innerHTML += `<button id="${id}" class="${className}" aria-label="${ariaLabel}">${objectName}</button>`;
  }
}

const recipes = "./data/recipes.json";
const card = document.querySelector(".cards");
let allRecipes = {};
let popularSearches = document.querySelector(".searches");
let trendingRecipes = document.querySelector(".trending-recipes"); 

async function getRecipes() {
  const response = await fetch(recipes);
  const data = await response.json();
  allRecipes = data.recipes;
  // console.log(data);
  // displayRecipes(data.recipes);
  loadPopularSearches();
  loadTrendingRecipes();
  applyFilterFromURL();
}

getRecipes();

let openSection = null;

const displayRecipes = (recipes) => {
  card.innerHTML = "";
  let recipeIndex = 0;

  for (const category in recipes) {
    recipes[category].forEach((recipe) => {
      let section = document.createElement("section");
      section.id = `recipe-${recipeIndex}`;

      let recipeName = document.createElement("h2");

      let recipeRatingDiv = document.createElement("div");
      let recipeRating = document.createElement("p");
      let recipeReviews = document.createElement("p");

      let image = document.createElement("img");
      let descriptionDiv = document.createElement("div");
      let description = document.createElement("p");
      let recipeAuthor = document.createElement("p");
      let recipeDetailsDiv = document.createElement("div");
      let recipeDetailsDiv2 = document.createElement("div");

      let prepTimeDiv = document.createElement("div");
      let prepTime = document.createElement("h3");

      let cookTimeDiv = document.createElement("div");
      let cookTime = document.createElement("h3");

      let addTimeDiv = document.createElement("div");
      let addTime = document.createElement("h3");

      let totalTimeDiv = document.createElement("div");
      let totalTime = document.createElement("h3");

      let servingsDiv = document.createElement("div");
      let servings = document.createElement("h3");
      
      let yieldDiv = document.createElement("div");
      let yield = document.createElement("h3");

      let buttonDiv = document.createElement("div");
      let button = document.createElement("button");

      let recipeInfoDiv = document.createElement("div");
      let reviewInfoDiv = document.createElement("div");

      recipeName.textContent = `${recipe.name}`;
      recipeAuthor.innerHTML = `By: <span class="author">${recipe.author}</span>`;
      recipeReviews.innerHTML = `${recipe.reviews.length} reviews`;
      image.setAttribute("src", recipe.imgURL);
      image.setAttribute("alt", `${recipe.name} recipe image`);
      image.setAttribute("loading", "lazy");
      image.setAttribute("width", recipe.width);
      image.setAttribute("height", recipe.height);
      description.textContent = `${recipe.description}`;
      recipeRating.innerHTML = `<span class="rating">Rating:</span> ${recipe.recipeRating}`;
      prepTime.innerHTML = `<span>Prep Time:</span> <p>${recipe.prepTime}</p>`;
      cookTime.innerHTML = `<span>Cook Time:</span> <p>${recipe.cookTime}</p>`;
      addTime.innerHTML = `<span>Additional Time:</span> <p>${recipe.additionalTime || 'N/A'}</p>`;
      totalTime.innerHTML = `<span>Total Time:</span> <p>${recipe.totalTime}</p>`;
      servings.innerHTML = `<span>Servings:</span> <p>${recipe.serving}</p>`;
      yield.innerHTML = `<span>Yield:</span> <p>${recipe.yield || 'N/A'}</p>`;
      button.textContent = "View Recipe ";

      section.classList.add("card-section");
      recipeRatingDiv.classList.add("recipe-rating-container");
      recipeReviews.classList.add("reviews");
      recipeRating.classList.add("recipe-rating");
      recipeDetailsDiv.classList.add("recipe-details");
      recipeDetailsDiv2.classList.add("recipe-details2");
      prepTimeDiv.classList.add("prep-time");
      cookTimeDiv.classList.add("cook-time");
      addTimeDiv.classList.add("add-time");
      totalTimeDiv.classList.add("total-time");
      servingsDiv.classList.add("servings");
      yieldDiv.classList.add("yield");
      buttonDiv.classList.add("button-div");
      button.classList.add("button");
      recipeInfoDiv.classList.add("recipe-info");
      reviewInfoDiv.classList.add("review-info");
      descriptionDiv.classList.add("description");

      recipeRatingDiv.appendChild(recipeRating);
      recipeRatingDiv.appendChild(recipeReviews);
      descriptionDiv.appendChild(description);
      descriptionDiv.appendChild(recipeAuthor);
      prepTimeDiv.appendChild(prepTime);
      cookTimeDiv.appendChild(cookTime);
      addTimeDiv.appendChild(addTime);
      totalTimeDiv.appendChild(totalTime);
      servingsDiv.appendChild(servings);
      yieldDiv.appendChild(yield);
      buttonDiv.appendChild(button);
      recipeDetailsDiv.appendChild(prepTimeDiv);
      recipeDetailsDiv.appendChild(cookTimeDiv);
      recipeDetailsDiv.appendChild(addTimeDiv);
      recipeDetailsDiv.appendChild(totalTimeDiv);
      recipeDetailsDiv.appendChild(servingsDiv);
      recipeDetailsDiv.appendChild(yieldDiv);
      recipeDetailsDiv.appendChild(buttonDiv);
      recipeDetailsDiv2.appendChild(recipeDetailsDiv);
      recipeDetailsDiv2.appendChild(recipeInfoDiv);
      section.appendChild(recipeName);
      section.appendChild(recipeRatingDiv);
      section.appendChild(descriptionDiv);
      section.appendChild(image);
      section.appendChild(recipeDetailsDiv2);

      card.appendChild(section);
      card.appendChild(reviewInfoDiv);

      button.addEventListener("click", () => {
        if (openSection && openSection !== section) {
          openSection.querySelector(".recipe-info").innerHTML = "";
          openSection.nextElementSibling.innerHTML = "";
          openSection.querySelector("button").classList.remove("open");
        }

        if (openSection === section) {
          recipeInfoDiv.innerHTML = "";
          // reviewInfoDiv.innerHTML = "";
          openSection = null;
          button.classList.remove("open");
        } else {
          recipeInfoDiv.innerHTML = "";
          // reviewInfoDiv.innerHTML = "";
          displayDetails(recipe, recipeInfoDiv);
          // displayReviews(recipe, reviewInfoDiv);
          openSection = section;
          button.classList.add("open");
        }
      });

      displayReviews(recipe, reviewInfoDiv);


      recipeIndex++;
    });
  }
};

const filterRecipes = (category) => {
  openSection = null;
  
  if (category === "all") {
    displayRecipes(allRecipes);
  } else {
    const filteredRecipes = {};
    filteredRecipes[category] = allRecipes[category] || [];
    displayRecipes(filteredRecipes);
  }
};

document.getElementById("all").addEventListener("click", () => {
  filterRecipes("all");
});

document.getElementById("main").addEventListener("click", () => {
  filterRecipes("mainDishes");
});

document.getElementById("desserts").addEventListener("click", () => {
  filterRecipes("desserts");
});

document.getElementById("snacks").addEventListener("click", () => {
  filterRecipes("snacks");
});

const displayDetails = (recipe, container) => {
  let knowMoreDiv = document.createElement("div");
  let ingredientsDiv = document.createElement("div");
  let directionsDiv = document.createElement("div");
  let ingredientsList = document.createElement("ul");
  let ingredientsH2 = document.createElement("h2");
  let directionsH2 = document.createElement("h2");

  ingredientsH2.textContent = "Ingredients:";
  directionsH2.textContent = "Directions:";
  ingredientsDiv.appendChild(ingredientsH2);
  directionsDiv.appendChild(directionsH2);

  knowMoreDiv.classList.add("know-more");
  ingredientsDiv.classList.add("ingredients");
  directionsDiv.classList.add("directions");

  recipe.ingredients.forEach((ingredient) => {
    let li = document.createElement("li");
    li.textContent = `${ingredient}`;
    ingredientsList.appendChild(li);
  });

  recipe.steps.forEach((step) => {
    let directions = document.createElement("p");
    directions.innerHTML = `<span class="step-number">${step[0]}.</span> <span class="step-text">${step[1]}</span>`;
    directionsDiv.appendChild(directions);
  });

  ingredientsDiv.appendChild(ingredientsList);
  knowMoreDiv.appendChild(ingredientsDiv);
  knowMoreDiv.appendChild(directionsDiv);

  container.appendChild(knowMoreDiv);
}

const displayReviews = (recipe, container) => {
  let reviewsDiv = document.createElement("div");
  let commentSectionDiv = document.createElement("section");
  let reviewCounter = document.createElement("h2");
  let reviewsH3 = document.createElement("h3");

  reviewCounter.textContent = `Reviews: (${recipe.reviews.length})`;
  reviewsH3.textContent = "Reviews:";
  commentSectionDiv.appendChild(reviewCounter);
  reviewsDiv.classList.add("reviews-container");

  recipe.reviews.forEach((review) => {
    let commentDiv = document.createElement("div");
    let commentAuthor = document.createElement("p");
    let commentRating = document.createElement("p");
    let commentDate = document.createElement("p");
    let comment = document.createElement("p");

    commentDiv.classList.add("comment");

    commentAuthor.textContent = review.name;
    commentRating.textContent = `Rating: ${review.commentRating}`;
    commentDate.textContent = `Date: ${formatDateToMMDDYYYY(review.date)}`;
    comment.textContent = `${review.comment}`;
    commentDiv.appendChild(commentAuthor);
    commentDiv.appendChild(commentRating);
    commentDiv.appendChild(commentDate);
    commentDiv.appendChild(comment);
    commentSectionDiv.appendChild(commentDiv);
  });

  reviewsDiv.appendChild(commentSectionDiv);
  container.appendChild(reviewsDiv);
}

function formatDateToMMDDYYYY(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function loadPopularSearches() {
  popularSearches.innerHTML = "";
  
  for (let i = 0; i < 3; i++) {
    randomRecipe(popularSearches);
  }
}

function loadTrendingRecipes() {
  trendingRecipes.innerHTML = "";

  for (const category in allRecipes) {
    randomRecipe(trendingRecipes, category);
  }
}

function randomRecipe(section, category = null) {
  let recipesArray;

  if (category) {
    recipesArray = allRecipes[category];
  } else {
    recipesArray = Object.values(allRecipes).flat();
  }

  if (!recipesArray || recipesArray.length === 0) return;

  const randomIndex = Math.floor(Math.random() * recipesArray.length);
  const randomRecipe = recipesArray[randomIndex];

  let p = document.createElement("p");
  p.innerHTML = randomRecipe.name;
  section.appendChild(p);
}

document.getElementById("search-bar").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchRecipe();
  }
});

function displayNoResultsMessage() {
  card.innerHTML = "<p class='no-results'>No results found. Please try a different search term.</p>";
}

function searchRecipe() {
  const searchInput = document.getElementById("search-bar").value.toLowerCase();

  if (searchInput) {
    saveSearchHistory(searchInput);
    loadSearchHistory();
  }

  const filteredRecipes = {};
  let hasResults = false;

  for (const category in allRecipes) {
    const matchingRecipes = allRecipes[category].filter(recipe => recipe.name.toLowerCase().includes(searchInput));

    if (matchingRecipes.length > 0) {
      filteredRecipes[category] = matchingRecipes;
      hasResults = true;
    }
  }
  
  if (hasResults) {
    displayRecipes(filteredRecipes);
  } else {
    displayNoResultsMessage();
  }
}

function saveSearchHistory(query) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  searchHistory.push(query);

  if (searchHistory.length > 5) {
    searchHistory.shift();
  }

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function loadSearchHistory() {
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  const historyContainer = document.querySelector(".history");

  historyContainer.innerHTML = "";

  if (searchHistory && searchHistory.length > 0) {
    searchHistory.forEach(query => {
      const p = document.createElement("p");
      p.textContent = query;
      historyContainer.appendChild(p);
    });
  } else {
    const message = document.createElement("p");
    message.textContent = "You haven't searched for any recipes yet!";
    historyContainer.appendChild(message);
  }
}

loadSearchHistory();

function applyFilterFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter");
  if (filter) {
    filterRecipes(filter);
  } else {
    displayRecipes(allRecipes);
  }
}