const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const apiKey = '53bb54e0aeba3cc6d2b0a228a6021fbd';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=43.44&lon=-70.79&units=imperial&appid=${apiKey}`;

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

apiFetch();

function displayResults(data) {
    const temp = Math.round(data.main.temp); //Round the temperature
    currentTemp.innerHTML = `${temp}&deg;F`;
    const iconCode = data.weather[0]?.icon;
    const iconsrc = iconCode? `https://openweathermap.org/img/w/${data.weather[0].icon}.png` : 'images/weather.png';
    const descriptions = data.weather.map(item => item.description); //Get all descriptions
    const capDescriptions = descriptions.map(desc =>
        desc.split(' ') //Capitalize all words in the description
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
    const finalDescription = capDescriptions.join(', ') || 'Weather Icon';
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', finalDescription);
    captionDesc.textContent = finalDescription;
}