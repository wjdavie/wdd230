document.addEventListener('DOMContentLoaded', () => {
	const hamButton = document.querySelector('#menu');
	const navigation = document.querySelector('.nav-links');

	hamButton.addEventListener('click', () => {
		navigation.classList.toggle('open');
		hamButton.classList.toggle('open');
		console.log("Menu button clicked");
		console.log(navigation.classList);
	});
});