export function initializeHeaderAndFooter() {
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
}