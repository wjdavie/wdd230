const baseURL = "https://wjdavie.github.io/wdd230/";
const linksURL = "https://wjdavie.github.io/wdd230/data/links.json";
const learningActivitiesCard = document.getElementById('learning-activities');

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.lessons);
}

const displayLinks = (weeks) => {
    learningActivitiesCard.innerHTML = '';

    weeks.forEach((week) => {
        let weekLesson = document.createElement('li');
        weekLesson.innerHTML = `<span class="number">${week.lesson}:</span>`;

        week.links.forEach((link) => {
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', link.url);
            linkElement.textContent = link.title;

            weekLesson.appendChild(linkElement);
        });

        learningActivitiesCard.appendChild(weekLesson);
    });
};

getLinks();