// Creating variables
const apiKey = "c27ba2815803926d4006fd773d06f781";

let cityName = "San Diego";

let weatherIconCode;

let lat;

let lon;

let UVindex;

let tempUnit = ["metric", "imperial"]

const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";


// Variables for API query calls
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

const fiveDayForecastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

const uvIndexCurrentAPI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

const uvIndexForecastAPI = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=5"


// Moment for calender date
const currentDay = moment().format("dddd");

const currentDate = moment().format("MMMM Do YYYY");


// declaring html elements
const currentWeatherEl = $(".current-weather")
const cityEl = $(".current-city")
const dateEl = $(".date")
const currentIconEl = $(".current-weather-icon")
const tempEl = $(".temperature")
const humidityEl = $(".humidity")
const windEl = $(".wind-speed")
const uvIndexEl = $(".uv-index")


// Ajax function for UV Index
async function getUVindex(api) {
    await $.get(api)
    .then(function(resUV) {
        sessionStorage.setItem("uvData", JSON.stringify(resUV));
    });
}


// Function call for 
async function getAPI(api) {
    const queryURL = api
    await $.get(queryURL)
    .then(function(res) {
        sessionStorage.setItem("weatherData", JSON.stringify(res));
    })
    // getUVindex()
}


// Function sets current weather elements
function buildCurrentWeather() {
    getAPI(currentWeatherAPI, uvIndexCurrentAPI);
    weatherData = JSON.parse(sessionStorage.getItem("weatherData"));
    // UVindex = JSON.parse(sessionStorage.getItem("uvData"));
    weatherIconCode = weatherData.weather[0].icon
    console.log(`Weather Icon Code: ${weatherIconCode}`)
    console.log(`Weather Icon Url: ${weatherIconUrl}`)
    console.log(weatherData);
    // console.log(UVindex);
    cityEl.text(weatherData.name)
    dateEl.text(currentDate)
    currentIconEl.attr("src", weatherIconUrl)
    tempEl.text(weatherData.main.temp + "")
    humidityEl.text(weatherData.main.humidity)
    windEl.text(weatherData.wind.speed)
    // currentWeatherEl
} // TODO: Fix weather icon and date, add UV index


// Function to build weather elements for forecast
function buildWeatherEl(x) {
    for (let i = 0; i < x; i++) {
        const newWeatherDiv = $("<div>")
        newWeatherDiv.addClass("weather" + i + " info");
        $(".weather").append(newWeatherDiv)
    }
}

const forecastDays = [4, 12, 20, 28, 36]

function buildFutureWeather() {
    getAPI(fiveDayForecastAPI)
    weatherData = JSON.parse(sessionStorage.getItem("weatherData"));
    console.log(weatherData)
    console.log(weatherData.list[4])
    console.log(weatherData.list[12])
    console.log(weatherData.list[20])
    console.log(weatherData.list[28])
    console.log(weatherData.list[36])
}


// buildCurrentWeather();
// buildWeatherEl(5);
buildFutureWeather();

// "2020-02-05 21:00:00"

$("#calender-day").text(currentDay);
$("#calender-date").text(currentDate);