const burgerButton = document.querySelector(".burger-button");
burgerButton.addEventListener("click", toggleBurgerMenuOpen);
const iconProfile = document.querySelector(".icon-profile");
iconProfile.addEventListener("click", toggleDropMenuOpen);

function toggleBurgerMenuOpen() {
    const header = document.querySelector("header");
    header.classList.toggle("burger-menu-open");
    if (header.classList.contains("drop-menu-open")) {
        header.classList.remove("drop-menu-open");
    } else {
        document.body.style.overflow = document.body.style.overflow === "hidden" ? "" : "hidden";
    }
}

function toggleDropMenuOpen() {
    const header = document.querySelector("header");
    header.classList.toggle("drop-menu-open");
    if (header.classList.contains("burger-menu-open")) {
        header.classList.remove("burger-menu-open");
    } else {
        document.body.style.overflow = document.body.style.overflow === "hidden" ? "" : "hidden";
    }
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => navLink.addEventListener("click", disableBurgerMenuOpen));

function disableBurgerMenuOpen() {
    const header = document.querySelector("header");
    header.classList.remove("burger-menu-open");
    document.body.style.overflow = "";
}

function disableDropMenuOpen() {
    const header = document.querySelector("header");
    header.classList.remove("drop-menu-open");
    document.body.style.overflow = "";
}

const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", disableBurgerMenuOpen);
overlay.addEventListener("click", disableDropMenuOpen);

const arrowLeft = document.querySelector(".arrow-left")
arrowLeft.addEventListener("click", moveSliderLeft);
const arrowRight = document.querySelector(".arrow-right")
arrowRight.addEventListener("click", moveSliderRight);

const sliderTrack = document.querySelector(".slider-track");
const imageWidth = 475;
let sliderPosition = 0;

function moveSliderLeft() {
    if (sliderPosition == 0) {
        return;
    }

    sliderPosition--;
    moveSlider();
}

function moveSliderRight() {
    if (sliderPosition == 4) {
        return;
    }

    sliderPosition++;
    moveSlider();
}

const sliderPoints = document.querySelectorAll(".separate-container");
sliderPoints.forEach(sliderPoint => sliderPoint.addEventListener("click", changeSliderPosition));

function changeSliderPosition() {
    sliderPosition = this.dataset.pointNumber;
    moveSlider();
}

function moveSlider() {
    sliderTrack.style.transform = `translateX(-${imageWidth * sliderPosition}px)`;
    sliderPoints.forEach(sliderPoint => sliderPoint.children[0].classList.remove("active"));
    sliderPoints[sliderPosition].children[0].classList.add("active");
}

const seasonSelectors = document.querySelectorAll(".input-wrapper");
seasonSelectors.forEach(seasonSelector => seasonSelector.addEventListener("click", changeSeasonTab));
const seasonContainers = document.querySelectorAll(".season-container");

function changeSeasonTab() {
    seasonContainers.forEach(seasonContainer => seasonContainer.classList.add("tab-disabled"));
    seasonContainers[this.dataset.seasonNumber].classList.remove("tab-disabled");
}