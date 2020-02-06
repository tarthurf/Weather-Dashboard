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


// This function populates the current weather element
function displayCurrentWeather(weatherData) {
    $(".current-city").text(weatherData.name)
    $(".date").text(moment().format("MMMM Do YYYY"));
    $(".temperature").text(weatherData.main.temp + "")
    $(".humidity").text(weatherData.main.humidity)
    $(".wind-speed").text(weatherData.wind.speed)
}


// Ajax call for current uv index
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

// Ajax call for current weather
function getCurrentWeatherAPI() {
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey)
    .then(function(res) {
        lon = res.coord.lon;
        lat = res.coord.lat;
        // console.log(res);
        const icon = "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png"
        $(".current-weather-icon").attr("src", icon)
        // console.log(icon)
        // lat = lat;
        // lon = lon;
        getUVindexCurrent(lon, lat)
        displayCurrentWeather(res)
    });
}
getCurrentWeatherAPI()






// Function to build weather elements for forecast
function displayForecastWeather(x) {
    for (let i = 0; i < x; i++) {
        const newWeatherEl = ($("<div>").attr("id", "weather-" + i).addClass("info"));
        $(".weather").append(newWeatherEl);
        const cityDateEl = ($("<div>").attr("id", "city-date-" + i));
        newWeatherEl.append(cityDateEl)
        const cityEl = ($("<p>").addClass("city"));
        cityDateEl.append(cityEl);
        const dateEl = ($("<p>").attr("id","date-" + i).text(moment().add(i + 1, "days").format("MMMM Do YYYY")));
        cityDateEl.append($("<br>")).append(dateEl);
        const iconEl = ($("<img>").attr("src", "#"));
        newWeatherEl.append(iconEl);
        const tempEl = ($("<p>").attr("id", "temp-" + i));
        newWeatherEl.append(tempEl);
        const humidEl = ($("<p>").attr("id", "humid-" + i));
        newWeatherEl.append(humidEl);
        const windEl = ($("<p>").attr("id", "wind-" + i));
        newWeatherEl.append(windEl);
        const uvEl = ($("<p>").attr("id", "uv-" + i));
        newWeatherEl.append(uvEl);
        
    }
}


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


// Ajax function for UV Index forecast
function getUVindexForecast(longitude, latitude) {
    lon = longitude;
    lat = latitude;
    $.get("http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=4")
    .then(function(resUV) {
        const uvForecastData = []
        for (let i = 0; i < resUV.length; i++) {
            const uvData = resUV[i].value
            uvForecastData.push(uvData)
        }
        console.log(uvForecastData)
        // return uvForecastData;
        for (let i = 0; i < uvForecastData.length; i++) {
            $("#uv-" + i).text(uvForecastData[i])
        }
        });
}


// Function call for five day weather forecast
function getForecastWeatherAPI() {
    displayForecastWeather(5)
    $.get("http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey)
    .then(function(res) {
        lon = res.city.coord.lon;
        lat = res.city.coord.lat;
        console.log(res);
        getUVindexForecast(lon, lat)
        sortForecast(res)
    });
}
getForecastWeatherAPI()


// "2020-02-05 21:00:00"


$("#calender-day").text(currentDay);
$("#calender-date").text(currentDate);