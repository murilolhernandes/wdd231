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
    let container = document.createElement("div");
    let card = document.createElement("div");
    let photograph = document.createElement("div");
    let name = document.createElement("div");
    let description = document.createElement("div");
    let location = document.createElement("div");
    let figure = document.createElement("figure");
    let image = document.createElement("img");
    let caption = document.createElement("figcaption");
    let h3 = document.createElement("h3");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let learnMore = document.createElement("button");
    learnMore.classList.add("learn-more");
    learnMore.textContent = "Learn More";
    p1.classList.add("description");
    p2.classList.add("location");
    card.classList.add("card");
    photograph.classList.add("photograph");
    name.classList.add("name");
    description.classList.add("description");
    location.classList.add("location");
    container.classList.add("container");

    h3.textContent = `${place.name}`;
    image.setAttribute("src", place.image);
    image.setAttribute("alt", place.name);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", place.width);
    image.setAttribute("height", place.height);
    caption.textContent = `${place.name}`;
    p1.textContent = `${place.description}`;
    p2.textContent = `${place.address}`;

    name.appendChild(h3);
    figure.appendChild(image);
    figure.appendChild(caption);
    photograph.appendChild(figure);
    description.appendChild(p1);
    location.appendChild(p2);
    card.appendChild(photograph);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(location);
    card.appendChild(learnMore);
    container.appendChild(card);
    displayDiv.appendChild(container);
  });
}

// function setTestDate(daysAgo) {
//   const testDate = new Date();
//   testDate.setDate(testDate.getDate() - daysAgo);
//   localStorage.setItem("lastVisit", testDate);
// }

// setTestDate(5);

const overlay = document.querySelector("#overlay");
const closeBtn = document.querySelector("#close-btn");
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
  const lastVisitDate = new Date(lastVisit);
  const timeDiff = today - lastVisitDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    visitMessage.innerHTML = `<strong>Back so soon! Awesome!</strong>`;
  } else if (daysDiff === 1) {
    visitMessage.innerHTML = `<strong>Welcome back! You last visited ${daysDiff} day ago.</strong>`;
  } else {
    visitMessage.innerHTML = `<strong>Welcome back! You last visited ${daysDiff} days ago.</strong>`;
  }
} else {
  visitMessage.innerHTML = `<strong>Welcome! Let us know if you have any questions.</strong>`;
}

localStorage.setItem("lastVisit", today);

overlay.style.visibility = "visible";
overlay.style.opacity = "1";

closeBtn.addEventListener("click", () => {
  overlay.style.visibility = "hidden";
  overlay.style.opacity = "0";
});