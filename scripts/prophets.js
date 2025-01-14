const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
  // console.table(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement("section");
    let fullName = document.createElement("h2");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let portrait = document.createElement("img");
    p1.textContent = `Date of Birth: ${prophet.birthdate}`;
    p2.textContent = `Place of Birth: ${prophet.birthplace}`;
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute("loading", "lazy")
    portrait.setAttribute("width", "340")
    portrait.setAttribute("height", "440");
    // Object.assign(portrait, {
    //   src: prophet.imageurl,
    //   alt: `Portrait of ${prophet.name} ${prophet.lastname}`,
    //   loading: "lazy",
    //   width: 300,
    //   height: 300
    // });
    card.appendChild(fullName)
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
}