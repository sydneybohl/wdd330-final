/*create and generate the friendly commentary or suggestions based on the weather and pollen*/

export function generateSuggestions(weather, airQuality) {
    const suggestions = [];

    const temp = weather.temp_f;
    if (temp > 90) {
        suggestions.push({ label: "Temperature", text: "It's very hot. Stay hydrated and avoid strenuous outdoor activity." });
    } else if (temp < 40) {
        suggestions.push({ label: "Temperature", text: "It's cold outside. Wear warm layers." });
    }

    const aqi = airQuality["us-epa-index"];
    if (aqi >= 4) {
        suggestions.push({ label: "Air Quality", text: "Air quality is poor. People with respiratory issues should limit time outdoors." });
    } else if (aqi === 3) {
        suggestions.push({ label: "Air Quality", text: "Air quality is moderate. Sensitive groups should take precautions." });
    }

    const condition = weather.condition.text.toLowerCase();
    if (condition.includes("rain")) {
        suggestions.push({ label: "Weather", text: "Rain is expected. Don't forget an umbrella." });
    } else if (condition.includes("snow")) {
        suggestions.push({ label: "Weather", text: "Snowy conditions. Dress warmly and drive carefully." });
    } else if (condition.includes("sunny") || condition.includes("clear")) {
        suggestions.push({ label: "Weather", text: "Sunny day! Don’t forget sunscreen and sunglasses." });
    }

    const wind = weather.wind_mph;
    if (wind > 20) {
        suggestions.push({ label: "Wind", text: "High winds. Secure loose items and be cautious if outside." });
    }

    // Ensure at least one suggestion appears
    if (suggestions.length === 0) {
        suggestions.push({
            label: "General",
            text: "Enjoy your day! No major weather concerns in your area."
        });
    }

    return suggestions;
}