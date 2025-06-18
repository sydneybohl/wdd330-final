/*compute and create the personalized "Comfort Score" based on the weather and air quality for the day*/
export function calculateComfortScore(weather, airQuality) {
    let score = 0;

    // Temperature
    const temp = weather.temp_f;
    if (temp >= 65 && temp <= 75) score += 2;
    else if ((temp >= 55 && temp < 65) || (temp > 75 && temp <= 85)) score += 1;
    else score += 0;

    // Humidity
    const humidity = weather.humidity;
    if (humidity >= 30 && humidity <= 60) score += 2;
    else if ((humidity >= 20 && humidity < 30) || (humidity > 60 && humidity <= 70)) score += 1;
    else score += 0;

    // Wind speed
    const wind = weather.wind_mph;
    if (wind < 10) score += 2;
    else if (wind >= 10 && wind <= 20) score += 1;
    else score += 0;

    // Air Quality Index
    const aqi = airQuality["us-epa-index"];
    if (aqi === 1 || aqi === 2) score += 2;
    else if (aqi === 3) score += 1;
    else score += 0;

    // Max total = 8
    return score;
}

export function getComfortLabel(score) {
    if (score >= 7) return "Very Comfortable";
    if (score >= 5) return "Comfortable";
    if (score >= 3) return "Moderate Comfort";
    return "Uncomfortable";
}