const toggle = document.querySelector("#dark-mode input");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});