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
        errorText.innerHTML = '&nbsp;';
        displayText(weatherData);
        console.log(weatherData);
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
    let weather = weatherData.weather[0].main;
    if(weather === 'Clouds'){
        weather = 'Cloudy';
    }
    else if(weather === 'Clear'){
        weather = 'Sunny';
    }
    weatherText.innerHTML = weather;
    tempText.innerHTML = Math.round(weatherData.main.temp) + '&#8457;';
    tempHighText.innerHTML = 'High: ' + Math.round(weatherData.main.temp_max) + '&#8457;';
    tempLowText.innerHTML = 'Low: ' + Math.round(weatherData.main.temp_min) + '&#8457;';
}

function displayError(){
    errorText.textContent = 'City not found';
}

fetchCity('los angeles');