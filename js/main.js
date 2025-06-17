import { getWeather } from './weather.js';
import { displayWeather } from './weatherDisplay.js';

// Show default city weather immediately
async function loadDefaultCity() {
    const defaultCity = "Milwaukee";
    const weatherData = await getWeather(defaultCity);
    displayWeather(weatherData);
}

// Try to get user's location and update if successful
function tryUpdateWithGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const weatherData = await getWeather(`${lat},${lon}`);
            displayWeather(weatherData);
        }, (error) => {
            console.warn("Geolocation error or denied:", error);
            // Do nothing — default city is already shown
        });
    } else {
        console.warn("Geolocation not supported");
    }
}

// Manual search handler
document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("search-input").value.trim();
    if (location) {
        loadWeatherByLocation(location);
    }
});

// Load weather by a typed location
async function loadWeatherByLocation(location) {
    const weatherData = await getWeather(location);
    displayWeather(weatherData);
}

// Initialize: show default, then try updating to user's location
window.addEventListener("DOMContentLoaded", async () => {
    await loadDefaultCity();         // Step 1: show default city
    tryUpdateWithGeolocation();      // Step 2: update with location if allowed
});