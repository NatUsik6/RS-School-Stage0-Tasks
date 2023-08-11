const burgerButton = document.querySelector(".burger-button");
burgerButton.addEventListener("click", toggleBurgerMenuOpen);

function toggleBurgerMenuOpen() {
    const header = document.querySelector("header");
    header.classList.toggle("burger-menu-open");
    document.body.style.overflow = document.body.style.overflow === "hidden" ? "" : "hidden";
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => navLink.addEventListener("click", disableBurgerMenuOpen));

function disableBurgerMenuOpen() {
    const header = document.querySelector("header");
    if (header.classList.contains("burger-menu-open")) {
        header.classList.remove("burger-menu-open")
    }

    document.body.style.overflow = "";
}