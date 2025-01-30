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

const currentUrl = window.location.href;

const everything = currentUrl.split("?");

let formData = everything[1].split("&");

function show(cup) {
  formData.forEach((element) => {
    if (element.startsWith(cup)) {
      // result = element.split("=")[1].replace("%40", "@");
      result = decodeURIComponent(element.split("=")[1]).replace(/\+/g, " ");
    }
  })
  return(result);
}

const showInfo = document.querySelector("#thankyou");
showInfo.innerHTML = `
<p>Name: ${show("firstName")} ${show("lastName")}</p>
<p>Your Email: <a href="mailto:${show("email")}">${show("email")}</a></p>
<p>Your Phone: ${show("phone")}</p>
<p>Business Name: ${show("businessName")}</p>
<p>Timestamp: ${show("timestamp")}</p>
`;