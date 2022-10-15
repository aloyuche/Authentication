const musicContent = document.querySelector(".music-container");
const musicPlay = document.querySelector("#play");
const musicPrev = document.querySelector("#prev");
const musicNext = document.querySelector("#next");
const musicAudio = document.querySelector("#audio");
const musicProgress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const musicCover = document.querySelector("#cover");

// Song titles
const songs = [
  "DonWilli",
  "DonWillia",
  "DonMoen",
  "DonnieM",
  "DonWilly",
  "DonnieMI",
  "Before_the_throne",
];

// Keep Songs track
let songIndex = 6;

//Initially load song info
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
function playSong() {
  musicContent.classList.add("play");
  musicPlay.querySelector("i.fas").classList.remove("fa-play");
  musicPlay.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContent.classList.remove("play");
  musicPlay.querySelector("i.fas").classList.add("fa-play");
  musicPlay.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
musicPlay.addEventListener("click", () => {
  const isPlaying = musicContent.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change songs events
musicPrev.addEventListener("click", prevSong);
musicNext.addEventListener("click", nextSong);

audio.addEventListener("timeUpdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);