document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('temp-banner');
    const closeButton = document.getElementById('close-banner');


    closeButton.addEventListener('click', function () {
        banner.style.display = 'none';
    });
});