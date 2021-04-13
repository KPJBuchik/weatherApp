
// window.onload = function() {
//    futureWeather()
//   };
var input = document.getElementById('input').value;

let forecastHighArray = []
let forecastLowArray = []
let dayNameArray = []
let forecastConditionArray = []
var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'

];

// function currentWeather() {
//     var input = document.getElementById('input').value;

//     var apiKey = "http://api.openweathermap.org/data/2.5/weather?q=phoenix&units=imperial&APPID="+myKey

//     $.getJSON(apiKey, function (json) {
//         let currentTime = Date.now();
//         let kelvin = json.main.temp;
//         kelvin = parseFloat(kelvin);
//         let farenheit = ((kelvin - 273.15) * 1.8) + 32;
//         let displayTemp = Math.ceil(kelvin);
//         let unixSunset = json.sys.sunset;
//         let unixSunrise = json.sys.sunrise;
//         let timezone = json.timezone
//         let sunset = Unix_timestamp(unixSunset);
//         let sunrise = Unix_timestamp(unixSunrise);

//         let displaySunset = toStandardTime(sunset);
//         let displaySunrise = toStandardTime(sunrise);
//         let windSpeed = Math.ceil(json.wind.speed);
//         let highTemp = Math.ceil(json.main.temp_max);
//         let lowTemp = Math.ceil(json.main.temp_min);
//         let currentUnix = Unix_timestamp(currentTime);
//         let currentStandard = toStandardTime(currentUnix);


//         let sunriseTimezone = (new Date(unixSunrise * 1000 + (timezone * 1000))); // minus 
//         let sunsetTimezone = (new Date(unixSunset * 1000 + (timezone * 1000))); // plus
//         sunriseTimezone = String(sunriseTimezone)
//         sunriseTimezone = sunriseTimezone.slice(0, -34);
//         sunriseTimezone = sunriseTimezone.slice(16);
//         let displaySunriseTimezone = toStandardTime(sunriseTimezone)

//         $("#temp").html(displayTemp + "˚");
//         document.getElementById('city').innerHTML = json.name
//         document.getElementById('conditions').innerHTML = json.weather[0].main;
//         document.getElementById('humidity-results').innerHTML = json.main.humidity + "%";
//         document.getElementById('sunset-results').innerHTML = displaySunset;
//         document.getElementById('sunrise-results').innerHTML = displaySunrise;
//         document.getElementById('wind-results').innerHTML = windSpeed + " MPH";
//         document.getElementById('hi-lo').innerHTML = "H: " + highTemp + "˚" + "<br>" + "L: " + lowTemp + "˚";






//         if (json.weather[0].main === "Clouds") {
//             document.getElementById('cloudy').style.display = "initial";
//             document.getElementById('sunny').style.display = "none";
//         }
//         if (json.weather[0].main === "Rain") {
//             document.getElementById('cloudy').style.display = "none";
//             document.getElementById('sunny').style.display = "none";
//             document.getElementById('rain').style.display = "initial";

//         }
//         if (json.weather[0].main === "Snow") {
//             document.getElementById('cloudy').style.display = "none";
//             document.getElementById('sunny').style.display = "none";
//             document.getElementById('rain').style.display = "none";
//             document.getElementById('snow').style.display = "initial";
//         }
//         if (json.weather[0].main === "Clear" && currentStandard < unixSunset) {
//             document.getElementById('cloudy').style.display = "none";
//             document.getElementById('sunny').style.display = "initial";
//             document.getElementById('rain').style.display = "none";
//             document.getElementById('snow').style.display = "none";
//         }
//         if (json.weather[0].main === "Clear" && currentStandard > unixSunset) {
//             document.getElementById('cloudy').style.display = "none";
//             document.getElementById('sunny').style.display = "none";
//             document.getElementById('rain').style.display = "none";
//             document.getElementById('snow').style.display = "none";
//             document.getElementById('clear-night').style.display = "initial";

//         }
//         if (json.weather[0].main === "Clouds" && currentStandard < unixSunset) {
//             document.getElementById('cloudy').style.display = "none";
//             document.getElementById('sunny').style.display = "none";
//             document.getElementById('rain').style.display = "none";
//             document.getElementById('snow').style.display = "none";
//             document.getElementById('clear-night').style.display = "none";
//             document.getElementById('cloudy-night').style.display = "initial";


//         }


//     });


// }


function Unix_timestamp(t) {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);

}

function toStandardTime(militaryTime) {
    militaryTime = militaryTime.split(':');
    return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1]  + " " + ' P.M.' : militaryTime.join(':') + ' A.M.'
}





// function futureWeather() {
//     var input = document.getElementById('input').value;
//     let myKey= "385558a2e3a5c612b37f7a22119fe26d"
//     for (let i = 5; i < 40; i += 8) {


//     let apiKey = "http://api.openweathermap.org/data/2.5/forecast?q=london&units=imperial&APPID="+myKey

//     $.ajax({
//         url:apiKey,
//         method:"POST",
//     }).then(function (json) {
            


//             console.log(json)
//             let forecastHigh = json.list[i].main.temp_max
//             let forecastCondition = json.list[i].weather[0].main
//             forecastHigh = Math.ceil(forecastHigh)
//             let forecastDate = json.list[i].dt_txt;
//             let d = new Date(forecastDate);
//             let dayName = dayNames[d.getDay()];

//             dayNameArray.push(dayName)


//             let els = document.getElementsByClassName("weekday");


//                $(".weekday").html(dayName)
//                 console.log("dayname: " + dayName)
//                 console.log(dayNameArray)


//             $("#weekday1").html(dayNameArray[0])

//             $("#weekday2").html(dayNameArray[1])
//             $("#weekday3").html(dayNameArray[2])
//             $("#weekday4").html(dayNameArray[3])
//             $("#weekday5").html(dayNameArray[4])

//             forecastHighArray.push(forecastHigh)
//             $("#high1").html(forecastHighArray[0])
//             $("#high2").html(forecastHighArray[1])
//             $("#high3").html(forecastHighArray[2])
//             $("#high4").html(forecastHighArray[3])
//             $("#high5").html(forecastHighArray[4])

//             let forecastLow = json.list[i].main.temp_min
//             forecastLow = Math.ceil(forecastLow)

//             forecastLowArray.push(forecastLow)
//             $("#low1").html(forecastLowArray[0])
//             $("#low2").html(forecastLowArray[1])
//             $("#low3").html(forecastLowArray[2])
//             $("#low4").html(forecastLowArray[3])
//             $("#low5").html(forecastLowArray[4])


    
//             forecastConditionArray.push(forecastCondition)

//             if (forecastCondition === "Clouds") {
//                 $(".tiny-cloudy").css("display", "initial");
//                 $(".tiny-sunny").css("display", "none");
//                 $(".tiny-rain").css("display", "none");
//                 $(".tiny-snow").css("display", "none");
//             }

//             if (forecastCondition === "Clear") {
//                 $(".tiny-cloudy").css("display", "none");
//                 $(".tiny-sunny").css("display", "initial");
//                 $(".tiny-rain").css("display", "none");
//                 $(".tiny-snow").css("display", "none");
//             }

//             if (forecastCondition === "Snow") {
//                 $(".tiny-snow").css("display", "initial");
//                 $(".tiny-cloudy").css("display", "none");
//                 $(".tiny-sunny").css("display", "none");
//                 $(".tiny-rain").css("display", "none");
//             }

//             if (forecastCondition === "Rain") {
//                 $(".tiny-snow").css("display", "none");
//                 $(".tiny-cloudy").css("display", "none");
//                 $(".tiny-sunny").css("display", "none");
//                 $(".tiny-rain").css("display", "initial");
//             }
    
    
//     }
    


//     )}
// }


function darkMode(){
document.body.style.backgroundColor="#616262"


}

// document.getElementById("search").addEventListener("submit", function (event) { event.preventDefault(), currentWeather() });

// document.getElementById("search").addEventListener("submit", function (event) { event.preventDefault(),  futureWeather() });

document.getElementById("dark-mode").addEventListener("click", function (event) { event.preventDefault(),  darkMode() });


// window.jsonpCallbacks = {};

// function futureWeather(json,i){

// console.log(json)
// let forecastHigh = json.list[i].main.temp_max
// let forecastCondition = json.list[i].weather[0].main
// forecastHigh = Math.ceil(forecastHigh)

// let forecastDate = json.list[i].dt_txt;
// let d = new Date(forecastDate);
// let dayName = dayNames[d.getDay()];
// let els = document.getElementsByClassName("weekday");

// for(let i=0; i > els.length; i++){
// $(".weekday").html(dayName)
// }

// let forecastLow = json.list[i].main.temp_min
// forecastLow = Math.ceil(forecastLow)






// if (forecastCondition === "Clouds") {
//     $(".tiny-cloudy").css("display", "initial");
//     $(".tiny-sunny").css("display", "none");
//     $(".tiny-rain").css("display", "none");
//     $(".tiny-snow").css("display", "none");
// }

// if (forecastCondition === "Clear") {
//     $(".tiny-cloudy").css("display", "none");
//     $(".tiny-sunny").css("display", "initial");
//     $(".tiny-rain").css("display", "none");
//     $(".tiny-snow").css("display", "none");
// }

// if (forecastCondition === "Snow") {
//     $(".tiny-snow").css("display", "initial");
//     $(".tiny-cloudy").css("display", "none");
//     $(".tiny-sunny").css("display", "none");
//     $(".tiny-rain").css("display", "none");
// }

// if (forecastCondition === "Rain") {
//     $(".tiny-snow").css("display", "none");
//     $(".tiny-cloudy").css("display", "none");
//     $(".tiny-sunny").css("display", "none");
//     $(".tiny-rain").css("display", "initial");



// }

// }



// var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=phoenix&units=imperial&APPID=385558a2e3a5c612b37f7a22119fe26d"

// for (var i = 0; i < 40; i += 8) {
//     (function (i) {
//               window.jsonpCallbacks["futureWeather"+i] = function(json){
//          futureWeather(json,i);
//               };
//             })(i);
//         $.ajax({
//             url: queryUrl,
//             method: "GET",

//             success: function (json) {


//         }


//     })
// }

