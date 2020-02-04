// Creating variables

const apiKey = "c27ba2815803926d4006fd773d06f781";

let cityName = "San Diego";

let weatherIconCode;

let lat;

let lon;

let UVindex;

const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";

// Variables for API query calls
const currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

const fiveDayForcastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + apiKey;

// const uvIndexAPI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

// Moment for calender date
const currentDate = moment().format("dddd[,] MMMM Do YYYY");
console.log(currentDate);


function getAPI(api) {
    const queryURL = api
    $.get(queryURL).then(function(res) {
        if (res.coord) {
            lon = res.coord.lon;
            lat = res.coord.lat;
        }
        else if (res.city.coord) {
            lon = res.city.coord.lon;
            lat = res.city.coord.lat;
        }
        $.get("http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon).then(function(resUV) {
            UVindex = resUV.value;
        });
    });
}

getAPI(currentWeatherAPI);
getAPI(fiveDayForcastAPI);

$("#calender").text(currentDate);