var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/public', express.static(__dirname + "/public"));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

