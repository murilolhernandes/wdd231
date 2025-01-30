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

const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

document.querySelector("#np").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `NP Membership is for non profit organizations and there is no fee.`;
});

document.querySelector("#bronze").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `Bronze Membership is for small businesses and there is a $25 fee.`;
});

document.querySelector("#silver").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `Silver Membership is for medium businesses and there is a $50 fee.`;
});

document.querySelector("#gold").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `Gold Membership is for large businesses and there is a $100 fee.`;
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
})