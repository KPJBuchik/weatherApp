
const request = require('request');

var NodeGeocoder = require('node-geocoder');

const bodyParser = require('body-parser');
require('dotenv').config()
var express = require("express");

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});



var app = express();
var PORT = process.env.PORT || 8082;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

global.currentArray = []

global.dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednes.',
    'Thursday',
    'Friday',
    'Saturday'

];
//loads window with query for phoenix weather
app.get('/', function (req, res, next) {
    let apiKey = process.env.MY_KEY
    city = "phoenix"

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
    app.get("/", function (req, res, next) {
        let apiKey = process.env.MY_KEY

        city = "phoenix"
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKey}`

        request(url, function (err, response, body) {
            if (err) {
                res.render('/', { data: null, error: 'Error, please try again' });

            } else {
                let data = JSON.parse(body)

                if (data.main !== undefined) {
                    res.render('/', { data: null, error: 'Error, please try again' });
                } else {

                    for (let i = 0; i < data.list.length; i += 8) {
                        res.locals.forecasteDay = data.list[i].dt_txt;
                        let forecastDate = data.list[i].dt_txt;
                        let d = new Date(forecastDate);
                        let dayName = dayNames[d.getDay()];
                        currentArray.push(dayName)//10,11,12,13,14


                    }


                    for (let i = 0; i < data.list.length; i += 8) {

                        let smallIconNumber = data.list[i].weather[0].icon
                        var smallImgSrc = "/assets/t" + smallIconNumber + '.png';
                        currentArray.push(smallImgSrc)//15,16,17,18,19

                    }

                    for (let i = 0; i < data.list.length; i += 8) {
                        let forecastHigh = Math.ceil(data.list[i].main.temp_max);
                        currentArray.push(forecastHigh)
                    }

                    for (let i = 0; i < data.list.length; i += 8) {
                        let forecastLow = Math.ceil(data.list[i + 4].main.temp_min)
                        currentArray.push(forecastLow)


                    }


                    currentArray.push(data.city.country)



                    console.log(currentArray)


                    // }
                    res.render('index', {
                        weather: currentArray,
                        error: null
                    });
                    //clears the array after a search
                    return currentArray.length = 0;
                }
            }


        })

    }),






    app.post('/', function (req, res, next) {
        let apiKey = process.env.MY_KEY

        let city = req.body.city
        if (city === "") {
            city = "phoenix"
        }

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

        request(url, function (err, response, body) {
            if (err) {
                res.render('index', { weather: null, error: 'Error, please try again' });

            } else {
                let weather = JSON.parse(body)
                console.log(weather)
                if (weather.main == undefined) {
                    res.render('index', { weather: null, error: 'Error, please try again' });
                } else {

                    let roundedTemp = `${Math.ceil(weather.main.temp)}` + "˚";
                    let location = `${(weather.name)}`
                    let Country = weather.sys.country
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



                if (data.list[0].dt_text !== undefined) {
                    res.render('/', { data: null, error: 'Error, please try again' });
                } else {
                    //get weekly forecast day
                    for (let i = 0; i < data.list.length; i += 8) {
                        res.locals.forecasteDay = data.list[i].dt_txt;
                        let forecastDate = data.list[i].dt_txt;
                        let d = new Date(forecastDate);
                        let dayName = dayNames[d.getDay()];
                        currentArray.push(dayName)//10,11,12,13,14


                    }

                    //get weekly forecast icon
                    for (let i = 0; i < data.list.length; i += 8) {

                        let smallIconNumber = data.list[i].weather[0].icon
                        var smallImgSrc = "/assets/t" + smallIconNumber + '.png';
                        currentArray.push(smallImgSrc)//15,16,17,18,19

                    }
                    //get weekly forecast high
                    for (let i = 0; i < data.list.length; i += 8) {
                        let forecastHigh = Math.ceil(data.list[i].main.temp_max);
                        currentArray.push(forecastHigh)
                    }
                    //get weekly forecast low
                    for (let i = 0; i < data.list.length; i += 8) {
                        let forecastLow = Math.ceil(data.list[i+4].main.temp_min)
                        currentArray.push(forecastLow)


                    }


                    currentArray.push(data.city.country)




                    console.log(currentArray)
                    res.render('index', {
                        weather: currentArray,
                        error: null
                    });

                    // }

                    return currentArray.length = 0

                }
            }


        })

    })





app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

});