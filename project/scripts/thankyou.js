import { initializeHeaderAndFooter } from "./header-and-footer-module.js";
initializeHeaderAndFooter();

const currentUrl = window.location.href;

const everything = currentUrl.split("?");

let formData = everything[1].split("&");

function show(cup) {
  let result = "";
  formData.forEach((element) => {
    if (element.startsWith(cup)) {
      result = decodeURIComponent(element.split("=")[1]).replace(/\+/g, " ");
    }
  });
  return(result);
}

const thankYouDiv = document.querySelector("#thankyou");
const cardDiv = document.createElement("div");
const section = document.createElement("section");
const timestamp = document.createElement("p");

timestamp.innerHTML = `<p class="timestamp">Timestamp: ${show("timestamp")}</p>`;
cardDiv.classList.add("cards");
section.id = "recipe";
section.classList.add("card-section");
section.innerHTML = `
<p class="thank-you">Thank you for your submission!</p>
<h2><span class="title">Your Recipe's Title:</span> ${show("title")}</h2>
<div class="description"><p><span class="title">Description:</span> ${show("description")}</p>
<p><span class="title">Name:</span> ${show("name")}</p></div>
<img src="${showImage()}" alt="${show("title")}" loading="lazy"> 
<div class="recipe-details2"><div class="recipe-details"><h3>Prep Time: <p>${show("prep-time")}</p></h3>
<div class="cook-time"><h3>Cook Time: <p>${show("cook-time")}</p></h3></div>
<div class="add-time"><h3>Additional Time: <p>${show("additional-time")}</p></h3></div>
<div class="total-time"><h3>Total Time: <p>${show("total-time")}</p></h3></div>
<div class="servings"><h3>Servings: <p>${show("serving")}</p></h3></div>
<div class="yield"><h3>Yield: <p>${show("yield")}</p></h3></div></div>
<div class="recipe-info"><div class="know-more"><div class="ingredients"><h2>Ingredients:</h2><ul>${getIngredients()}</ul></div>
<div class="directions"><h2>Directions:</h2>${getInstructions()}</div></div>
`;


cardDiv.appendChild(section);
cardDiv.appendChild(timestamp);
thankYouDiv.appendChild(cardDiv);

function showImage() {
  const uploadedImage = sessionStorage.getItem('uploadedImage');
  if (uploadedImage) {
    const src = uploadedImage;
    return src;
  }
}

function getIngredients() {
  const ingredientsList = show("ingredients").split("\n").map(ingredient => `<li>${ingredient.trim()}</li>`).join("");
  return ingredientsList;
}

function getInstructions() {
  const instructionsList = show("instructions").split("\n").map((instruction, index) => `<p><span class="step-number">Step ${index + 1}.</span> <span class="step-text">${instruction.trim()}</span></p>`).join("");
  return instructionsList;
}