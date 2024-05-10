function getWeather() {
  const apiKey = `19d3f5595836403acebfd530327fd3a8`;
  const city = document.querySelector("#city").value;
  if (!city) {
    alert("Please Enter a City");
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((res) => res.json())
    .then((data) => displayWeather(data))
    .catch((err) => {
      console.log("error fetching current weather", err);
    });
  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => displayHourlyForecast(data.list))
    .catch((err) => {
      console.log("error fetching hourlyForecast", err);
      alert("error fetching hourly Forecast,Please try again.");
    });
}
function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherDivInfo = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("WeatherIcon");
  const hourForecast = document.getElementById("hourly-forecast");

  weatherDivInfo.innerHTML = "";
  tempDivInfo.innerHTML = "";
  hourForecast.innerHTML = "";

  if (data.cod === "404")
    weatherDivInfo.innerHTML = `<p>${(data, message)}</p>`;
  else {
    const cityName = data.name;
    const temp = Math.round(data.main.temp - 273.15);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const tempHtml = `<p>${cityName}C</p>`;

    const temperatureHTML = `
<p>${temp}°C</p>
`;

    const weatherHtml = `
<p>${cityName}</p>
<p>${desc}</p>
`;
    tempDivInfo.innerHTML = temperatureHTML;
    weatherDivInfo.innerHTML = weatherHtml;

    weatherIcon.src = iconUrl;

    weatherIcon.alt = desc;

    showImage();
  }
}
function displayHourlyForecast(data) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  const next24Hours = data.slice(0, 8);

  next24Hours.map((item) => {
   
    const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
    const hour = dateTime.getHours();

    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const hourlyItemHtml = `
<div class="hourly-item">
<span class="">${hour}:00</span>
<img src="${iconUrl}" alt="Hourly Weather Icon">
<span>${temperature}°C</span>
</div>
`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("WeatherIcon");
  weatherIcon.style.display = "block"; // Make the image visible once it's loaded
}
