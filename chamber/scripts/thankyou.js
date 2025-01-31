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
      result = decodeURIComponent(element.split("=")[1]).replace(/\+/g, " ");
    }
  })
  return(result);
}

const showInfo = document.querySelector("#thankyou");
showInfo.innerHTML = `
<p><strong>Thank you for your submission!</strong></p>
<p><strong>Name:</strong> ${show("firstName")} ${show("lastName")}</p>
<p><strong>Your Email:</strong> <a href="mailto:${show("email")}">${show("email")}</a></p>
<p><strong>Your Phone:</strong> ${show("phone")}</p>
<p><strong>Business Name:</strong> ${show("businessName")}</p>
<p><strong>Timestamp:</strong> ${show("timestamp")}</p>
`;