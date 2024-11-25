const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#member-directory");

async function fetchMemberData() {
    try {
        const respone = await fetch("data/members.json");
        if (!respone.ok) {
            throw new Error("Network error");
        }
        const memberData = await Response.json();
        renderCards(memberData);
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
        card.innerHTML = `<img src="${member.image_file}" alt="${member.name}" class="member-image">
        <h2>${member.name}</h2>
        <p>${member.address.street} ${member.address.['street 2'] ? member.address['street 2'] + ',' : ''}${member.address.city}, ${member.address.state} ${member.address.zip}</p>
        <p>Phone: ${member.phone_number}</p>
        <p><a href="https://${member.website_url}" target="_blank">Visit Website</a></p>
        <p>Membership Level: ${member.membership_level}</p>
        <p>Membership Start Date: ${member.member_start_date}`;

        display.appendChild(card);
    });
}

function renderList(memberData) {
    display.innerHTML = "";
    const ul = document.createElement("ul");
    memberData.members.forEach(member => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${member.name}</strong> - 
        ${member.address.street} ${member.address['street 2'] ? member.address['street 2'] + ', ' : ''}${member.address.city}, ${member.address.state} ${member.address.zip} |
        Phone: ${member.phone_number} |
        <a href="https://${member.website_url}" target="_blank">Visit Website</a> |
        Membership Level: ${member.membership_level} |
        Membership Start Date: ${member.member_start_date}`;

        ul.appendChild(li);
    });

    display.appendChild(ul);
}

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
    renderCards(memberData);
});

listbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
    renderCards(memberData);
});

let memberData;
fetchMemberData().then(data => {
    memberData = data;
});