<html lang="en-us">

<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico">


  <title>Kevin Buchik</title>
  <link rel="icon" type="image/png" href="asses/favicon.ico">


  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="style.css">
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
    crossorigin="anonymous"></script> -->



</head>

<body>

  <!-- <h1>cool weather</h1>
    <input id="search"><button id="submit">Submit</button>  -->
  <div id="toggle"><button id="dark-mode">toggle</button></div>
  <div id="current">
    <div id="location">
      <% if(error !== null){ %>
        <p><%= error %></p>
      <% } %>


      <form action="/" method="post" id="search">
        <input name="city" id="input" type="search" placeholder="enter a city">
    </div>

    <% if(weather !== null){ %>

      <h5 id="city"><%= weather[0] %></h5>

    <h2 id="temp"><%= weather[1] %></h2>

    <img  id="cloudy" class="weather-icon" src=<%= weather[2] %>>

    



  </div>

  <div class="backdrop">

    <h3 id="conditions"><%= weather[3] %></h3>

    <div id="squares">
      <div class="square">
        <p class="etc-weather">HUMIDITY</p>
        <p id="humidity-results" class="etc-weather-results "><%= weather[4] %></p>
      </div>
      <div class="square">
        <p class="etc-weather">SUNRISE</p>
        <p id="sunrise-results" class="etc-weather-results "><%= weather[5] %></p>
      </div>
      <div class="square">
        <p class="etc-weather">SUNSET</p>
        <p id="sunset-results" class="etc-weather-results "><%= weather[6] %></p>

      </div>
      <div class="square">
        <p class="etc-weather">WIND</p>
        <p id="wind-results" class="etc-weather-results "><%= weather[7] %></p>

      </div>
    </div>
    <div id="hi-lo">
      H:<%= weather[8] %> 
      <br>
      L:<%= weather[9] %>

    </div>

   

      <div id="weekly-forecast" >
        <div class="ribbon">
          <p id="weekday1" class="weekday"> <%= weather[10] %></p>

        <img class="tiny-sun forecast-icon" src=<%= weather[15] %>>
        <img class="ribbon ribbon-image" src="./assets/ribbon.png">

        <p id="high1" class="high-forecast">84</p>
        <p id="low1" class="low-forecast">81</p>


      </div>
      <div class="ribbon">
        <p id="weekday2" class="weekday"><%= weather[11] %></p>
        <img class="tiny-sun forecast-icon" src=<%= weather[16] %>>

        <img class="ribbon ribbon-image" src="./assets/ribbon.png">
        <p id="high2" class="high-forecast">84</p>
        <p id="low2" class="low-forecast">81</p>

      </div>
      <div class="ribbon">
        <p id="weekday3" class="weekday"><%= weather[12] %></p>
        <img class="forecast-icon" src=<%= weather[17] %>>

        <img class="ribbon ribbon-image" src="./assets/ribbon.png">
        <p id="high3" class="high-forecast">84</p>
        <p id="low3" class="low-forecast">81</p>

      </div>

      <div class="ribbon">
        <p id="weekday4" class="weekday"><%= weather[13] %></p>
        <img class="tiny-sun forecast-icon" src=<%= weather[18] %>>

        <img class="ribbon ribbon-image" src="./assets/ribbon.png">
        <p id="high4" class="high-forecast">84</p>
        <p id="low4" class="low-forecast">81</p>
      </div>
      <div class="ribbon">
        <p id="weekday5" class="weekday"><%= weather[14] %></p>
        <img class="tiny-sun forecast-icon" src=<%= weather[19] %>>
        <img class="ribbon ribbon-image" src="./assets/ribbon.png">
        <p id="high5" class="high-forecast">84</p>
        <p id="low5" class="low-forecast">81</p>
        <% } %>

      </div>

      <!-- <div class="ribbon">
                <p class="weekday">Monday</p> <img class="forecast-icon" src="assets/tiny-sun.png"><img
                    class="ribbon ribbon-image" src="./assets/ribbon.png">

            </div>

            <div class="ribbon">
                <p class="weekday">Monday</p> <img class="forecast-icon" src="assets/tiny-sun.png"> <img
                    class="ribbon ribbon-image" src="./assets/ribbon.png">

            </div> -->


    </div>
  </div>
  <script type='text/javascript' src='config.js'></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <script src="app.js"></script>

</body>

</html>