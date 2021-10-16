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

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showDailyForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
  <div class="day">${formatDays(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="50"
                />
              <div class="forecast-temperature">
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}<span class="degrees-symbol-max">°</span>
                </span>
                <span class="forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}<span class="degrees-symbol-min">°</span>
                </span>
              </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "80f710d0fa6ebf8b91a4584a907a8eb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDailyForecast);
}
function showTemperature(response) {
  let weatherDescription = document.querySelector("#current-weather");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let currentTempMax = document.querySelector("#current-temp-max");
  currentTempMax.innerHTML = Math.round(response.data.main.temp_max);
  let currentTempMin = document.querySelector("#current-temp-max");
  currentTempMin.innerHTML = Math.round(response.data.main.temp_min);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "80f710d0fa6ebf8b91a4584a907a8eb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmitButton(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#input-city");
  searchCity(cityElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmitButton);

searchCity("Tokyo");
