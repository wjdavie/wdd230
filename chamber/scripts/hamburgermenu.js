const hamButton = document.querySelector('hamburger');
const navigation = document.querySelector('.nav-links');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});