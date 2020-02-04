// Creating variables

const apiKey = "c27ba2815803926d4006fd773d06f781";

let cityName = "San Diego";

const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

const fiveDayForcastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + apiKey;

const currentDate = moment().format("dddd[,] MMMM Do YYYY")
console.log(currentDate)

let iconCode;

const weatherIconLink = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"

function getAPI(api) {
    const queryURL = api
    $.get(queryURL).then(function(res) {
        console.log (res);
    });
}

getAPI(currentWeatherAPI)
getAPI(fiveDayForcastAPI)