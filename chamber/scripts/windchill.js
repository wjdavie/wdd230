function displayWeather() {
    const temperature = parseFloat(document.querySelector('.temperature').textContent);
    const windSpeed = parseFloat(document.querySelector('.wind-speed').textContent);

    document.querySelector('.weather-card p:nth-of-type(1)').textContent = `Temperature: ${temperature}°F `;
    document.querySelector('.weather-card p:nth-of-type(2)').textContent = `Wind Speed: ${windSpeed} mph`;

    const windChill = calculateWindChill(temperature, windSpeed);
        document.querySelector('.wind-chill').textContent = `${windChill.toFixed(1)}`;
}

function calculateWindChill (temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3) {
        return 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
    } else {
        return temperature;
    }
}

displayWeather();