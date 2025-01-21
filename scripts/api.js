const temp = document.querySelector("#current-temp");
const image = document.querySelector("#weather-icon");
const caption = document.querySelector("figcaption");

const URL = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=58e0b905d82a56181eb33bb10ec51950"

async function apiFetch() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      displayResults(data);
    }
    else {
      throw Error(await response.text());
    }
  }
  catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  temp.innerHTML = `${data.main.temp}&deg;F`;
  image.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  image.setAttribute("loading", "lazy");
  image.setAttribute("width", "50");
  image.setAttribute("height", "50");
  let description = data.weather[0].description;
  image.alt = `${description}`;
  caption.textContent = `${description}`;
}