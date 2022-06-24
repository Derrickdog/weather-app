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
    }
    catch(err) {
        displayError();
    }
}

async function fetchWeather(lat, lon) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`, {mode: 'cors'});
        const weatherData = await response.json();
        displayText(weatherData.name, weatherData.main.temp, weatherData.main.temp_max, weatherData.main.temp_min, weatherData.weather[0].main);
    }
    catch(err){
        console.log(err);
    }
}

function displayText(city, temp, tempHigh, tempLow, weather) {
    cityText.textContent = city;
    tempText.textContent = temp;
    tempHighText.textContent = tempHigh;
    tempLowText.textContent = tempLow;
    weatherText.textContent = weather;
}

function displayError(){
    errorText.textContent = 'City not found';
}

fetchCity('london');