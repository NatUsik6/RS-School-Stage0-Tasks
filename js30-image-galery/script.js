"use strict"

document.addEventListener("DOMContentLoaded", onDocumentLoaded);
const gallery = document.querySelector(".gallery");
const searchFormInput = document.querySelector(".search-form__input");

async function onDocumentLoaded() {
    clearInput();
    const data = await getData("cats");
    placeNewImages(data);
}

const clearInputButton = document.querySelector(".search-form__clear-input-button");
clearInputButton.addEventListener("click", clearInput);

function clearInput() {
    searchFormInput.value = "";
    searchFormInput.focus();
}

document.forms["search-form"].addEventListener("submit", searchImages);

async function searchImages(event) {
    event.preventDefault();
    const data = await getData(this["search-input"].value);
    placeNewImages(data);
}

async function getData(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=Lg7LP7DOkqKyNxjHKbsXQrmOzLn3cMlX7GJRBQrLOuw`;
    const response = await fetch(url);
    return await response.json();
}

function placeNewImages(data) {
    gallery.textContent = "";

    for (let imageData of data.results) {
        const img = document.createElement("img");
        img.src = imageData.urls.regular;
        img.className = "gallery__image";
        gallery.appendChild(img);
    }
}