// store location in localStorage

var usrInputLocation = [];
const locationSearchBtn = document.getElementById("searchBtn");

locationSearchBtn.addEventListener("click", storeLocation);

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

locationCoordinates();

// funtion to get weather for location
function getWeather() {
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");
  const WEATER_API_URL =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lng +
    "&appid=60b84b5105b51b98f35a8da6e5c9f174&units=imperial";
  fetch(WEATER_API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("cityName").html(localStorage.getItem("location"));
      const date = Date(data.current.dt);
      const newDate = date.toLocaleString("eng-US");
      $("#date").html(newDate);
      $("#temp").html(data.current.temp.toFixed() + "° F");
      $("#humidity").html(data.current.humidity.toFixed() + "%");
      $("#windSpeed").html(data.current.wind_speed.toFixed() + " mph");

      data.daily.forEach((value, i) => {
        if (i <= 4) {
          $("#dailyDate" + i).html(data.daily[i].dt);
          $("#dailyTemp" + i).html(data.daily[i].temp.day.toFixed() + "° F");
          $("#dailyWindSpeed" + i).html(
            data.daily[i].wind_speed.toFixed() + " mph"
          );
          $("#dailyHumidity" + i).html(data.daily[i].humidity.toFixed() + "%");
        }
      });
    })
    .catch((err) => console.error(err));
}

getWeather();
