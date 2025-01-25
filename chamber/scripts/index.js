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

function getHighLowTemperatures(forecastList) {
  const now = new Date();
  const day1 = new Date(now);
  const day2 = new Date(now);
  const day3 = new Date(now);

  day1.setDate(day1.getDate() + 1);
  day2.setDate(day2.getDate() + 2);
  day3.setDate(day3.getDate() + 3);

  const extractDay = (timestamp) => new Date(timestamp * 1000).toISOString().slice(0, 10);

  const tempsDay1 = [];
  const tempsDay2 = [];
  const tempsDay3 = [];

  forecastList.forEach(forecast => {
    const forecastDay = extractDay(forecast.dt);
    const day1Day = extractDay(Math.floor(day1.getTime() / 1000));
    const day2Day = extractDay(Math.floor(day2.getTime() / 1000));
    const day3Day = extractDay(Math.floor(day3.getTime() / 1000));

    if (forecastDay === day1Day) {
      tempsDay1.push(forecast.main.temp);
    }
    if (forecastDay === day2Day) {
      tempsDay2.push(forecast.main.temp);
    }
    if (forecastDay === day3Day) {
      tempsDay3.push(forecast.main.temp);
    }
  });

  const getHighLow = temps => ({
    high: Math.max(...temps),
    low: Math.min(...temps)
  });

  const highLowDay1 = getHighLow(tempsDay1);
  const highLowDay2 = getHighLow(tempsDay2);
  const highLowDay3 = getHighLow(tempsDay3);

  return {
    day1: highLowDay1,
    day2: highLowDay2,
    day3: highLowDay3
  };
}

function formatTemperature(temp) {
  return temp.toFixed(0);
}

function getDayName(date) {
  const options = { weekday: 'long' };
  return date.toLocaleDateString(undefined, options);
}

const temp = document.querySelector(".current-temp");
const weatherImage = document.querySelector(".figure");
// const caption = document.querySelector("figcaption");
const high = document.querySelector(".high");
const low = document.querySelector(".low");
const humidity = document.querySelector(".humidity");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const nextDay = document.querySelector(".next-day");
const dayAfter = document.querySelector(".day-after");
const dayAfterTheDay = document.querySelector(".day-after-the-day");

const currentURL = "https://api.openweathermap.org/data/2.5/weather?lat=43.82&lon=-111.79&units=imperial&appid=58e0b905d82a56181eb33bb10ec51950"
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=43.82&lon=-111.79&units=imperial&appid=a7b159a2676ffa93f64b6282f5510818"

async function apiFetchCurrent() {
  try {
    const response = await fetch(currentURL);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      displayCurrentResults(data);
    }
    else {
      throw Error(await response.text());
    }
  }
  catch (error) {
    console.log(error);
  }
}

async function apiFetchForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) {
      throw Error(await response.text());
    }
    const data = await response.json();
    // console.log(data);
    return data;
  }
  catch (error) {
    console.log(error);
  }
}

apiFetchCurrent();

function displayCurrentResults(data) {
  temp.innerHTML = `<strong>${data.main.temp}&deg;F</strong>`;
  const img = document.createElement("img");
  img.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
  img.setAttribute("loading", "lazy");
  img.setAttribute("width", "50");
  img.setAttribute("height", "50");
  let description = data.weather[0].description;
  img.alt = `${description}`;
  const caption = document.createElement("figcaption");
  caption.textContent = `${description}`;
  img.appendChild(caption);
  weatherImage.appendChild(img);
  high.innerHTML = `<strong>High:</strong> ${data.main.temp_max}&deg;F`;
  low.innerHTML = `<strong>Low:</strong> ${data.main.temp_min}&deg;F`;
  humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
  const sysData = {
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset
  }
  const sunriseTime = convertUnixToReadable(sysData.sunrise);
  const sunsetTime = convertUnixToReadable(sysData.sunset);
  sunrise.innerHTML = `<strong>Sunrise:</strong> ${sunriseTime}`;
  sunset.innerHTML = `<strong>Sunset:</strong> ${sunsetTime}`;
}

function convertUnixToReadable(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
  return date.toLocaleString(undefined, options);
}

apiFetchForecast().then(forecastData => {
  if (forecastData) {
    const highLowTemps = getHighLowTemperatures(forecastData.list);

    const nextDayName = getDayName(new Date(new Date().setDate(new Date().getDate() + 1)));
    const dayAfterName = getDayName(new Date(new Date().setDate(new Date().getDate() + 2)));
    const dayAfterTheDayName = getDayName(new Date(new Date().setDate(new Date().getDate() + 3)));

    nextDay.innerHTML = `<strong>${nextDayName}:</strong> ${formatTemperature(highLowTemps.day1.high)}&deg;F/${formatTemperature(highLowTemps.day1.low)}&deg;F`;
    dayAfter.innerHTML = `<strong>${dayAfterName}:</strong> ${formatTemperature(highLowTemps.day2.high)}&deg;F/${formatTemperature(highLowTemps.day2.low)}&deg;F`;
    dayAfterTheDay.innerHTML = `<strong>${dayAfterTheDayName}:</strong> ${formatTemperature(highLowTemps.day3.high)}&deg;F/${formatTemperature(highLowTemps.day3.low)}&deg;F`;
  }
});