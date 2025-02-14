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

const filterButtons = document.querySelector(".filters");

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

async function getRecipes() {
  const response = await fetch(recipes);
  const data = await response.json();
  // console.log(data);
  displayRecipes(data.recipes);
}

getRecipes();

const displayRecipes = (recipes) => {
  let recipeIndex = 0;

  for (const category in recipes) {
    recipes[category].forEach((recipe) => {
      let section = document.createElement("section");
      section.id = `recipe-${recipeIndex}`;

      let recipeName = document.createElement("h2");
      let image = document.createElement("img");
      let description = document.createElement("p");
      let recipeRating = document.createElement("p");
      let recipeDetailsDiv = document.createElement("div");

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
      image.setAttribute("src", recipe.imgURL);
      image.setAttribute("alt", `${recipe.name} recipe image`);
      image.setAttribute("loading", "lazy");
      image.setAttribute("width", recipe.width);
      image.setAttribute("height", recipe.height);
      description.textContent = `${recipe.description}`;
      recipeRating.textContent = `Rating: ${recipe.recipeRating}`;
      prepTime.textContent = `Prep Time: ${recipe.prepTime}`;
      cookTime.textContent = `Cook Time: ${recipe.cookTime}`;
      addTime.textContent = `Additional Time: ${recipe.additionalTime || 'N/A'}`;
      totalTime.textContent = `Total Time: ${recipe.totalTime}`;
      servings.textContent = `Servings: ${recipe.serving}`;
      yield.textContent = `Yield: ${recipe.yield || 'N/A'}`;
      button.textContent = "View Recipe";

      section.classList.add("card-section");
      recipeDetailsDiv.classList.add("recipe-details");
      prepTimeDiv.classList.add("prep-time");
      cookTimeDiv.classList.add("cook-time");
      addTimeDiv.classList.add("add-time");
      addTimeDiv.classList.add("add-time");
      totalTimeDiv.classList.add("total-time");
      servingsDiv.classList.add("servings");
      yieldDiv.classList.add("yield");
      buttonDiv.classList.add("button-div");
      button.classList.add("button");
      recipeInfoDiv.classList.add("recipe-info");
      reviewInfoDiv.classList.add("review-info");

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
      recipeDetailsDiv.appendChild(recipeInfoDiv);
      section.appendChild(recipeName);
      section.appendChild(image);
      section.appendChild(description);
      section.appendChild(recipeRating);
      section.appendChild(recipeDetailsDiv);

      card.appendChild(section);
      card.appendChild(reviewInfoDiv);

      
      button.addEventListener("click", () => {
        if (recipeInfoDiv && reviewInfoDiv) {
          recipeInfoDiv.innerHTML = "";
          reviewInfoDiv.innerHTML = "";

          displayDetails(recipe, recipeInfoDiv);
          displayReviews(recipe, reviewInfoDiv);
        }
      });

      recipeIndex++;
    });
  }
};

const displayDetails = (recipe, container) => {
  // console.log(`Displaying details for: ${recipe.name}`);

  let knowMoreDiv = document.createElement("div");
  let ingredientsDiv = document.createElement("div");
  let directionsDiv = document.createElement("div");
  let ingredientsList = document.createElement("ul");

  recipe.ingredients.forEach((ingredient) => {
    let li = document.createElement("li");
    li.textContent = `${ingredient}`;
    ingredientsList.appendChild(li);
  });

  recipe.steps.forEach((step) => {
    let directions = document.createElement("p");
    directions.textContent = `${step[0]}. ${step[1]}`;
    directionsDiv.appendChild(directions);
  });

  ingredientsDiv.appendChild(ingredientsList);
  knowMoreDiv.appendChild(ingredientsDiv);
  knowMoreDiv.appendChild(directionsDiv);

  container.appendChild(knowMoreDiv);
}

const displayReviews = (recipe, container) => {
  // console.log(`Displaying reviews for: ${recipe.name}`);

  let commentSectionDiv = document.createElement("section");
  let reviewCounter = document.createElement("h2");

  reviewCounter.textContent = `Reviews: (${recipe.reviews.length})`;
  commentSectionDiv.appendChild(reviewCounter);


  recipe.reviews.forEach((review) => {
    let commentDiv = document.createElement("div");
    let commentAuthor = document.createElement("p");
    let commentRating = document.createElement("p");
    let commentDate = document.createElement("p");
    let comment = document.createElement("p");

    commentAuthor.textContent = review.name;
    commentRating.textContent = `Rating: ${review.commentRating}`;
    commentDate.textContent = `Date: ${review.date}`;
    comment.textContent = `${review.comment}`;
    commentDiv.appendChild(commentAuthor);
    commentDiv.appendChild(commentRating);
    commentDiv.appendChild(commentDate);
    commentDiv.appendChild(comment);
    commentDiv.classList.add("comment");
    commentSectionDiv.appendChild(commentDiv);
  });

  container.appendChild(commentSectionDiv);
}

function clearButtons() {
  buttons = webCourses.querySelectorAll("button");
  buttons.forEach(button => {
    button.remove();
  })
}

document.getElementById("all").addEventListener("click", () => {
  clearButtons();
  createCourseList(courses);
});

document.getElementById("main").addEventListener("click", () => {
  const main = courses.filter(course => {
    return course.subject.includes("mainDishes");
  });
  clearButtons();
  createCourseList(main);
});

document.getElementById("desserts").addEventListener("click", () => {
  const desserts = courses.filter(course => {
    return course.subject.includes("desserts");
  });
  clearButtons();
  createCourseList(desserts);
});

document.getElementById("snacks").addEventListener("click", () => {
  const snacks = courses.filter(course => {
    return course.subject.includes("snacks");
  });
  clearButtons();
  createCourseList(snacks);
});