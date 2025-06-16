/*fetching current weather and 5-day forecast data from weather API*/
const API_KEY = 'c2da0407f2d54cd0a34214112251506';

export async function getWeather(location) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Weather API error:", error);
    }
}