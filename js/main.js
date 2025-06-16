import { getWeather } from './weather.js';
import { displayWeather } from './weatherDisplay.js';

function getCurrentLocationWeather() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const weatherData = await getWeather(`${lat},${lon}`);
            displayWeather(weatherData);
        }, (error) => {
            console.error("Geolocation error:", error);
            // the fallback to a default city
            loadWeatherByLocation("Milwaukee");
        });
    } else {
        // the fallback location if geolocation not supported
        loadWeatherByLocation("Milwaukee");
    }
}

document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("search-input").value.trim();
    if (location) {
        loadWeatherByLocation(location);
    }
});

async function loadWeatherByLocation(location) {
    const weatherData = await getWeather(location);
    displayWeather(weatherData);
}

getCurrentLocationWeather();