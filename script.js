// Creating variables
const apiKey = "c27ba2815803926d4006fd773d06f781";

let cityName = "San Diego";

let weatherIconCode;

let UVindex;

let tempUnit = ["metric", "imperial"]

const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";


// Variables for API query calls
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

const fiveDayForecastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

// const uvIndexCurrentAPI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

// const uvIndexForecastAPI = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=5"


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
// TODO: 

// Ajax function for UV Index
function getUVindexForecast(longitude, latitude) {
    lon = longitude;
    lat = latitude;
    $.get("http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=5")
    .then(function(resUV) {
        console.log(resUV)
    });
}

function getUVindexCurrent(longitude, latitude) {
    lon = longitude;
    lat = latitude;
    $.get("http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon)
    .then(function(resUV) {
        console.log(resUV)
    });
}

// Function call for 
function getAPI(api) {
    $.get(api)
    .then(function(res) {
        if (res.coord) {
            lon = res.coord.lon;
            lat = res.coord.lat;
        }
        else if (res.city.coord) {
            lon = res.city.coord.lon;
            lat = res.city.coord.lat;
        }
        console.log(res);
        lat = lat;
        lon = lon;
        getUVindexCurrent(lon, lat)
    })
}
getAPI(fiveDayForecastAPI)


// Function sets current weather elements
// TODO: use this to sort the JSON object and make it manageable
function sortForcast(forecastData) {
    const fiveDays = [];
    for (let i = 0; i < forecastData.list.length; i++) {
        const forecastObject = forecastData.list[i].dt_txt	
        if (!forecastObject.startsWith(moment().format("yyyy-mm-dd")) && forecastObject.endsWith("12:00:00")) {
            fiveDays.push(forecastData.list[i]);
        }
    }
    console.log(fiveDays)
}


function buildCurrentWeather(weatherData) {
    // weatherIconCode = weatherData.weather[0].icon
    cityEl.text(weatherData.name)
    dateEl.text(currentDate)
    iconCode = weatherData.weather[0].icon
    console.log(weatherData.weather[0].icon)
    currentIconEl.attr("src", "http://openweathermap.org/img/wn/" + iconCode.toString() + "@2x.png")
    tempEl.text(weatherData.main.temp + "")
    humidityEl.text(weatherData.main.humidity)
    windEl.text(weatherData.wind.speed)
} // TODO: Fix weather icon and date, add UV index


// Function to build weather elements for forecast
function buildWeatherEl(res) {

    for (let i = 0; i < x; i++) {
        const newWeatherDiv = $("<div>")
        newWeatherDiv.addClass("weather" + i + " info");
        $(".weather").append(newWeatherDiv)
    }
}

// buildCurrentWeather();
// buildWeatherEl(5);
// buildFutureWeather();

// "2020-02-05 21:00:00"


$("#calender-day").text(currentDay);
$("#calender-date").text(currentDate);