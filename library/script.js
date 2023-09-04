document.addEventListener("readystatechange", onDocumentLoaded);

function onDocumentLoaded() {
    if (document.readyState === "interactive") {
        if (localStorage.getItem("is-user-authorized") == "true") {
            iconProfile.innerHTML = `<div class="profile-initials-wrapper" title="${localStorage.getItem("first-name")} ${localStorage.getItem("last-name")}"><p class="profile-initials">${localStorage.getItem("first-name")[0] + localStorage.getItem("last-name")[0]}</p></div>`;
            document.getElementById("drop-menu-my-profile-button").classList.remove("disabled");
            document.getElementById("drop-menu-log-out-button").classList.remove("disabled");
        } else {
            document.getElementById("drop-menu-log-in-button").classList.remove("disabled");
            document.getElementById("drop-menu-register-button").classList.remove("disabled");
        }
    }
}

// HEADER

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

const dropMenuRegisterButton = document.getElementById("drop-menu-register-button");
dropMenuRegisterButton.addEventListener("click", disableDropMenuOpen);
dropMenuRegisterButton.addEventListener("click", openRegisterForm);

const buttonLogOut = document.getElementById("drop-menu-log-out-button");
buttonLogOut.addEventListener("click", logOut);

function logOut() {
    localStorage.setItem("is-user-authorized", false);
    location.reload();
}

const buttonSignUp = document.querySelector(".button-sign-up");
buttonSignUp.addEventListener("click", openRegisterForm);

function openRegisterForm() {
    const header = document.querySelector("header");
    header.classList.toggle("register-form-open");
    document.body.style.overflow = "hidden";
}

const registerCross = document.querySelector(".register-cross");
registerCross.addEventListener("click", closeRegisterForm);

function closeRegisterForm() {
    const header = document.querySelector("header");
    header.classList.remove("register-form-open");
    document.body.style.overflow = "";
}

document.forms["register-form"].addEventListener("submit", setUserInfo);

function setUserInfo() {
    localStorage.setItem("first-name", this["first-name"].value);
    localStorage.setItem("last-name", this["last-name"].value);
    localStorage.setItem("email", this["email"].value);
    localStorage.setItem("password", this["password"].value);
    localStorage.setItem("is-user-authorized", true);
}

const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", disableBurgerMenuOpen);
overlay.addEventListener("click", disableDropMenuOpen);

const modalOverlay = document.querySelector(".modal-overlay");
modalOverlay.addEventListener("click", closeRegisterForm);

// ABOUT SECTION

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