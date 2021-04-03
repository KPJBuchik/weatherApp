
$(document).ready(function () {
    console.log("hello")
});



function currentWeather() {
    var input = document.getElementById('search').value

    console.log(input)
    var apiKey = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=385558a2e3a5c612b37f7a22119fe26d"
    $.getJSON(apiKey, function (json) {
        console.log(json);
        $("#results").html(json.main.temp)

    });
}

function futureWeather() {
    var input = document.getElementById('search').value

    console.log(input)
    var apiKey = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&APPID=385558a2e3a5c612b37f7a22119fe26d"
    $.getJSON(apiKey, function (json) {
        console.log(json);
        

    });
}



document.getElementById("submit").addEventListener("click", function () { currentWeather() })
document.getElementById("submit").addEventListener("click", function () { futureWeather() })
