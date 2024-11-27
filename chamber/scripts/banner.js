document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('event-banner');
    const closeButton = document.getElementById('close-banner');

    const currentDay = new Date().getDay();

    if (currentDay === 1 || currentDay === 2 || currentDay === 3) {
        banner.style.display = 'block';
    }

    closeButton.addEventListener('click', function () {
        banner.style.display = 'none';
    });
});