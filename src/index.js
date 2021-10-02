function updatedDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
let currentTime = new Date();
let dateElement = document.querySelector("#day-and-time");

dateElement.innerHTML = updatedDay(currentTime);

function showTemperature(response) {
  console.log(response.data);
  let currentWeather = document.querySelector(".current-weather");
  currentWeather.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  let apiKey = "80f710d0fa6ebf8b91a4584a907a8eb6";
  let units = "metric";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function currentWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector(".current-temperature");
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);

  cityElement.innerHTML = `${cityName}`;
  temperatureElement.innerHTML = `${temp}`;
}

function showForecast(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "80f710d0fa6ebf8b91a4584a907a8eb6";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showForecast);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector(".current-temperature");
  celsiusTemperature.innerHTML = 21;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector(".current-temperature");
  fahrenheitTemperature.innerHTML = 69.8;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheit);
