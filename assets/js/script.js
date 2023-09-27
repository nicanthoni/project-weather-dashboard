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
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchInput = document.getElementById("citySearch"); // element
var city; // user input to be stored in this variable
city = searchInput.value; 
console.log(city);

// function runAPI () {
// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
// }                      


  // event listener on search button to runAPI()