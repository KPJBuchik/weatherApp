const request = require('request');

const bodyParser = require('body-parser');
require('dotenv').config()
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8081;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

});


app.get('/', function (req, res) {
    res.render('index', );
});

app.post('/', function (req, res) {
    let apiKey = process.env.MY_KEY

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again'});

        } else {
            let weather = JSON.parse(body)
            // console.log(weather)

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {

                let currentArray = []

                let roundedTemp = `${Math.ceil(weather.main.temp)}` + "˚";
                let location = `${(weather.name)}`
                let humidity = `${Math.ceil(weather.main.humidity)}`
                let unixSunset = weather.sys.sunset;
                let sunset = new Date(unixSunset * 1000)
                let displaySunsetHours = sunset.getHours().toString()
                let displaySunsetMinutes = sunset.getMinutes().toString()
                let displaySunset = displaySunsetHours + ":" + displaySunsetMinutes
                let unixSunrise = weather.sys.sunrise;
                let sunrise = new Date(unixSunrise * 1000)
                let displaySunriseHours = sunrise.getHours().toString()
                let displaySunriseMinutes = sunrise.getMinutes().toString()
                let displaySunrise = displaySunriseHours + ":" + displaySunriseMinutes
                let highTemp = `${Math.ceil(weather.main.temp_max)}` + "˚";
                let lowTemp = `${Math.ceil(weather.main.temp_min)}` + "˚";
                let wind = `${(weather.wind.speed)}`
                let condition = weather.weather[0].main

                currentArray.push(location);
                currentArray.push(roundedTemp);
                currentArray.push(humidity);
                currentArray.push(displaySunset);
                currentArray.push(displaySunrise);
                currentArray.push(wind);
                currentArray.push(highTemp);
                currentArray.push(lowTemp);
                currentArray.push(condition)
              
                res.render('index', { weather: currentArray, error: null });
            }
        }
    });
})






console.log("MY_KEY: " + process.env.MY_KEY);

// let apiKey = process.env.MY_KEY
// let city = 'portland';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`



// request(url, function (err, response, body) {
//     if (err) {
//         console.log('error:', error);
//     } else {
//         let weather = JSON.parse(body)
//         let message = `It's ${weather.list.temp_max} degrees in ${weather.name}!`;
//         console.log(message);

//     }
// });
