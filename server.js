const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config()

var express = require("express");

var app = express();
var PORT = process.env.PORT || 8081;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function(req, res) {res.render('index')});

// app.get('/', function (req, res) {
//     // NEW CODE
//     res.render('index');
//   })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// app.use('/public', express.static(__dirname + "/public"));
// app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    let apiKey = process.env.MY_KEY

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });

        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let roundedTemp = `${Math.ceil(weather.main.temp)}`+ "˚";
                let location = `${(weather.name)}`
                let currentArray= []
                currentArray.push(location);
                currentArray.push(roundedTemp);
                console.log(currentArray)
                res.render('index', { weather: roundedTemp, error: null });
            }
        }
    });
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

});



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
