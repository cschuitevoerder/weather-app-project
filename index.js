function now() {
  let dateElement = document.querySelector("#date");
  let now = new Date();
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dateElement.innerHTML = `${day} ${hours}:${minutes}`;
}

now();

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#today-tempreture").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function lookupCity(event) {
  event.preventDefault();

  let city = document.querySelector("#enter-postcode").value;
  searchCity(city);
}

let postcodeForm = document.querySelector("#enter-location");
postcodeForm.addEventListener("submit", lookupCity);

function celChange(event) {
  event.preventDefault();
  let todTempCel = document.querySelector("#today-tempreture");
  todTempCel.innerHTML = "14";
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celChange);

function farChange(event) {
  event.preventDefault();
  let todTempFar = document.querySelector("#today-tempreture");
  todTempFar.innerHTML = "70";
}
let farenheighLink = document.querySelector("#farenheight");
farenheighLink.addEventListener("click", farChange);

searchCity("new york");
