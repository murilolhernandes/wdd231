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
const submitButton = document.querySelector("input[type=submit]");
const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toLocaleString();

document.querySelector("#np").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>NP Membership</h2>
  <p>NP Membership is for non profit organizations and there is no fee.</p>
  <p>The benefits of a NP Membership are:</p>
  <ul>
    <li><strong>Premium Exposure:</strong> Access to a network of local non-profit organizations for collaboration and support.</li>
    <li><strong>Marketing Opportunities:</strong> Opportunities to partner with local businesses for community events and initiatives.</li>
    <li><strong>Business Development:</strong> Highlighted as a community-focused organization in chamber publications and events.</li>
    <li><strong>Advocacy:</strong> Access to resources that support non-profit growth and management training sessions.</li>
  </ul>
  `;
});

document.querySelector("#bronze").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>Bronze Membership</h2>
  <p>Bronze Membership is for small businesses and there is a $25 fee.</p>
  <p>The benefits of a Bronze Membership are:</p>
  <ul>
    <li><strong>Business Exposure:</strong> Listing in the chamber's business directory, both online and in print.</li>
    <li><strong>Discounts:</strong> Access to exclusive discounts from fellow chamber members.</li>
    <li><strong>Workshops and Seminars:</strong> Invitations to educational events tailored for small businesses.</li>
    <li><strong>Networking Events:</strong> Access to monthly networking events to connect with other small business owners.</li>
  </ul>
  `;
});

document.querySelector("#silver").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>Silver Membership</h2>
  <p>Silver Membership is for medium businesses and there is a $50 fee.</p>
  <p>The benefits of a Silver Membership are:</p>
  <ul>
    <li><strong>Premium Exposure:</strong> Featured listing in the chamber's directory and promotional materials.</li>
    <li><strong>Marketing Opportunities:</strong> Opportunities to sponsor events and increase brand visibility.</li>
    <li><strong>Business Development:</strong> Access to resources like business development workshops and mentoring.</li>
    <li><strong>Advocacy:</strong> Representation in local government advocacy efforts on issues affecting medium businesses.</li>
  </ul>
  `;
});

document.querySelector("#gold").addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h2>Gold Membership</h2>
  <p>Gold Membership is for large businesses and there is a $100 fee.</p>
  <p>The benefits of a Gold Membership are:</p>
  <ul>
    <li><strong>Premium Exposure:</strong> Priority placement in chamber publications and promotional efforts.</li>
    <li><strong>Leadership Roles:</strong> Opportunities to take on leadership roles within the chamber.</li>
    <li><strong>Customized Networking:</strong> Invitations to exclusive, high-profile networking events for industry leaders.</li>
    <li><strong>Tailored Support:</strong> Personalized business support services, including strategic planning and growth consultations.</li>
    <li><strong>Community Influence:</strong> Additional opportunities to influence community and economic development initiatives.</li>
  </ul>
  `;
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
})
