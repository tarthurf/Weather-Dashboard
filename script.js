// Creating variables
const apiKey = "c27ba2815803926d4006fd773d06f781";

let cityName = "San Diego";

// let weatherIconCode;

// let UVindex;

let tempUnit = ["metric", "imperial"]

// const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";


// Variables for API query calls
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

const fiveDayForecastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

// const uvIndexCurrentAPI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

// const uvIndexForecastAPI = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=5"


// Moment for calender date
const currentDay = moment().format("dddd");

const currentDate = moment().format("MMMM Do, YYYY");


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
        const uvIndex = resUV.value
        $(".uv-index").text(uvIndex)
        return uvIndex
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
        const icon = "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png"
        $(".current-weather-icon").attr("src", icon)
        console.log(icon)
        lat = lat;
        lon = lon;
        getUVindexCurrent(lon, lat)
        buildCurrentWeather(res)
    })
}
getAPI(currentWeatherAPI)


// Function sorts five day forecast and retrieves the object of each day at 12:00 only
function sortForecast(forecastData) {
    const fiveDays = [];
    for (let i = 0; i < forecastData.list.length; i++) {
        const forecastObject = forecastData.list[i].dt_txt	
        if (!forecastObject.startsWith(moment().format("yyyy-mm-dd")) && forecastObject.endsWith("12:00:00")) {
            fiveDays.push(forecastData.list[i]);
        }
    }
    console.log(fiveDays)
    return fiveDays
}


function buildCurrentWeather(weatherData) {
    $(".current-city").text(weatherData.name)
    $(".date").text(moment().format("MMMM Do YYYY"));
    $(".temperature").text(weatherData.main.temp + "")
    $(".humidity").text(weatherData.main.humidity)
    $(".wind-speed").text(weatherData.wind.speed)
}


// Function to build weather elements for forecast
function buildWeatherEl(x) {
        for (let i = 0; i < x.length; i++) {
            const newWeatherDiv = $("<div>")
            newWeatherDiv.addClass("weather" + i + " info");
            $(".weather").append(newWeatherDiv)
            const 
        }
}


// "2020-02-05 21:00:00"


$("#calender-day").text(currentDay);
$("#calender-date").text(currentDate);