/*create the daily weather forecast that will show on the website*/

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

}

