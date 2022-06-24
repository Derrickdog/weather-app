// KEY 67bcb51d44ba92aa7e2060b44f068eb6
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=67bcb51d44ba92aa7e2060b44f068eb6

const cityText = document.getElementById('city');
const tempText = document.getElementById('temp');
const tempHighText = document.getElementById('temp-high');
const tempLowText = document.getElementById('temp-low');
const weatherText = document.getElementById('weather');

fetchWeather();

async function fetchWeather() {
    let city = 'london';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=67bcb51d44ba92aa7e2060b44f068eb6&q`, {mode: 'cors'});
    const weatherData = await response.json();
    // console.log(weatherData);
    // console.log(weatherData.name);
    // console.log(weatherData.main.temp);
    // console.log(weatherData.main.temp_min);
    // console.log(weatherData.main.temp_max);
    // console.log(weatherData.weather[0].main);
    displayText(weatherData.name, weatherData.main.temp, weatherData.main.temp_max, weatherData.main.temp_min, weatherData.weather[0].main);
}

function displayText(city, temp, tempHigh, tempLow, weather) {
    cityText.textContent = city;
    tempText.textContent = temp;
    tempHighText.textContent = tempHigh;
    tempLowText.textContent = tempLow;
    weatherText.textContent = weather;
}
