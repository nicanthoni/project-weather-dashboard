var APIKey = "32ec16b0deb6b7328bcf20bb8cd46fce";
var queryURL;
var city; // user input to be stored in this variable

var searchInput = document.getElementById("citySearch"); // Input (search) element
var searchBtn = document.getElementById("searchBtn"); // Button element
var dateEl; // Date element on card
var currentDateEl;


function fiveDayFunction() { // Calls forecast, NOT current weather. (replace forecast with 'weather')
    searchBtn.addEventListener("click", function () {
        event.preventDefault();
        city = searchInput.value;
        queryURL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + APIKey;
        console.log('City Name: ')
        console.log(city);
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('5Day data: ')
                console.log(data);
                for (var i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.split(' ')[1] === '12:00:00') {
                        console.log(data.list[i]); // all 5 days at noon

                        var fiveDayContainer = document.querySelector('.forecast-container');
                        var cardEl = document.createElement('div'); // card el to hold forecase data
                        cardEl.classList.add("card", "mt-4", "forecast", 'card-body');
                        cardEl.style.width = '18rem';
                        var dateEl = document.createElement('h5'); // Date element on card
                        dateEl.classList.add('text-center');
                        var ulEl = document.createElement('ul'); // ul el to hold below li's
                        ulEl.classList.add('list-group', 'list-group-flush');
                        var tempEl = document.createElement('li'); // li for temp (far)
                        tempEl.classList.add('list-group-item');
                        var windEl = document.createElement('li'); // li for windspeed
                        windEl.classList.add('list-group-item');
                        var humidEl = document.createElement('li'); // li for humidity
                        humidEl.classList.add('list-group-item');

                        fiveDayContainer.appendChild(cardEl); // append card to div
                        cardEl.appendChild(dateEl); // append date to card div
                        cardEl.appendChild(ulEl); // append UL to the card
                        ulEl.appendChild(tempEl); // append the temp as li to UL
                        ulEl.appendChild(windEl); // append the windspeed as li to UL
                        ulEl.appendChild(humidEl); //append the humididity as li to UL

                        tempEl.textContent = 'Temperature: ' + data.list[i].main.temp + ' °F'; // asign data to an element
                        windEl.textContent = 'Wind Speed: ' + data.list[i].wind.speed + ' mph'; // asign data to an element
                        humidEl.textContent = 'Humidity: ' + data.list[i].main.humidity + '%'; // asign data to an element
                        dateEl.textContent = data.list[i].dt_txt.split(' ')[0];
                    }
                }
                var forecastHeader = document.createElement('h5');
                fiveDayContainer.appendChild(forecastHeader);
                forecastHeader.textContent = '5-day Forecast:'
                forecastHeader.classList.add('text-center');
            })
    })
};


function currentWeather() {
    searchBtn.addEventListener("click", function () {
        event.preventDefault();
        city = searchInput.value;
        queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('CURRENT data: ')
                console.log(data);

                var currentContainer = document.querySelector('.current-container');
                var currentCardEl = document.createElement('div'); // card el to hold forecase data
                currentCardEl.classList.add("card", "mt-5", "forecast", 'card-body', 'bg-primary-subtle');
                currentCardEl.style.width = '18rem';
                var currentDateEl = document.createElement('h5'); // Date element on card
                currentDateEl.classList.add('text-center');
                var currentUlEl = document.createElement('ul'); // ul el to hold below li's
                currentUlEl.classList.add('list-group', 'list-group-flush');
                var currentTempEl = document.createElement('li'); // li for temp (far)
                currentTempEl.classList.add('list-group-item', 'text-center');
                var currentWindEl = document.createElement('li'); // li for windspeed
                currentWindEl.classList.add('list-group-item', 'text-center');
                var currentHumidEl = document.createElement('li'); // li for humidity
                currentHumidEl.classList.add('list-group-item', 'text-center');

                currentContainer.appendChild(currentCardEl); // append card to div
                currentCardEl.appendChild(currentDateEl); // append date to card div
                currentCardEl.appendChild(currentUlEl); // append UL to the card
                currentUlEl.appendChild(currentTempEl); // append the temp as li to UL
                currentUlEl.appendChild(currentWindEl); // append the windspeed as li to UL
                currentUlEl.appendChild(currentHumidEl); //append the humididity as li to UL

                currentTempEl.textContent = 'Temperature: ' + data.main.temp + ' °F'; // asign data to an element
                currentWindEl.textContent = 'Wind Speed: ' + data.wind.speed + ' mph'; // asign data to an element
                currentHumidEl.textContent = 'Humidity: ' + data.main.humidity + '%'; // asign data to an element
                currentDateEl.textContent = city + ' now: '; // cities current weather
            });
    });
}

// function addIcons () {
//     // API call for images by weather conditions
// }





fiveDayFunction();
currentWeather();