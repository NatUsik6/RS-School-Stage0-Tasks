import playList from "./playList.js";

const playButton = document.querySelector('.play');
playButton.addEventListener('click', playAudio);
playButton.addEventListener('click', togglePauseButton);

const songNameElement = document.querySelector(".song-name");
const authorNameElement = document.querySelector(".author-name");

const playbackBar = document.querySelector(".playback-bar");
playbackBar.addEventListener("change", changePlaybackBarValue);

const currentTimeElement = document.querySelector(".current-time");
const songDurationElement = document.querySelector(".song-duration");

const playerImage = document.querySelector(".player-image");
const mainContainer = document.querySelector(".main-container");

let isPlay = false;
let currentSoundNumber = 0;

const audio = new Audio();
audio.addEventListener("canplay", () => playbackBar.max = Math.ceil(audio.duration));
let timerId;
setNewSongInfo();

function playAudio() {
    clearInterval(timerId);
    if (isPlay) {
        isPlay = false;
        audio.pause();
        return;
    }

    isPlay = true;
    audio.play();
    timerId = setInterval(() => {
        const time = new Date(0);
        time.setSeconds(++playbackBar.value);
        currentTimeElement.textContent = time.toLocaleTimeString().slice(3);
    }, 1000);
}

function togglePauseButton() {
    if (isPlay && !playButton.classList.contains('pause')) {
        playButton.classList.add('pause');
    }

    if (!isPlay) {
        playButton.classList.remove('pause');
    }
}

const playPrevButton = document.querySelector('.play-prev');
playPrevButton.addEventListener('click', playPrevAudio);
playPrevButton.addEventListener('click', togglePauseButton);

function playPrevAudio() {
    currentSoundNumber = currentSoundNumber == 0 ? playList.length - 1 : currentSoundNumber - 1;
    isPlay = false;
    setNewSongInfo();
    playAudio();
}

const playNextButton = document.querySelector('.play-next');
playNextButton.addEventListener('click', playNextAudio);
playNextButton.addEventListener('click', togglePauseButton);

function playNextAudio() {
    currentSoundNumber = currentSoundNumber == playList.length - 1 ? 0 : currentSoundNumber + 1;
    isPlay = false;
    setNewSongInfo();
    playAudio();
}

function setNewSongInfo() {
    authorNameElement.textContent = playList[currentSoundNumber].author;
    songNameElement.textContent = playList[currentSoundNumber].title;
    audio.src = playList[currentSoundNumber].src;
    playbackBar.value = 0;
    currentTimeElement.textContent = "00:00";
    songDurationElement.textContent = playList[currentSoundNumber].duration;
    playerImage.style.background = `url(${playList[currentSoundNumber].imgSrc})`;
    playerImage.style.backgroundSize = "cover";
    mainContainer.style.backgroundImage = `url(${playList[currentSoundNumber].imgSrc})`;
}

function changePlaybackBarValue() {
    audio.currentTime = playbackBar.value;
    const time = new Date(0);
    time.setSeconds(playbackBar.value);
    currentTimeElement.textContent = time.toLocaleTimeString().slice(3);
}