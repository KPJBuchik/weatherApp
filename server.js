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
            console.log(weather)

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {

                let currentArray = []

                let roundedTemp = `${Math.ceil(weather.main.temp)}` + "˚";
                let location = `${(weather.name)}`
                let humidity = `${Math.ceil(weather.main.humidity)}`



                let timezone = weather.timezone
                
 
                let unixSunset = weather.sys.sunset;
                const sunset = new Date((unixSunset + timezone) * 1000)
                let sunsetHrs = sunset.getHours().toString();
                let sunsetMinutes = sunset.getMinutes().toString();
                let sunsetSeconds = sunset.getSeconds().toString();
      
                let unixSunrise = weather.sys.sunrise;
                const sunrise = new Date((unixSunrise + timezone) * 1000)
                let sunriseHrs = sunrise.getHours()
           
                let sunriseMinutes = sunrise.getMinutes()
                let sunriseSeconds = sunrise.getSeconds().toString();


                console.log(sunriseMinutes)

                //millitary time to standard time
                let displaySunset;

                if (sunsetHrs > 0 && sunsetHrs <= 12) {
                  displaySunset= "" + sunsetHrs;
                } else if (sunsetHrs > 12) {
                  displaySunset= "" + (sunsetHrs - 12);
                } else if (sunsetHrs == 0) {
                  displaySunset= "12";
                }
                 
                displaySunset += (sunsetMinutes < 10) ? ":0" + sunsetMinutes : ":" + sunsetMinutes;  // get minutes
                if (sunsetMinutes.toString().length < 2){
                    sunsetMinutes = "0" + sunsetMinutes
                }

                displaySunset = sunsetHrs-5 + ":" +  sunsetMinutes
                displaySunset += (sunsetHrs <= 12) ? " P.M." : " A.M.";  // get AM/PM

                console.log(displaySunset)

                let displaySunrise; 
                if (sunriseHrs > 0 && sunriseHrs <= 12) {
                  displaySunrise= "" + sunriseHrs;
                } else if (sunriseHrs > 12) {
                  displaySunrise= "" + (sunriseHrs - 12);
                } else if (sunriseHrs == 0) {
                  displaySunrise= "12";
                }
                 
                displaySunrise += (sunriseMinutes < 10) ? ":0" + sunriseMinutes : ":" + sunriseMinutes;  // get minutes
                if (sunriseMinutes.toString().length < 2){
                    sunriseMinutes = "0" + sunriseMinutes
                }
                displaySunrise = sunriseHrs-17+ ":" +  sunriseMinutes 
                displaySunrise += (sunriseHrs <= 12) ? " P.M." : " A.M.";  // get AM/PM

                console.log(sunriseMinutes.toString().length)


            


                let highTemp = `${Math.ceil(weather.main.temp_max)}` + "˚";
                let lowTemp = `${Math.ceil(weather.main.temp_min)}` + "˚";
                let wind = `${(weather.wind.speed)}`
                let condition = weather.weather[0].main

                currentArray.push(location);
                currentArray.push(roundedTemp);
                currentArray.push(humidity);
                currentArray.push(displaySunrise);
                currentArray.push(displaySunset);
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
