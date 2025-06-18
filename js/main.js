import { getWeather } from './weather.js';
import { displayWeather } from './weatherDisplay.js';
import { saveSearch, getSearchHistory } from './storage.js';

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

// Load weather by a typed location
async function loadWeatherByLocation(location) {
    const weatherData = await getWeather(location);
    displayWeather(weatherData);
}

// Populate dropdown with saved history
function updateDropdown() {
    const history = getSearchHistory();
    if (history.length === 0) {
        dropdown.classList.add("hidden");
        return;
    }

    dropdown.innerHTML = history
        .map(item => `<button type="button">${item}</button>`)
        .join("");

    dropdown.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            searchInput.value = button.textContent;
            dropdown.classList.add("hidden");
        });
    });

    dropdown.classList.remove("hidden");
}

// DOM elements 
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const dropdown = document.getElementById("search-dropdown");

// Event listeners
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    saveSearch(query);
    dropdown.classList.add("hidden");
    await loadWeatherByLocation(query);
});

searchInput.addEventListener("focus", updateDropdown);
searchInput.addEventListener("blur", () => {
    setTimeout(() => dropdown.classList.add("hidden"), 200);
});

// Initialize
window.addEventListener("DOMContentLoaded", async () => {
    await loadDefaultCity();
    tryUpdateWithGeolocation();
});