const display = document.querySelector('.spotlights-container');

async function fetchMemberData() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Network error");
        }
        const memberData = await response.json();
        renderSpotlights(memberData);
    } catch (error) {
        console.error("Failed to fetch member data:", error);
    }
}


function renderSpotlights(memberData) {
    display.innerHTML = "";
    const silverGoldMembers = memberData.members.filter(member =>
        member.membership_level === "Silver" || member.membership_level === "Gold"
    );
    
    const selectedMembers = getRandomMembers(silverGoldMembers, 3);

    selectedMembers.forEach(member => {
        const spotlight = document.createElement("div");
        spotlight.classList.add("spotlight");
        spotlight.innerHTML = `
        <img src="${member.image_file}" alt="${member.name}" loading="lazy" class="member-image">
        <h2>${member.name}</h2>
        <p>${member.address.street} ${member.address['street 2'] ? member.address['street 2'] + ',' : ''}${member.address.city}, ${member.address.state} ${member.address.zip}</p>
        <p><i>Phone:</i> ${member.phone_number}</p>
        <p>https://${member.website_url}</p>
        <p><i>Membership Level:</i> ${member.membership_level}</p>
        <p><i>Membership Start Date:</i> ${member.member_start_date}</p>`;

        display.appendChild(spotlight);
    });
}

function getRandomMembers(arr, min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

fetchMemberData();