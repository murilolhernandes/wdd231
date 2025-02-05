const today = new Date();
document.getElementById("currentYear").innerHTML = `&copy; ${today.getFullYear()} Rexburg Chamber of Commerce`;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.getElementById("menu");
const navigation = document.querySelectorAll(".nav");
const header = document.querySelector("header");
const headerContainer = document.querySelector(".header-container");
const image = document.querySelector(".image");

hamButton.addEventListener("click", () => {
  navigation.forEach(nav => nav.classList.toggle("open"));
  hamButton.classList.toggle("open");
  header.classList.toggle("open");
  headerContainer.classList.toggle("open");
  image.classList.toggle("close");
});

const displayDiv = document.querySelector("#places-of-interest");
const places = "./data/discover.json";

async function getPlaces() {
  const response = await fetch(places);
  const data = await response.json();
  displayPlaces(data.itemsOfInterest);
  // console.log(data.itemsOfInterest);
}

getPlaces();

const displayPlaces = (itemsOfInterest) => {
  itemsOfInterest.forEach((place) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let figure = document.createElement("figure");
    let image = document.createElement("img");
    let caption = document.createElement("figcaption");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    // let p3 = document.createElement("p");

    name.textContent = `${place.name}`;
    image.setAttribute("src", place.image);
    image.setAttribute("alt", place.name);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", place.width);
    image.setAttribute("height", place.height);
    caption.textContent = `${place.name}`;
    p1.textContent = `${place.description}`;
    p2.textContent = `${place.address}`;

    card.appendChild(name);
    figure.appendChild(image);
    figure.appendChild(caption);
    card.appendChild(figure);
    card.appendChild(p1);
    card.appendChild(p2);
    displayDiv.appendChild(card);
  });
}