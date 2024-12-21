const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const humidity = document.querySelector('.humidity');
const forecastTemps = {
    tomorrow: document.querySelector('#tomorrow-temp')
};
const bannerTemp = document.querySelector('#temp-banner');
const apiKey = '53bb54e0aeba3cc6d2b0a228a6021fbd';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=20.45&lon=86.92&units=imperial&appid=${apiKey}`;

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
    //Weather Icon
    const iconsrc = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    //Show all descriptions
    const descriptions = currentWeather.weather.map(item => item.description); //Get all descriptions
    let desc = descriptions.join(', ');
    desc = desc.split(' ') //Capitalize all words in the description
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    //Weather Icon description
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
    //Humidity
    const humidityValue = Math.round(currentWeather.main.humidity);
    humidity.textContent = `${humidityValue}%`;
    //High temperature
    const tempMax = Math.round(currentWeather.main.temp_max);
    document.getElementById('high-temp').textContent = `${tempMax}`;

    //Tomorrow's forecast
    let tomorrowTemp = null;
    for (let forecast of data.list) {
        if (forecast.dt_txt.includes('15:00:00')) {
            tomorrowTemp = Math.round(forecast.main.temp);
            break;
        }
    }
    forecastTemps.tomorrow.innerHTML = tomorrowTemp ? `${tomorrowTemp}&deg;F` : 'N/A';
}

apiFetch();