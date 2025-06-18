/*formating daily weather, five-day forecast, air quality, and comfort score*/
import { displayAirQuality } from "./airQuality.js";
import { calculateComfortScore, getComfortLabel } from './comfortScore.js';
import { generateSuggestions } from "./suggestions.js";

export function displayWeather(data) {
  const container = document.getElementById("daily-forecast");
  container.innerHTML = `
    <h3>${data.location.name}, ${data.location.region}</h3>
    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" />
    <p>${data.current.condition.text}</p>
    <p>Temperature: ${data.current.temp_f} °F</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind Speed: ${data.current.wind_mph} mph</p>
  `;

  // Display 5-day forecast
  const forecastContainer = document.getElementById("five-day-forecast");
  forecastContainer.innerHTML = ""; // Clear old cards

  data.forecast.forecastday.forEach(day => {
    const card = document.createElement("div");
    card.className = "forecast-card";

    const date = new Date(day.date).toLocaleDateString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric'
    });

    card.innerHTML = `
      <h4>${date}</h4>
      <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
      <p>High: ${day.day.maxtemp_f}°F</p>
      <p>Low: ${day.day.mintemp_f}°F</p>
    `;
    forecastContainer.appendChild(card);
  });

  displayAirQuality(data.current.air_quality);

  // Calculate Comfort Score
  const comfortScore = calculateComfortScore(data.current, data.current.air_quality);
  const comfortLabel = getComfortLabel(comfortScore);

  const comfortContainer = document.getElementById("comfort-score");
  comfortContainer.innerHTML = `
    <div class="comfort-card">
      <h4>Comfort Score</h4>
      <p><strong>${comfortScore}</strong> - ${comfortLabel}</p>
    </div>
  `;
  // Suggestions 
  const suggestions = generateSuggestions(data.current, data.current.air_quality);
  const suggestionBox = document.getElementById("weather-suggestions");
  suggestionBox.innerHTML = ""; // Clear previous

  suggestions.forEach(({ label, text }) => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.innerHTML = `
    <h4>${label}</h4>
    <p>${text}</p>
  `;
    suggestionBox.appendChild(item);
  });
}
