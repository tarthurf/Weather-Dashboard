// Creating variables
const apiKey = "c27ba2815803926d4006fd773d06f781";


let cityName = "san diego";

// let weatherIconCode;

// let UVindex;

let tempUnit = ["metric", "imperial"]
let tempUnitSelect = tempUnit[1]

let tempDisplay;
if (tempUnitSelect == "metric") {tempDisplay = " C"}
if (tempUnitSelect == "imperial") {tempDisplay = " F"}


// const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";


// Variables for API query calls
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

const fiveDayForecastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey;

// const uvIndexCurrentAPI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

// const uvIndexForecastAPI = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=5"


// Momentjs for calender date
const currentDay = moment().format("dddd");

const currentDate = moment().format("MMMM Do, YYYY");

$("#calender-day").text(currentDay);

$("#calender-date").text(currentDate);

// This function populates the current weather element
function displayCurrentWeather(weatherData) {
    $(".current-city").text(weatherData.name)
    $(".date").text(moment().format("MMMM Do YYYY"));
    $(".temperature").text("Temp: " + weatherData.main.temp + tempDisplay)
    $(".humidity").text("Humidity: " + weatherData.main.humidity + "%")
    $(".wind-speed").text("Wind: " + weatherData.wind.speed + " MPH")
}


// Ajax call for current uv index
function getUVindexCurrent(longitude, latitude) {
    lon = longitude;
    lat = latitude;
    $.get("http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon)
    .then(function(resUV) {
        console.log(resUV)
        const uvIndex = resUV.value
        $(".uv-index-span").remove()
        $(".uv-index").append($("<span>").addClass("uv-index-span"))
        if (uvIndex <= 5) {
            $(".uv-index-span").addClass("has-background-success")
        }
        else if (uvIndex > 5 && uvIndex <= 7) {
            $(".uv-index-span").addClass("has-background-warning")
        }
        else {
            $(".uv-index-span").addClass("has-background-danger")
        }
        $(".uv-index-span").text("UV Index: " + uvIndex)
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
    $(".forecast-weather").empty();
    for (let i = 0; i < x; i++) {
        const newWeatherEl = ($("<div>").attr("id", "weather-" + i).addClass("info"));
        $(".forecast-weather").append(newWeatherEl);

        const newCard = ($("<div>").addClass("card"));
        newWeatherEl.append(newCard);

        const newCardContent = ($("<div>").addClass("card-content"));
        newCard.append(newCardContent);
        
        const newMedia = ($("<div>").addClass("media"));
        newCard.prepend(newMedia);
        
        const newMediaLeft = ($("<div>").addClass("media-left"));
        newMedia.append(newMediaLeft);
        
        const newFigure = ($("<figure>").addClass("image is 64x64"));
        newMediaLeft.append(newFigure);
        
        const iconEl = ($("<img>").attr({id: "icon-" + i ,src: "#"}));
        newFigure.append(iconEl);
        
        const newMediaContent = ($("<div>").addClass("media-content"));
        newMediaLeft.append(newMediaContent);
        
        const dateEl = ($("<p>").attr("id","date-" + i).addClass("title is-4").text(moment().add(i + 1, "days").format("MMMM Do YYYY")));
        newMedia.append($("<br>")).append(dateEl);
        
        const newContent = ($("<div>").addClass("content"));
        newCardContent.append(newContent);
        
        const tempEl = ($("<p>").addClass("subtitle is-6").attr("id", "temp-humid-wind-" + i));
        newContent.append(tempEl);

        const uvEl = ($("<span>").addClass("subtitle is-6").attr("id", "uv-" + i));
        newContent.append(uvEl);
    }
}


function populateWeatherForecast(x) {
    for (let i = 0; i < x.length; i++) {
        $("#temp-humid-wind-" + i).text("Temp: " + x[i].main.temp + " | Humidity: " + x[i].main.humidity + " | Wind: " + x[i].wind.speed)
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
    for (let i = 0; i < fiveDays.length; i++) {
        const icon = "http://openweathermap.org/img/wn/" + fiveDays[i].weather[0].icon + "@2x.png"
        $("#icon-" + i).attr("src", icon)   
    }
    populateWeatherForecast(fiveDays)
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
            if (Number(uvForecastData[i]) <= 5) {
                $("#uv-" + i).addClass("has-background-success")
            }
            else if (Number(uvForecastData[i]) > 5 && Number(uvForecastData[i]) <= 7) {
                $("#uv-" + i).addClass("has-background-warning")
            }
            else {
                $("#uv-" + i).addClass("has-background-danger")
            }
            $("#uv-" + i).val(uvForecastData[i]).text("UV Index: " + uvForecastData[i])
        }
    });
}


// Function call for five day weather forecast
function getForecastWeatherAPI() {
    displayForecastWeather(5)
    $.get("http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + tempUnit[1] + "&APPID=" + apiKey)
    .then(function(res) {
        // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
        $(".city").text(res.city.name)
        lon = res.city.coord.lon;
        lat = res.city.coord.lat;
        console.log(res);
        getUVindexForecast(lon, lat)
        sortForecast(res)
    });
}
getForecastWeatherAPI()


// "2020-02-05 21:00:00"
// let savedCities;


    // TODO: add functionality to p tag clicks
    // $(".saved-cities").children().on("click", function() {
    // })

$(document).ready(function() {
    let savedCities;
    savedCities = JSON.parse(localStorage.getItem("Search History"))
    console.log(savedCities)
    const cityInput = $('.target-city');
    cityInput.bind('keydown',function(e){
        if(e.keyCode == 13) {
            function generateWeatherDashboard() {
                cityName = cityInput.val()
                if (cityName == "") return;
                cityName.trim()
                savedCities.unshift(cityName);
                localStorage.setItem("Search History", JSON.stringify(savedCities))
                getCurrentWeatherAPI();
                getForecastWeatherAPI();
                displayCities()
            } generateWeatherDashboard();
        }
    });

    function displayCities() {
        savedCityEl = $(".saved-cities")
        savedCityEl.empty();
        for (let i = 0; i < savedCities.length && i < 10; i++) {
            const city = $("<option>").val(savedCities[i]).text(savedCities[i])
            savedCityEl.append(city)
        }
    }
    displayCities()

    $("option").click(function(){
        cityName = $(this).val()
        getCurrentWeatherAPI();
        getForecastWeatherAPI()
    })
});    