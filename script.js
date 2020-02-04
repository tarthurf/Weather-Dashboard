// Creating variables

const apiKey = "c27ba2815803926d4006fd773d06f781";

let cityName = "San Diego";

let lat;

let lon;

const weatherIconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

let weatherIconCode;

// Variables for API query calls
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

const fiveDayForcastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + apiKey;

const uvIndexAPI = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

// Moment for calender date
const currentDate = moment().format("dddd[,] MMMM Do YYYY");
console.log(currentDate);


const weatherIconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"

function getAPI(api) {
    const queryURL = api
    $.get(queryURL).then(function(res) {
        console.log (res);
    });
}

getAPI(currentWeatherAPI);
getAPI(fiveDayForcastAPI);