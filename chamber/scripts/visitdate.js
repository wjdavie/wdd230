function displayVisitMessage() {
    const currentVisit = new Date();
    const lastVisit = localStorage.getItem('lastVisit');

    if (!lastVisit) {
        document.getElementById('visit-message').innerText = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentVisit - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            document.getElementById('visit-message').innerText = "Back so soon! Awesome!";
        } else {
            const dayWord = daysDifference === 1 ? "day" : "days";
            document.getElementById('visit-message').innerText = `You last visited ${daysDifference} ${dayWord} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit.toISOString());
}

displayVisitMessage();
