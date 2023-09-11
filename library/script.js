document.addEventListener("readystatechange", onDocumentLoaded);

function onDocumentLoaded() {
    if (document.readyState === "interactive") {
        if (localStorage.getItem("is-user-authorized") == "true") {
            iconProfile.innerHTML = `<div class="profile-initials-wrapper" title="${localStorage.getItem("first-name")} ${localStorage.getItem("last-name")}"><p class="profile-initials">${localStorage.getItem("first-name")[0] + localStorage.getItem("last-name")[0]}</p></div>`;
            document.querySelector(".numbers-of-card-number").textContent = localStorage.getItem("card-number");
            document.getElementById("drop-menu-my-profile-button").classList.remove("disabled");
            document.getElementById("drop-menu-log-out-button").classList.remove("disabled");
            document.querySelector(".initial-letters").textContent = localStorage.getItem("first-name")[0] + localStorage.getItem("last-name")[0];
            document.querySelector(".initials-decoding").textContent = `${localStorage.getItem("first-name")} ${localStorage.getItem("last-name")}`;

            const dropMenuProfileText = document.querySelector(".drop-menu-profile");
            dropMenuProfileText.textContent = localStorage.getItem("card-number");
            dropMenuProfileText.classList.add("card-number-in-profile");

            setDigitalLibraryCardData();
        } else {
            document.getElementById("drop-menu-log-in-button").classList.remove("disabled");
            document.getElementById("drop-menu-register-button").classList.remove("disabled");
            document.querySelector(".button-sign-up").classList.remove("disabled");
            document.querySelector(".button-log-in").classList.remove("disabled");
        }
    }
}

function setDigitalLibraryCardData() {
    document.querySelector(".find-card-library-title").textContent = "Your Library card";
    document.querySelector(".get-card-title").textContent = "Visit your profile";
    document.querySelector(".get-card-description").textContent = "With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.";
    document.querySelector(".button-profile").classList.remove("disabled");
    document.getElementById("readers-name").value = `${localStorage.getItem("first-name")} ${localStorage.getItem("last-name")}`;
    document.getElementById("card-name").value = localStorage.getItem("card-number");
    document.querySelector(".white-board").classList.add("library-cards-open");
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
    document.getElementById("readers-name").value = null;
    document.getElementById("card-name").value = null;
    location.reload();
}

const dropMenuLogInButton = document.getElementById("drop-menu-log-in-button");
dropMenuLogInButton.addEventListener("click", disableDropMenuOpen);
dropMenuLogInButton.addEventListener("click", openLogInForm);

function openLogInForm() {
    const header = document.querySelector("header");
    header.classList.toggle("log-in-form-open");
    document.body.style.overflow = "hidden";
}

const logInCross = document.querySelector(".log-in-cross");
logInCross.addEventListener("click", closeLogInForm);

function closeLogInForm() {
    const header = document.querySelector("header");
    header.classList.remove("log-in-form-open");
    document.body.style.overflow = "";
}

const loginInRegistration = document.querySelector(".login-in-registration");
loginInRegistration.addEventListener("click", closeRegisterForm);
loginInRegistration.addEventListener("click", openLogInForm);

const registerInLogIn = document.querySelector(".register-in-log-in");
registerInLogIn.addEventListener("click", closeLogInForm);
registerInLogIn.addEventListener("click", openRegisterForm);

const buttonSignUp = document.querySelector(".button-sign-up");
buttonSignUp.addEventListener("click", openRegisterForm);

const buttonLogIn = document.querySelector(".button-log-in");
buttonLogIn.addEventListener("click", openLogInForm);

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

const dropMenuMyProfileButton = document.getElementById("drop-menu-my-profile-button");
dropMenuMyProfileButton.addEventListener("click", disableDropMenuOpen);
dropMenuMyProfileButton.addEventListener("click", openMyProfile);

function openMyProfile() {
    const header = document.querySelector("header");
    header.classList.toggle("my-profile-open");
    document.body.style.overflow = "hidden";
}

const myProfileCross = document.querySelector(".my-profile-cross");
myProfileCross.addEventListener("click", closeMyProfile);

function closeMyProfile() {
    const header = document.querySelector("header");
    header.classList.remove("my-profile-open");
    document.body.style.overflow = "";
}

const copyCardNumberButton = document.querySelector(".copy-card-number");
copyCardNumberButton.addEventListener("click", copyCardNumber);

function copyCardNumber() {
    navigator.clipboard.writeText(localStorage.getItem("card-number"));
}

document.forms["register-form"].addEventListener("submit", setUserInfo);

function setUserInfo() {
    localStorage.setItem("first-name", this["first-name"].value);
    localStorage.setItem("last-name", this["last-name"].value);
    localStorage.setItem("email", this["email"].value);
    localStorage.setItem("password", this["password"].value);
    localStorage.setItem("is-user-authorized", true);

    const minNumber = 4294967296;
    const maxNumber = 68719476735;

    let randomNumber = Math.ceil(Math.random() * (maxNumber - minNumber) + minNumber);
    let hexNumber = randomNumber.toString(16).toUpperCase();
    localStorage.setItem("card-number", hexNumber);
}

document.forms["log-in-form"].addEventListener("submit", logInUser);

function logInUser() {
    if (this["email"].value == localStorage.getItem("email")
        || this["email"].value == localStorage.getItem("card-number")) {
        if (this["password"].value == localStorage.getItem("password")) {
            localStorage.setItem("is-user-authorized", true);
        }
    }
}

const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", disableBurgerMenuOpen);
overlay.addEventListener("click", disableDropMenuOpen);

const modalOverlay = document.querySelector(".modal-overlay");
modalOverlay.addEventListener("click", closeRegisterForm);
modalOverlay.addEventListener("click", closeMyProfile);
modalOverlay.addEventListener("click", closeLogInForm);

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

// FAVORITES SECTION 

const buttonsBuy = document.querySelectorAll(".button-buy");
buttonsBuy.forEach(buttonBuy => buttonBuy.addEventListener("click", buyBook));

function buyBook() {
    if (localStorage.getItem("is-user-authorized") != "true") {
        openLogInForm();
        return;
    }

    if (localStorage.getItem("is-library-card-bought") != "true") {
        openBuyLibraryCard();
        return;
    }

    // Buy book logic
}

function openBuyLibraryCard() {
    document.getElementById("section-favorites").classList.add("buy-a-card-open");
}

const crossHeaderBuyCard = document.querySelector(".cross-header-buy-a-card");
crossHeaderBuyCard.addEventListener("click", closeBuyLibraryCard);
const buyCardOverlay = document.querySelector(".buy-a-card-overlay");
buyCardOverlay.addEventListener("click",closeBuyLibraryCard);

function closeBuyLibraryCard() {
    document.getElementById("section-favorites").classList.remove("buy-a-card-open");
}

// LIBRARY CARD SECTION 

const buttonProfile = document.querySelector(".button-profile");
buttonProfile.addEventListener("click", openMyProfile);

const buttonCheckCard = document.querySelector(".button-check");
buttonCheckCard.addEventListener("click", checkCard);

function checkCard(event) {
    event.preventDefault();

    if (document.getElementById("readers-name").value == `${localStorage.getItem("first-name")} ${localStorage.getItem("last-name")}`
        && document.getElementById("card-name").value == localStorage.getItem("card-number")) {
        const whiteBoard = document.querySelector(".white-board");
        whiteBoard.classList.add("library-cards-open");
        setTimeout(() => {
            whiteBoard.classList.remove("library-cards-open");
            document.getElementById("readers-name").value = null;
            document.getElementById("card-name").value = null;
        }, 10000);
    }
}