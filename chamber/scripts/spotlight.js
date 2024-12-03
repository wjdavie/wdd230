document.addEventListener('DOMContentLoaded', () => {
    async function fetchSpotlights() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            const goldSilverMembers = data.members.filter(member =>
                member.membership_level === "Gold" || member.membership_level === "Silver"
            );
            const selectedMembers = getRandomMembers(goldSilverMembers);
            
            displaySpotlights(selectedMembers);
        } catch (error) {
            console.error("Error loading data:", error)
        }
    }


    function getRandomMembers(members) {
        const selectedMembers = [];
        const availableMembers = [...members];

        for (let i=0; i < 3; i++) {
            if (availableMembers.length === 0) break;

            const randomIndex = Math.floor(Math.random() * availableMembers.length);
            selectedMembers.push(availableMembers[randomIndex]);
            availableMembers.splice(randomIndex, 1);
        }

        return selectedMembers;
    }

    function displaySpotlights(selectedMembers) {
        const spotlightContainer = document.querySelector("#business-spotlights .spotlights-container");

        spotlightContainer.innerHTML='';

        selectedMembers.forEach(member => {
            const spotlightCard = document.createElement('div');
            spotlightCard.classList.add('spotlight-card');

            spotlightCard.innerHTML = `
            <img src="${member.image_file}" alt="${member.name}" loading="lazy" class="spotlight-image">
            <h3>${member.name}</h3>
            <p>${member.address.street} ${member.address['street 2'] ? member.address['street 2'] + ',' : ''}${member.address.city}, ${member.address.state} ${member.address.zip}</p>
            <p><i>Phone:</i> ${member.phone_number}</p>
            <p>https://${member.website_url}</p>
            <p><i>Membership Level:</i> ${member.membership_level}</p>
            <p><i>Membership Start Date:</i> ${member.member_start_date}</p>`;

            spotlightContainer.appendChild(spotlightCard);
        });
    }

    window.addEventListener('load', fetchSpotlights);
});