document.addEventListener('DOMContentLoaded', function() {
    fetch('data/pricing.json')
    .then(response => response.json())
    .then(data => {
        const rentalList = document.getElementById('rental-list');
        const rentalTable = document.querySelector('#rental-table tbody');

        data.rentals.forEach(rental => {
            const rentalItem = document.createElement('div');
            rentalItem.classList.add('rental-item');
            rentalItem.innerHTML = `
                <div class="rental-description">
                    <h3>${rental.name}</h3>
                    <p>Max Capacity: ${rental.max} person(s)</p>
                    <p><strong>Reservation Prices:</strong> Half Day: ${rental.reservation.half}, Full Day: ${rental.reservation.full}</p>
                    <p><strong>Walk-in Prices:</strong> Half Day: ${rental['Walk-in'].half}, Full Day: ${rental['Walk-in'].full}</p>
                </div>
                <div class="rental-image">
                    <img src="${rental.image}" alt="${rental.name}" class-"image">
                </div>
                `;
                rentalList.appendChild(rentalItem);
                
                const tableRow = document.createElement('tr');
                tableRow.innerHTML = `
                <td>${rental.name}</td>
                <td>${rental.max}</td>
                <td>${rental.reservation.half}</td>
                <td>${rental.reservation.full}</td>
                <td>${rental['Walk-in'].half}</td>
                <td>${rental['Walk-in'].full}</td>
                `;
            rentalTable.appendChild(tableRow);
        });
    })
    .catch(error => {
        console.error('Error loading data', error);
    });
});