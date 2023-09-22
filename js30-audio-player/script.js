import playList from "./playList.js";

const playButton = document.querySelector('.play');
playButton.addEventListener('click', playAudio);
playButton.addEventListener('click', togglePauseButton);

let isPlay = false;
let currentSoundNumber = 0;

const audio = new Audio();

function playAudio() {
    if (isPlay) {
        isPlay = false;
        audio.pause();
        return;
    }

    isPlay = true;
    audio.src = playList[currentSoundNumber].src;
    audio.currentTime = 0;
    audio.play();
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
    playAudio();
}

const playNextButton = document.querySelector('.play-next');
playNextButton.addEventListener('click', playNextAudio);
playNextButton.addEventListener('click', togglePauseButton);

function playNextAudio() {
    currentSoundNumber = currentSoundNumber == playList.length - 1 ? 0 : currentSoundNumber + 1;
    isPlay = false;
    playAudio();
}