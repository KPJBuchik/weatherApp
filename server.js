const request = require('request');
const axios = require('axios').default;

const bodyParser = require('body-parser');
require('dotenv').config()
var express = require("express");
var router = express.Router()

var app = express();
var PORT = process.env.PORT || 8081;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use("/public", express.static(__dirname + "/pulblic/assets"));
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

});

let currentArray = []

app.get('/',  function (req, res) {
    res.render('index', );
})

app.get('/future',  function (req, res) {
    res.redirect('/');})


app.post('/', async function (req, res,next) {
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
                  displaySunset= "" + sunsetHrs;
                } else if (sunsetHrs > 12) {
                  displaySunset= "" + (sunsetHrs - 12);
                } else if (sunsetHrs == 0) {
                  displaySunset= "12";
                }
                 
                displaySunset += (sunsetMinutes < 10) ? ":0" + sunsetMinutes : ":" + sunsetMinutes;  
                if (sunsetMinutes.toString().length < 2){
                    sunsetMinutes = "0" + sunsetMinutes
                }

                displaySunset = sunsetHrs-5 + ":" +  sunsetMinutes
                displaySunset += (sunsetHrs <= 12) ? " P.M." : " A.M.";  


                let displaySunrise; 
                if (sunriseHrs > 0 && sunriseHrs <= 12) {
                  displaySunrise= "" + sunriseHrs;
                } else if (sunriseHrs > 12) {
                  displaySunrise= "" + (sunriseHrs - 12);
                } else if (sunriseHrs == 0) {
                  displaySunrise= "12";
                }
                 
                displaySunrise += (sunriseMinutes < 10) ? ":0" + sunriseMinutes : ":" + sunriseMinutes;  
                if (sunriseMinutes.toString().length < 2){
                    sunriseMinutes = "0" + sunriseMinutes
                }
                displaySunrise = sunriseHrs-17+ ":" +  sunriseMinutes 
                displaySunrise += (sunriseHrs <= 12) ? " P.M." : " A.M.";  



            


                let highTemp = `${Math.ceil(weather.main.temp_max)}` + "˚";
                let lowTemp = `${Math.ceil(weather.main.temp_min)}` + "˚";
                let wind = `${(weather.wind.speed)}`

                currentArray.push(location);
                currentArray.push(roundedTemp);
                currentArray.push(humidity);
                currentArray.push(displaySunrise);
                currentArray.push(displaySunset);
                currentArray.push(wind);
                currentArray.push(highTemp);
                currentArray.push(lowTemp);
                currentArray.push(condition)
                currentArray.push(imgSrc)
              
                res.render('index', { weather: currentArray,
                     error: null });
                next();
            }

        }

    })
}),


app.post("/",  function (req, res, next) {
    let apiKey = process.env.MY_KEY

    let city = req.body.city;

    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKey}`

    request(url,  function (err, response, body) {
        if (err) {
            res.render('/', { data: null, error: 'Error, please try again'});

        } else {
            let data = JSON.parse(body)
            console.log("hey")


            if (data.main !== undefined) {
               return  res.render('/', { data: null, error: 'Error, please try again' });
            } else {
                let forecastDate = data.list[0].dt_txt;
                currentArray.push(forecastDate)
                console.log("hey")
                console.log("date" + forecastDate)
                console.log(currentArray)

                next()
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
