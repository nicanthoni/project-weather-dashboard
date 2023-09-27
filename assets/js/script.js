// USER STORY: AS A traveler
// I WANT to see the weather outlook for multiple cities -> SO THAT I can plan a trip accordingly

// ACCEPTANCE CRITERIA:
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city -> THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city -> THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city -> THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history -> THEN I am again presented with current and future conditions for that city


//API call example: https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
// weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";


var state;
var country;
var APIKey = "32ec16b0deb6b7328bcf20bb8cd46fce";
var queryURL;
var city; // user input to be stored in this variable

var searchInput = document.getElementById("citySearch"); // Input (search) element
var searchBtn = document.getElementById("searchBtn"); // Button element

var temperatureEl = document.getElementById("temp1"); // Temp El from first card
var windSpeedEl = document.getElementById('wind-Speed1'); // windSpeed el from first card
var humidityEl = document.getElementById('humidity1'); // humidity El from first card
var dateEl; // Date element on card


function fiveDayFunction() { // Calls forecast, NOT current weather. (replace forecast with 'weather')
    searchBtn.addEventListener("click", function () {
        event.preventDefault(); // Prevent the form from submitting
        city = searchInput.value;
        queryURL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + APIKey;
        console.log('City Name: ')
        console.log(city);
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('Data: ')
                console.log(data);
 for (var i = 0; i < data.list.length; i++) {
   if (data.list[i].dt_txt.split(' ')[1] === '12:00:00') {
console.log(data.list[i]); // all 5 days at noon
var cardEl = document.createElement('div');
var ulEl = document.createElement('ul');
var tempEl = document.createElement('li');
var windEl = document.createElement('li');
var humidEl = document.createElement('li');

tempEl.textContent = 'Temperature: ' + data.list[i].main.temp; // asign data to an element
windEl.textContent = 'Wind Speed: ' + data.list[i].wind.speed + 'MPH'; // asign data to an element
humidEl = 'Humidity: ' + data.list[i].main.humidity; // asign data to an element

// cardEl.append to the div etc

   }
 }


                // temperatureEl.textContent = 'Temperature: ' + data.list[0].main.temp; // asign data to an element
                // windSpeedEl.textContent = 'Wind Speed: ' + data.list[0].wind.speed + 'MPH'; // asign data to an element
                // humidityEl.textContent = 'Humidity: ' + data.list[0].main.humidity; // asign data to an element
            })
    }) 
};

// function currentWeather() { // for todays weather -> same code as above but attached to new elements

// }




fiveDayFunction();