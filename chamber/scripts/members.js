const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#member-directory");
const spotlightContainer = document.querySelector(".spotlights-container");

async function fetchMemberData() {
    try {
        const response = await fetch("data/members.json");
        console.log("Fetched member data: ", memberData);
        if (!response.ok) {
            throw new Error("Network error");
        }
        const memberData = await response.json();
        renderCards(memberData);
        renderSpotlight(memberData);
        return memberData;
    } catch (error) {
        console.error("Failed to fetch member data:", error);
    }
}


function renderCards(memberData) {
    display.innerHTML = "";
    memberData.members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");
        card.innerHTML = `
        <img src="${member.image_file}" alt="${member.name}" loading="lazy" class="member-image">
        <h2>${member.name}</h2>
        <p>${member.address.street} ${member.address['street 2'] ? member.address['street 2'] + ',' : ''}${member.address.city}, ${member.address.state} ${member.address.zip}</p>
        <p><i>Phone:</i> ${member.phone_number}</p>
        <p>https://${member.website_url}</p>
        <p><i>Membership Level:</i> ${member.membership_level}</p>
        <p><i>Membership Start Date:</i> ${member.member_start_date}</p>`;

        display.appendChild(card);
    });
}

function renderList(memberData) {
    display.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("member-list");

    memberData.members.forEach(member => {
        const li = document.createElement('li');
        li.classList.add("member-item");
        li.innerHTML = `
        <div class="member-column">${member.name}</div>
        <div class="member-column">${member.address.street} ${member.address['street 2'] ? member.address['street 2'] + ', ' : ''}${member.address.city}, ${member.address.state} ${member.address.zip}</div>
        <div class="member-column"><i>Phone:</i> ${member.phone_number}</div>
        <div class="member-column">https://${member.website_url}</div>
        <div class="member-column"><i>Membership Level:</i> ${member.membership_level}</div>
        <div class="member-column"><i>Membership Start Date:</i> ${member.member_start_date}</div>`;

        ul.appendChild(li);
    });

    display.appendChild(ul);
}

function renderSpotlight(memberData) {
    if (!spotlightContainer) return;
    const spotlightMembers = memberData.members.filter(member => member.membership_level === "Silver" || member.membership_level === "Gold");
    const selectedMembers = getRandomMembers(spotlightMembers, 3);

    spotlightContainer.innerHTML = "";
    selectedMembers.forEach(member => {
        const spotlightItem = document.createElement("div");
        spotlightItem.classList.add("spotlight");
        spotlightItem.innerHTML = `
            <img src="${member.image_file}" alt="${member.name}" loading="lazy" class="member-image">
            <h3>${member.name}</h3>
            <p>${member.address.street} ${member.address['street 2'] ? member.address['street 2'] + ',' : ''}${member.address.city}, ${member.address.state} ${member.address.zip}</p>
            <p><i>Phone:</i> ${member.phone_number}</p>
            <p>https://${member.website_url}</p>
            <p><i>Membership Level:</i> ${member.membership_level}</p>
            <p><i>Membership Start Date:</i> ${member.member_start_date}</p>`;

        spotlightContainer.appendChild(spotlightItem);
    });
}

function getRandomMembers(members, num) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

fetchMemberData().then(data => {
    memberData = data;

    gridbutton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
        renderCards(memberData);
    });

    listbutton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
        renderList(memberData);
    });
});