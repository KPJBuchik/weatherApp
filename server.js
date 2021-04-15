global.currentArray = []



global.dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'

];
var Promise = require("bluebird");

const request = require('request');

const axios = require('axios').default;

const bodyParser = require('body-parser');
require('dotenv').config()
var express = require("express");

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});



var app = express();
var PORT = process.env.PORT || 8081;
console.log("MY_KEY: " + process.env.MY_KEY);

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));





app.get('/', function (req, res, next) {
    let apiKey = process.env.MY_KEY


    let url = `http://api.openweathermap.org/data/2.5/weather?q=phoenix&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });

        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {

                let roundedTemp = `${Math.ceil(weather.main.temp)}` + "˚";
                let location = `${(weather.name)}`
                let humidity = `${Math.ceil(weather.main.humidity)}`
                let condition = `${(weather.weather[0].main)}`
                let timezone = weather.timezone

                // display custom weather icons based on the icon number
                let iconNumber = weather.weather[0].icon
                var imgSrc = "/assets/" + iconNumber + '.png'; //this worked, just have to add duplicate pictures that correspond to the codes. 
                let unixSunset = weather.sys.sunset;
                const sunset = new Date((unixSunset + timezone) * 1000)
                let sunsetHrs = sunset.getHours().toString();
                let sunsetMinutes = sunset.getMinutes().toString();

                let unixSunrise = weather.sys.sunrise;
                const sunrise = new Date((unixSunrise + timezone) * 1000)
                let sunriseHrs = sunrise.getHours()

                let sunriseMinutes = sunrise.getMinutes()




                //millitary time to standard time
                let displaySunset;

                if (sunsetHrs > 0 && sunsetHrs <= 12) {
                    displaySunset = "" + sunsetHrs;
                } else if (sunsetHrs > 12) {
                    displaySunset = "" + (sunsetHrs - 12);
                } else if (sunsetHrs == 0) {
                    displaySunset = "12";
                }

                displaySunset += (sunsetMinutes < 10) ? ":0" + sunsetMinutes : ":" + sunsetMinutes;
                if (sunsetMinutes.toString().length < 2) {
                    sunsetMinutes = "0" + sunsetMinutes
                }

                displaySunset = sunsetHrs - 5 + ":" + sunsetMinutes
                displaySunset += (sunsetHrs <= 12) ? " P.M." : " A.M.";


                let displaySunrise;
                if (sunriseHrs > 0 && sunriseHrs <= 12) {
                    displaySunrise = "" + sunriseHrs;
                } else if (sunriseHrs > 12) {
                    displaySunrise = "" + (sunriseHrs - 12);
                } else if (sunriseHrs == 0) {
                    displaySunrise = "12";
                }

                displaySunrise += (sunriseMinutes < 10) ? ":0" + sunriseMinutes : ":" + sunriseMinutes;
                if (sunriseMinutes.toString().length < 2) {
                    sunriseMinutes = "0" + sunriseMinutes
                }
                displaySunrise = sunriseHrs - 17 + ":" + sunriseMinutes
                displaySunrise += (sunriseHrs <= 12) ? " P.M." : " A.M.";






                let highTemp = `${Math.ceil(weather.main.temp_max)}` + "˚";
                let lowTemp = `${Math.ceil(weather.main.temp_min)}` + "˚";
                let wind = `${(weather.wind.speed)}`

                currentArray.push(location); //0
                currentArray.push(roundedTemp); //1
                currentArray.push(imgSrc); //2
                currentArray.push(condition);//3
                currentArray.push(humidity);//4
                currentArray.push(displaySunrise);//5
                currentArray.push(displaySunset);//6
                currentArray.push(wind);//7
                currentArray.push(highTemp);//8
                currentArray.push(lowTemp);//9

                console.log("first")
                res.render('index', {
                    weather: currentArray,
                    error: null
                });
               next();


            }
        }
        

    })

}),






app.post('/', function (req, res, next) {
    let apiKey = process.env.MY_KEY

    let city = req.body.city
    if (city === "" ) {
        city = "phoenix"
    }

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });

        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {

                let roundedTemp = `${Math.ceil(weather.main.temp)}` + "˚";
                let location = `${(weather.name)}`
                let humidity = `${Math.ceil(weather.main.humidity)}`
                let condition = `${(weather.weather[0].main)}`
                let timezone = weather.timezone

                // display custom weather icons based on the icon number
                let iconNumber = weather.weather[0].icon
                var imgSrc = "/assets/" + iconNumber + '.png'; //this worked, just have to add duplicate pictures that correspond to the codes. 
                let unixSunset = weather.sys.sunset;
                const sunset = new Date((unixSunset + timezone) * 1000)
                let sunsetHrs = sunset.getHours().toString();
                let sunsetMinutes = sunset.getMinutes().toString();

                let unixSunrise = weather.sys.sunrise;
                const sunrise = new Date((unixSunrise + timezone) * 1000)
                let sunriseHrs = sunrise.getHours()

                let sunriseMinutes = sunrise.getMinutes()




                //millitary time to standard time
                let displaySunset;

                if (sunsetHrs > 0 && sunsetHrs <= 12) {
                    displaySunset = "" + sunsetHrs;
                } else if (sunsetHrs > 12) {
                    displaySunset = "" + (sunsetHrs - 12);
                } else if (sunsetHrs == 0) {
                    displaySunset = "12";
                }

                displaySunset += (sunsetMinutes < 10) ? ":0" + sunsetMinutes : ":" + sunsetMinutes;
                if (sunsetMinutes.toString().length < 2) {
                    sunsetMinutes = "0" + sunsetMinutes
                }

                displaySunset = sunsetHrs - 5 + ":" + sunsetMinutes
                displaySunset += (sunsetHrs <= 12) ? " P.M." : " A.M.";


                let displaySunrise;
                if (sunriseHrs > 0 && sunriseHrs <= 12) {
                    displaySunrise = "" + sunriseHrs;
                } else if (sunriseHrs > 12) {
                    displaySunrise = "" + (sunriseHrs - 12);
                } else if (sunriseHrs == 0) {
                    displaySunrise = "12";
                }

                displaySunrise += (sunriseMinutes < 10) ? ":0" + sunriseMinutes : ":" + sunriseMinutes;
                if (sunriseMinutes.toString().length < 2) {
                    sunriseMinutes = "0" + sunriseMinutes
                }
                displaySunrise = sunriseHrs - 17 + ":" + sunriseMinutes
                displaySunrise += (sunriseHrs <= 12) ? " P.M." : " A.M.";






                let highTemp = `${Math.ceil(weather.main.temp_max)}` + "˚";
                let lowTemp = `${Math.ceil(weather.main.temp_min)}` + "˚";
                let wind = `${(weather.wind.speed)}`

                currentArray.push(location); //0
                currentArray.push(roundedTemp); //1
                currentArray.push(imgSrc); //2
                currentArray.push(condition);//3
                currentArray.push(humidity);//4
                currentArray.push(displaySunrise);//5
                currentArray.push(displaySunset);//6
                currentArray.push(wind);//7
                currentArray.push(highTemp);//8
                currentArray.push(lowTemp);//9

                console.log("first")
                 next();


            }
        }
        

    })

}),

    app.post("/", function (req, res, next) {
        let apiKey = process.env.MY_KEY

        let city = req.body.city
        if (city === "") {
            city = "phoenix"
        }

        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKey}`

        request(url, function (err, response, body) {
            if (err) {
                res.render('/', { data: null, error: 'Error, please try again' });

            } else {
                let data = JSON.parse(body)



                if (data.main !== undefined) {
                    city=phoenix
                    res.render('/', { data: null, error: 'Error, please try again' });
                } else {

                    // for (let i = 0; i < data.list.length; i += 8) {
                    res.locals.forecasteDay = data.list[0].dt_txt;
                    let forecastDate = data.list[0].dt_txt;
                    let d = new Date(forecastDate);
                    let dayName = dayNames[d.getDay()];
                    // display custom weather icons based on the icon number
                    let smallIconNumber = data.list[0].weather[0].icon
                    var smallImgSrc = "/assets/t" + smallIconNumber + '.png';
                    let forecastHigh = Math.ceil(data.list[0].main.temp_max);
                    let forecastLow = Math.ceil(data.list[4].main.temp_min)





                    let forecastDate2 = data.list[8].dt_txt;
                    let d2 = new Date(forecastDate2);
                    let dayName2 = dayNames[d2.getDay()];
                    let smallIconNumber2 = data.list[8].weather[0].icon
                    var smallImgSrc2 = "/assets/t" + smallIconNumber2 + '.png';
                    let forecastHigh2 = Math.ceil(data.list[8].main.temp_max)
                    let forecastLow2 = Math.ceil(data.list[12].main.temp_min)


                    let forecastDate3 = data.list[16].dt_txt;
                    let d3 = new Date(forecastDate3);
                    let dayName3 = dayNames[d3.getDay()];
                    let smallIconNumber3 = data.list[16].weather[0].icon
                    var smallImgSrc3 = "/assets/t" + smallIconNumber3 + '.png';
                    let forecastHigh3 = Math.ceil(data.list[16].main.temp_max)
                    let forecastLow3 = Math.ceil(data.list[20].main.temp_min)

                    let forecastDate4 = data.list[24].dt_txt;
                    let d4 = new Date(forecastDate4);
                    let dayName4 = dayNames[d4.getDay()];
                    let smallIconNumber4 = data.list[24].weather[0].icon
                    var smallImgSrc4 = "/assets/t" + smallIconNumber4 + '.png';
                    let forecastHigh4 = Math.ceil(data.list[24].main.temp_max)
                    let forecastLow4 = Math.ceil(data.list[28].main.temp_min)

                    let forecastDate5 = data.list[32].dt_txt;
                    let d5 = new Date(forecastDate5);
                    let dayName5 = dayNames[d5.getDay()];
                    let smallIconNumber5 = data.list[32].weather[0].icon
                    var smallImgSrc5 = "/assets/t" + smallIconNumber5 + '.png';
                    let forecastHigh5 = Math.ceil(data.list[32].main.temp_max)
                    let forecastLow5 = Math.ceil(data.list[36].main.temp_min)



                    currentArray.push(dayName)//10,11,12,13,14
                    currentArray.push(dayName2)//10,11,12,13,14
                    currentArray.push(dayName3)//10,11,12,13,14
                    currentArray.push(dayName4)//10,11,12,13,14
                    currentArray.push(dayName5)//10,11,12,13,14


                    currentArray.push(smallImgSrc)//15,16,17,18,19
                    currentArray.push(smallImgSrc2)//15,16,17,18,19
                    currentArray.push(smallImgSrc3)//15,16,17,18,19
                    currentArray.push(smallImgSrc4)//15,16,17,18,19
                    currentArray.push(smallImgSrc5)//15,16,17,18,19

                    currentArray.push(forecastHigh)
                    currentArray.push(forecastHigh2)
                    currentArray.push(forecastHigh3)
                    currentArray.push(forecastHigh4)
                    currentArray.push(forecastHigh5)

                    currentArray.push(forecastLow)
                    currentArray.push(forecastLow2)
                    currentArray.push(forecastLow3)
                    currentArray.push(forecastLow4)
                    currentArray.push(forecastLow5)




                    console.log(currentArray)
                    res.render('index', {
                        weather: currentArray,
                        error: null
                    });

                    // }
                    console.log("second")
                    console.log(err)
                    return currentArray.length = 0

                }
            }


        })

    })





    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    
    });