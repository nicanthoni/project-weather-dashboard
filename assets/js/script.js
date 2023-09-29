var APIKey = "32ec16b0deb6b7328bcf20bb8cd46fce";
var queryURL;
var city; // user input to be stored in this variable

var searchInput = document.getElementById("citySearch"); // Input (search) element
var searchBtn = document.getElementById("searchBtn"); // Button element
var dateEl; // Date element on card
var currentDateEl;
var savedCities;


function fiveDay(city) { // Calls forecast, NOT current weather. (replace forecast with 'weather')
    queryURL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + APIKey;
    console.log('City Name: ')
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('5Day data: ')
            console.log(data);
            var fiveDayContainer = document.querySelector('.forecast-container');
            fiveDayContainer.innerHTML = '';
            fiveDayContainer.classList.add('bg-primary-subtle', 'py-3', 'd-flex', 'align-items-center');
            var forecastHeader = document.createElement('h5');
            fiveDayContainer.appendChild(forecastHeader);
            forecastHeader.textContent = '5-day Forecast:';
            forecastHeader.classList.add('text-center', 'display-6');
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.split(' ')[1] === '12:00:00') {
                    console.log(data.list[i]); // all 5 days at noon


                    var cardEl = document.createElement('div'); // card el to hold forecase data
                    cardEl.classList.add("card", "mt-3", "forecast", 'card-body', 'ms-1', 'me-1');
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

                    var currentIcon = document.createElement('img');
                    var iconID = data.list[i].weather[0].icon;
                    currentIcon.style.width = '100px';
                    currentIcon.src = `https://openweathermap.org/img/w/${iconID}.png`


                    fiveDayContainer.appendChild(cardEl); // append card to div
                    cardEl.appendChild(dateEl); // append date to card div
                    cardEl.appendChild(ulEl); // append UL to the card
                    ulEl.appendChild(currentIcon);
                    ulEl.appendChild(tempEl); // append the temp as li to UL
                    ulEl.appendChild(windEl); // append the windspeed as li to UL
                    ulEl.appendChild(humidEl); //append the humididity as li to UL


                    tempEl.textContent = 'Temperature: ' + data.list[i].main.temp + ' °F'; // asign data to an element
                    windEl.textContent = 'Wind Speed: ' + data.list[i].wind.speed + ' mph'; // asign data to an element
                    humidEl.textContent = 'Humidity: ' + data.list[i].main.humidity + '%'; // asign data to an element
                    dateEl.textContent = data.list[i].dt_txt.split(' ')[0];
                }
            }

        })
};

function currentWeather(city) {
    queryURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('CURRENT data: ')
            console.log(data);
            console.log('weather icon id: ')
            console.log(data.weather[0].icon);
            var currentContainer = document.querySelector('.current-container');
            currentContainer.innerHTML = '';
            var currentCardEl = document.createElement('div'); // card el to hold forecase data
            currentCardEl.classList.add("card", "mt-2", "forecast", 'card-body', 'bg-primary-subtle');
            currentCardEl.style.width = '18rem';
            var currentDateEl = document.createElement('h5'); // Date element on card
            currentDateEl.classList.add('text-center', 'display-6');
            var currentUlEl = document.createElement('ul'); // ul el to hold below li's
            currentUlEl.classList.add('list-group', 'list-group-flush');
            var currentTempEl = document.createElement('li'); // li for temp (far)
            currentTempEl.classList.add('list-group-item', 'text-center');
            var currentWindEl = document.createElement('li'); // li for windspeed
            currentWindEl.classList.add('list-group-item', 'text-center');
            var currentHumidEl = document.createElement('li'); // li for humidity
            currentHumidEl.classList.add('list-group-item', 'text-center');

            var currentIcon = document.createElement('img');
            var iconID = data.weather[0].icon;
            currentIcon.style.width = '100px';
            currentIcon.src = `https://openweathermap.org/img/w/${iconID}.png`
            currentContainer.appendChild(currentCardEl); // append card to div
            currentCardEl.appendChild(currentDateEl); // append date to card div
            currentCardEl.appendChild(currentUlEl); // append UL to the card
            currentUlEl.appendChild(currentIcon); // append weatherIcon to current card
            currentUlEl.appendChild(currentTempEl); // append the temp as li to UL
            currentUlEl.appendChild(currentWindEl); // append the windspeed as li to UL
            currentUlEl.appendChild(currentHumidEl); //append the humididity as li to UL

            currentTempEl.textContent = 'Temperature: ' + data.main.temp + ' °F'; // asign data to an element
            currentWindEl.textContent = 'Wind Speed: ' + data.wind.speed + ' mph'; // asign data to an element
            currentHumidEl.textContent = 'Humidity: ' + data.main.humidity + '%'; // asign data to an element
            currentDateEl.textContent = city + ' now: '; // cities current weather
        });
}


function createButton() {
    savedCities = JSON.parse(localStorage.getItem('City')) || [];
    var btnContainer = document.querySelector('.cityBtns')
    btnContainer.textContent = '';
    for (let i = 0; i < savedCities.length; i++) {
    
        var cityName = savedCities[i];
        var cityBtn = document.createElement('button');
        cityBtn.classList.add('ms-1', 'me-1');
        cityBtn.textContent = cityName;
        btnContainer.appendChild(cityBtn);
        cityBtn.addEventListener("click", function () {
            console.log(this.textContent);
            var btnContent = this.textContent;
            fiveDay(btnContent);
            currentWeather(btnContent);
    
        })
    }
}

searchBtn.addEventListener("click", function () {
    event.preventDefault();
    city = searchInput.value.trim();

    if (city !== "" ) {
    savedCities = JSON.parse(localStorage.getItem('City')) || [];

    if (!savedCities.includes(city)) {
        savedCities.push(city);
        localStorage.setItem("City", JSON.stringify(savedCities));
        createButton();
    }
    fiveDay(city);
    currentWeather(city);
}
});
createButton();