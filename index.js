const key = '67bcb51d44ba92aa7e2060b44f068eb6';

const searchField = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const errorText = document.getElementById('error');

const cityText = document.getElementById('city');

const tempText = document.getElementById('temp');
const tempHighText = document.getElementById('temp-high');
const tempLowText = document.getElementById('temp-low');
const weatherText = document.getElementById('weather');

searchButton.addEventListener('click', () => {
    fetchCity(searchField.value);
});

async function fetchCity(city) {
    try{
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`, {mode: 'cors'});
        const cityData = await response.json();
        fetchWeather(cityData[0].lat, cityData[0].lon);
        displayCity(cityData);
    }
    catch(err) {
        displayError();
    }
}

async function fetchWeather(lat, lon) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`, {mode: 'cors'});
        const weatherData = await response.json();
        displayText(weatherData);
    }
    catch(err){
        console.log(err);
    }
}

function displayCity(cityData) {
    const currentCountry = cityData[0].country;
    let location = '';

    location += cityData[0].name;
    if(currentCountry === 'US' || currentCountry === 'GB'){
        location += ', ' + cityData[0].state;
    }
    location += ', ' + currentCountry;

    cityText.textContent = location;
}

function displayText(weatherData) {
    tempText.textContent = weatherData.main.temp;
    tempHighText.textContent = weatherData.main.temp_max;
    tempLowText.textContent = weatherData.main.temp_min;
    weatherText.textContent = weatherData.weather[0].main;
}

function displayError(){
    errorText.textContent = 'City not found';
}

fetchCity('london');