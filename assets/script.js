// Open Weather Api key
const apiKey = '50294a366143b14dd89ede88d9104697';

// Gets data from Day.js
var today = dayjs();
const dayOne = today.add(1, 'day'); //Adds 1 to the date
const dayTwo = today.add(2, 'day'); //Adds 2 to the date and so on
const dayThree = today.add(3, 'day');
const dayFour = today.add(4, 'day');
const dayFive = today.add(5, 'day');

// Makes connection to form tag to get the data
const form = document.querySelector('form');
let city;
// Gets localStorage data or creates an empty array if there is currently no data in localStorage
let searchHistory = JSON.parse(localStorage.getItem('City Names')) || [];
const historyLog = document.getElementById('history');

// Makes a connection to the current day section HTML
const currentCity = document.getElementById('current-city');
const currentDate = document.getElementById('current-date');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');

// Makes connection to card 1 HTML
const dateOne = document.getElementById('date-1');
const iconOne = document.getElementById('icon-1');
const tempOne = document.getElementById('temp-1');
const windOne = document.getElementById('wind-1');
const humidityOne = document.getElementById('humidity-1');

// Card 2
const dateTwo = document.getElementById('date-2');
const iconTwo = document.getElementById('icon-2');
const tempTwo = document.getElementById('temp-2');
const windTwo = document.getElementById('wind-2');
const humidityTwo = document.getElementById('humidity-2');

// Card 3
const dateThree = document.getElementById('date-3');
const iconThree = document.getElementById('icon-3');
const tempThree = document.getElementById('temp-3');
const windThree = document.getElementById('wind-3');
const humidityThree = document.getElementById('humidity-3');

// Card 4
const dateFour = document.getElementById('date-4');
const iconFour = document.getElementById('icon-4');
const tempFour = document.getElementById('temp-4');
const windFour = document.getElementById('wind-4');
const humidityFour = document.getElementById('humidity-4');

// Card 5
const dateFive = document.getElementById('date-5');
const iconFive = document.getElementById('icon-5');
const tempFive = document.getElementById('temp-5');
const windFive = document.getElementById('wind-5');
const humidityFive = document.getElementById('humidity-5');

// Adds event listener the the submit button 
// When clicked it will take in the input, save it, send the info to the api and render the data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    city = document.getElementById('city').value;
    searchHistory.push(city);
    localStorage.setItem('City Names', JSON.stringify(searchHistory));

    weatherInfoForSearchedCity()
    renderSearchHistory();
})

// Gets data for the current city searched
function weatherInfoForSearchedCity() {
    // Gets lat and long of the current city searched
    const getCoordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    fetch(getCoordinatesUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        console.log(lat);
        console.log(lon)
        // Uses the lat and long to get the 5 day forcast of the city searched
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        fetch(currentWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Renders the info obtained from the Open Weather Api
            // Current Day
            console.log(data)
            currentCity.innerHTML = data.city.name; //City Name
            currentDate.innerText = today.format('dddd, MMMM D YYYY'); // Today's Date
            icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`); // Image of current weather conditions
            temp.innerHTML = data.list[0].main.temp + '°F'; // Temperature
            wind.innerHTML = data.list[0].wind.speed + 'MPH' // Wind speed
            humidity.innerHTML = data.list[0].main.humidity + '%'; // Humidity

            // Card 1 (Tomorrow's forcast)
            dateOne.innerHTML = dayOne.format('ddd, MMMM D YYYY');
            iconOne.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png`);
            tempOne.innerHTML = data.list[2].main.temp + '°F';
            windOne.innerHTML = data.list[2].wind.speed + 'MPH';
            humidityOne.innerHTML = data.list[2].main.humidity + '%';

            // Card 2 (Day after tomorrow)
            dateTwo.innerHTML = dayTwo.format('ddd, MMMM D YYYY')
            iconTwo.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[10].weather[0].icon}.png`);
            tempTwo.innerHTML = data.list[10].main.temp + '°F';
            windTwo.innerHTML = data.list[10].wind.speed + 'MPH';
            humidityTwo.innerHTML = data.list[10].main.humidity + '%';

            // Card 3
            dateThree.innerHTML = dayThree.format('ddd, MMMM D YYYY');
            iconThree.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[18].weather[0].icon}.png`);
            tempThree.innerHTML = data.list[18].main.temp + '°F';
            windThree.innerHTML = data.list[18].wind.speed + 'MPH';
            humidityThree.innerHTML = data.list[18].main.humidity + '%';

            // Card 4
            dateFour.innerHTML = dayFour.format('ddd, MMMM D YYYY');
            iconFour.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[26].weather[0].icon}.png`);
            tempFour.innerHTML = data.list[26].main.temp + '°F';
            windFour.innerHTML = data.list[26].wind.speed + 'MPH';
            humidityFour.innerHTML = data.list[26].main.humidity + '%';

            // Card 5
            dateFive.innerHTML = dayFive.format('ddd, MMMMM D YYYY');
            iconFive.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[34].weather[0].icon}.png`);
            tempFive.innerHTML = data.list[34].main.temp + '°F';
            windFive.innerHTML = data.list[34].wind.speed + 'MPH';
            humidityFive.innerHTML = data.list[34].main.humidity + '%';
        })
    })
}

// Gets data for cities in the search history
function renderSearchHistory () {

    // Creates a div tag for each city saved in localStorage
    searchHistory.forEach(index => {
        const div = document.createElement('div');
        div.innerHTML = index;
        div.setAttribute('id', 'list-of-cities')
        historyLog.appendChild(div);
    })

    // Adds event listener to each new div tag created 
    // Clicking on a city will get info for the city and render the info on the dashboard
    const listOfCities = document.querySelectorAll('#list-of-cities');
    listOfCities.forEach(function(div) {
        div.addEventListener('click', () => {
            console.log(div.innerHTML)
            // Gets coordinates for city clicked on
            const getCoordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${div.innerHTML}&appid=${apiKey}`
            
            fetch(getCoordinatesUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                console.log(lat);
                console.log(lon)
                // Gets Info from the coordinates
                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        
                fetch(currentWeatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // Renders current day
                    currentCity.innerHTML = data.city.name;
                    currentDate.innerText = today.format('dddd, MMMM D YYYY');
                    icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`)
                    temp.innerHTML = data.list[0].main.temp + '°F';
                    wind.innerHTML = data.list[0].wind.speed + 'MPH';
                    humidity.innerHTML = data.list[0].main.humidity + '%';

                    // Renders card 1
                    dateOne.innerHTML = dayOne.format('ddd, MMMM D YYYY');
                    iconOne.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png`);
                    tempOne.innerHTML = data.list[2].main.temp + '°F';
                    windOne.innerHTML = data.list[2].wind.speed + 'MPH';
                    humidityOne.innerHTML = data.list[2].main.humidity + '%';

                    // Renders card 2
                    dateTwo.innerHTML = dayTwo.format('ddd, MMMM D YYYY')
                    iconTwo.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[10].weather[0].icon}.png`);
                    tempTwo.innerHTML = data.list[10].main.temp + '°F';
                    windTwo.innerHTML = data.list[10].wind.speed + 'MPH';
                    humidityTwo.innerHTML = data.list[10].main.humidity + '%';

                    // Renders card 3
                    dateThree.innerHTML = dayThree.format('ddd, MMMM D YYYY');
                    iconThree.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[18].weather[0].icon}.png`);
                    tempThree.innerHTML = data.list[18].main.temp + '°F';
                    windThree.innerHTML = data.list[18].wind.speed + 'MPH';
                    humidityThree.innerHTML = data.list[18].main.humidity + '%';

                    // Renders card 4
                    dateFour.innerHTML = dayFour.format('ddd, MMMM D YYYY');
                    iconFour.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[26].weather[0].icon}.png`);
                    tempFour.innerHTML = data.list[26].main.temp + '°F';
                    windFour.innerHTML = data.list[26].wind.speed + 'MPH';
                    humidityFour.innerHTML = data.list[26].main.humidity + '%';

                    // Renders card 5
                    dateFive.innerHTML = dayFive.format('ddd, MMMMM D YYYY');
                    iconFive.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[34].weather[0].icon}.png`);
                    tempFive.innerHTML = data.list[34].main.temp + '°F';
                    windFive.innerHTML = data.list[34].wind.speed + 'MPH';
                    humidityFive.innerHTML = data.list[34].main.humidity + '%';
                })
            })
        })
    })

}

renderSearchHistory();


