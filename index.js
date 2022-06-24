// KEY 67bcb51d44ba92aa7e2060b44f068eb6
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=67bcb51d44ba92aa7e2060b44f068eb6

const cityText = document.getElementById('city');
const tempText = document.getElementById('temp');
const tempHighText = document.getElementById('temp-high');
const tempLowText = document.getElementById('temp-low');
const weatherText = document.getElementById('weather');

const searchField = document.getElementById('search');
const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', () => {
    // fetchWeather(searchField.value);
});

// fetchWeather('chicago');
// if (!response.ok) throw new Error(`City ${city} not found`);
// const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67bcb51d44ba92aa7e2060b44f068eb6&q`, {mode: 'cors'});

fetchWeather(41.061150, -74.013000);
// fetchWeather(-37.813629, 144.963058);

async function fetchWeather(lat, lon) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=67bcb51d44ba92aa7e2060b44f068eb6&q`, {mode: 'cors'});
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
