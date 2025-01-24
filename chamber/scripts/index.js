const today = new Date();
document.getElementById("currentYear").innerHTML = `&copy; ${today.getFullYear()} Rexburg Chamber of Commerce`;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.getElementById("menu");
const navigation = document.querySelectorAll(".nav");
const header = document.querySelector("header");
// const header2 = document.querySelector(".idk");
const headerContainer = document.querySelector(".header-container");
const image = document.querySelector(".image");

hamButton.addEventListener("click", () => {
  navigation.forEach(nav => nav.classList.toggle("open"));
  hamButton.classList.toggle("open");
  header.classList.toggle("open");
  // header2.classList.toggle("open");
  headerContainer.classList.toggle("open");
  image.classList.toggle("close");
});

const businesses = "./data/members.json";
const directory = document.querySelector(".directory-container");

async function getDirectory() {
  const response = await fetch(businesses);
  const data = await response.json();
  displayDirectory(data.members);
  // console.table(data.members);
}

getDirectory();

const displayDirectory = (members) => {
  members.forEach((business) => {
    let card = document.createElement("section");
    let businessName = document.createElement("h2");
    let image = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let nav = document.createElement("nav");
    let a = document.createElement("a");
    let p3 = document.createElement("p");
    businessName.textContent = `${business.name}`;
    image.setAttribute("src", business.image);
    image.setAttribute("alt", `${business.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", business.width);
    image.setAttribute("height", business.height);
    p1.textContent = `${business.address}`;
    p2.textContent = `${business.phoneNumber}`;
    a.textContent = `${business.websiteURL}`;
    p3.textContent = `Membership Level: ${business.membershipLevel}`;
    a.setAttribute("href", `http://www.${business.websiteURL}`);
    nav.appendChild(a);
    card.appendChild(businessName);
    card.appendChild(image);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(nav);
    card.appendChild(p3);
    directory.appendChild(card);
  });
}

const grid = document.querySelector("#grid");
const list = document.querySelector("#list");
const mediaQuery = window.matchMedia("(min-width: 600px)");

window.addEventListener("resize", handleEvent);
handleEvent();

function handleEvent() {
  grid.classList.toggle("active", mediaQuery.matches);
  list.classList.toggle("active", !mediaQuery.matches);
  directory.className = grid.classList.contains("active") ? "directory-container grid" : "directory-container list";

  if (mediaQuery.matches) {
    [grid, list].forEach(button => {
      button.addEventListener("click", () => {
        [grid, list].forEach(element => {
          element.classList.toggle("active", element === button);
          directory.classList.toggle(element.id, element === button);
        });
      });
    });
  }
}
