// store location in localStorage

var usrInputLocation = [];
const locationSearchBtn = document.getElementById("searchBtn");
var lat = 40.71;
var lng = -74;

locationSearchBtn.addEventListener("click", searchWeather);

function storeLocation() {
  var usrInputLocation = document.getElementById("usrInput").value;
  localStorage.setItem("location", usrInputLocation);
}

// function to get geo-coordinates
function locationCoordinates() {
  var location = localStorage.getItem("location", usrInputLocation);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f3470bc32fmsh8e04ff8b809638ep1c03e3jsn7580dadb638c",
      "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
    },
  };

  fetch(
    "https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=" +
      location +
      "&language=en",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("lat", data.results[0].geometry.location.lat);
      localStorage.setItem("lng", data.results[0].geometry.location.lng);
    })
    .catch((err) => console.error(err));
}

// funtion to get weather for location
function getWeatherCurrent() {
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");
  const WEATHER_API_URL =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lng +
    "&appid=60b84b5105b51b98f35a8da6e5c9f174&units=imperial";
  fetch(WEATHER_API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("cityName").html(localStorage.getItem(location));
      const d1 = new Date(data.current.dt * 1000).toLocaleString("eng-US");
      $("#date").html(d1);
      $("#currentIcon").attr(
        "src",
        "http://openweathermap.org/img/wn/" +
          data.current.weather[0].icon +
          "@2x.png"
      );
      $("#temp").html(data.current.temp.toFixed() + "° F");
      $("#humidity").html(data.current.humidity.toFixed() + "%");
      $("#windSpeed").html(data.current.wind_speed.toFixed() + " mph");
    })
    .catch((err) => console.error(err));
}

var numOfDays = 4;

// function to get 5-day weather forecast
function getFiveDayWeather() {
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");
  const WEATHER_API_URL =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lng +
    "&appid=60b84b5105b51b98f35a8da6e5c9f174&units=imperial";
  fetch(WEATHER_API_URL)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i <= numOfDays; i++) {
        const d2 = new Date(data.daily[i].dt * 1000).toDateString();
        $("#dailyDate" + i).html(d2);
        $("#dailyWeatherIcon" + i).attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            "@2x.png"
        );
        $("#dailyTemp" + i).html(data.daily[i].temp.day.toFixed() + "° F");
        $("#dailyHumidity" + i).html(data.daily[i].humidity.toFixed() + "%");
        $("#dailyWindSpeed" + i).html(
          data.daily[i].wind_speed.toFixed() + " mph"
        );
      }
    })
    .catch((err) => console.error(err));
}

function renderDailyWeather() {
  for (var i = 0; i <= numOfDays; i++) {
    $("#fiveDayWeather").append(
      `<div class="card col-md-2">
            <div><span id="dailyDate${i}"></span></div>
            <img id="dailyWeatherIcon${i}">
            <div>Temp: <span id="dailyTemp${i}"></span></div>
            <div>Wind: <span id="dailyWindSpeed${i}"></span></div>
            <div>Humidity: <span id="dailyHumidity${i}"></span></div>
        </div>`
    );
  }
}

renderDailyWeather();

function searchWeather() {
  storeLocation();
  locationCoordinates();
  getWeatherCurrent();
  getFiveDayWeather();
}
