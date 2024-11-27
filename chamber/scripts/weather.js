const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed = document.querySelector('.wind-speed');
const windChill = document.querySelector('.wind-chill');
const forecastTemps = {
    tomorrow: document.querySelector('#tomorrow-temp'),
    dayafter: document.querySelector('#dayafter-temp'),
    next: document.querySelector('#next-temp'),
};
const apiKey = '53bb54e0aeba3cc6d2b0a228a6021fbd';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=43.44&lon=70.78&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    //current weather
    const currentWeather = data.list[0];
    const temp = Math.round(currentWeather.main.temp); //Round the temperature
    currentTemp.innerHTML = `${temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    const descriptions = currentWeather.weather.map(item => item.description); //Get all descriptions
    let desc = currentWeather.weather[0].description;
    desc = desc.split(' ') //Capitalize all words in the description
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
    
    const windSpeedValue = currentWeather.wind.speed;
    windSpeed.textContent = `${windSpeedValue.toFixed(1)}`;
    const windChillValue = calculateWindChill (temp, windSpeedValue);
    windChill.innerHTML = `${windChillValue.toFixed(1)}`;

    forecastTemps.tomorrow.innerHTML = `${Math.round(data.list[8].main.temp)}`;
    forecastTemps.dayafter.innerHTML = `${Math.round(data.list[16].main.temp)}`;
    forecastTemps.next.innerHTML = `${Math.round(data.list[24].main.temp)}`;
}

function calculateWindChill (temp, windSpeed) {
    if (temp <= 50 && windSpeed > 3) {
        return 35.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temp * Math.pow(windSpeed, 0.16));
    } else {
        return temp;
    }
}

apiFetch();