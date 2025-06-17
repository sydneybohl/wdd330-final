// display and format the air quality index 
export function displayAirQuality(air) {
    const aqiCard = document.getElementById("air-quality-card");

    const epaIndex = air["us-epa-index"];
    const descriptions = [
        "Good", "Moderate", "Unhealthy for Sensitive Groups",
        "Unhealthy", "Very Unhealthy", "Hazardous"
    ];
    const description = descriptions[epaIndex - 1] || "Unknown";

    aqiCard.innerHTML = `
    <div class="aqi-box aqi-${epaIndex}">
      <p><strong>US EPA Index:</strong> ${epaIndex} - ${description}</p>
      <ul>
        <li><strong>PM2.5:</strong> ${air.pm2_5.toFixed(1)} µg/m³</li>
        <li><strong>PM10:</strong> ${air.pm10.toFixed(1)} µg/m³</li>
        <li><strong>O₃:</strong> ${air.o3.toFixed(1)} µg/m³</li>
        <li><strong>NO₂:</strong> ${air.no2.toFixed(1)} µg/m³</li>
      </ul>
    </div>
  `;
}
