//script to get the current year
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = '©' + currentYear;

//script to calculate the last modified date.
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = 'Last Modified ' + lastModified;

//script to set the hidden input to with the current date/time
document.getElementById('dttm').value = Date.now();