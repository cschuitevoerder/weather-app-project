function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}: ${hours}: ${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response);

  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let temperatureElement = document.querySelector("#today-tempreture");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let windSpeedElement = document.querySelector("#windSpeed");

  celsiusTemperature = response.data.temperature.current;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "b7ft5f752043d3f03c584f3o225b20a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let icon = axios.get(apiUrl).then(displayWeatherCondition);
}

function lookupCity(event) {
  event.preventDefault();

  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let postcodeForm = document.querySelector("#enter-location");
postcodeForm.addEventListener("submit", lookupCity);

function lookupDescription(description) {}

let description = document.querySelector("#description");
lookupDescription(description);

function farChange(event) {
  event.preventDefault();
  let currentTempretureDisplayed = document.querySelector("#today-tempreture");
  celsiusLink.classList.remove("active");
  farenheightLink.classList.add("active");
  let todayTemp = (celsiusTemperature * 9) / 5 + 32;
  currentTempretureDisplayed.innerHTML = Math.round(todayTemp);
}

function celsiusChange(event) {
  event.preventDefault();
  let currentTempretureDisplayed = document.querySelector("#today-tempreture");
  celsiusLink.classList.add("active");
  farenheightLink.classList.remove("active");

  currentTempretureDisplayed.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheightLink = document.querySelector("#farenheight");
farenheightLink.addEventListener("click", farChange);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusChange);

searchCity("new york");
