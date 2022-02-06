import i18Obj from "./translate.js";
// MENU
const hamburger = document.querySelector(".hamburger");
const adaptivemenu = document.querySelector(".nav");

const openMenu = () => {
  hamburger.classList.toggle("hamburger-active");
  adaptivemenu.classList.toggle("open-menu");
};
const closeMenu = (event) => {
  if (event.target.classList.contains("nav-link")) {
    hamburger.classList.remove("hamburger-active");
    adaptivemenu.classList.remove("open-menu");
  }
};

hamburger.addEventListener("click", openMenu);
adaptivemenu.addEventListener("click", closeMenu);

// PORNFOLIO
const containerButton = document.querySelector(".container-button");
const portfolioButton = document.querySelectorAll(".portfolio-button");
const portfolioFoto = document.querySelectorAll(".foto-item");
const fotoItemStyle = [
  "autumn-foto",
  "summer-foto",
  "spring-foto",
  "winter-foto",
];
let activeSeason = "";
function changeImage(event) {
  if (event.target.classList.contains("portfolio-button")) {
    portfolioButton.forEach((item) => item.classList.remove("active-button"));
    event.target.classList.add("active-button");
    const season = event.target.dataset.season;
    activeSeason = season;
    portfolioFoto.forEach((img) => {
      fotoItemStyle.forEach((fotoStyle) => {
        img.classList.remove(fotoStyle);
      });
      img.classList.add(season);
    });
  }
}

function startImg(seas) {
  activeSeason = seas;
  portfolioButton.forEach((item) => {
    item.classList.remove("active-button");
    if (item.dataset.season === seas) {
      item.classList.add("active-button");
    }
  });
  portfolioFoto.forEach((img) => {
    fotoItemStyle.forEach((fotoStyle) => {
      img.classList.remove(fotoStyle);
    });
    img.classList.add(seas);
  });
}

containerButton.addEventListener("click", changeImage);

//   TRANSLATION
let activeLang = "";
const engLang = document.querySelector(".en-lng");
const rusLang = document.querySelector(".ru-lng");

function getTranslate(lang) {
  activeLang = lang;
  if (lang === "ru") {
    engLang.classList.remove("active-lng");
    rusLang.classList.add("active-lng");
  } else if (lang === "en") {
    engLang.classList.add("active-lng");
    rusLang.classList.remove("active-lng");
  }
  const translaitList = document.querySelectorAll("[data-i18n]");
  translaitList.forEach((elem) => {
    if (elem.placeholder) {
      elem.placeholder = i18Obj[lang][elem.dataset.i18n];
      elem.textContent = "";
    }
    elem.textContent = i18Obj[lang][elem.dataset.i18n];
  });
}

function switchLangRu() {
  getTranslate("ru");
}

function switchLangEn() {
  getTranslate("en");
}

engLang.addEventListener("click", switchLangEn);
rusLang.addEventListener("click", switchLangRu);

// THEME
let light = "";
const themeButton = document.querySelector(".theme-icon");
const themeItems = document.querySelectorAll(
  ".theme, .nav-link, .container-title, .title, .portfolio-button, .price-item"
);

function changeTheme() {
  light === "black" || light === "" ? (light = "light") : (light = "black");
  themeButton.classList.toggle("active-theme");
  themeItems.forEach((item) => {
    item.classList.toggle("light-theme");
  });
}

themeButton.addEventListener("click", changeTheme);

// LOCAL STORAGE

function setLocalStorage() {
  localStorage.setItem("lang", activeLang);
  localStorage.setItem("theme", light);
  localStorage.setItem("activeSeason", activeSeason);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    const lang = localStorage.getItem("lang");
    getTranslate(lang);
  }
  if (localStorage.getItem("theme") === "light") {
    changeTheme();
  }

  if (localStorage.getItem("activeSeason")) {
    const seas = localStorage.getItem("activeSeason");

    if (seas === "") {
      startImg("autumn-foto");
    } else {
      startImg(seas);
    }
  }
}

window.addEventListener("load", getLocalStorage);

// PRELOAD

function preloadImages() {
  const seasons = ["winter", "spring", "summer", "autumn"];
  seasons.forEach((seasn) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${seasn}/${i}.jpg`;
    }
  });
}
preloadImages();

// CASTOM VIDEO PLAYER

const cntVideo = document.querySelector(".container-video-player");
const videoPlayerButton = document.querySelector(".video-player-button");
const video = document.querySelector(".video-player");
const videoPlayerStartStop = document.querySelector(
  ".video-player-controll-button"
);
const volumeButton = document.querySelector(".volume-button");
const lengthVideo = document.querySelector(".length-video");
const progressVideo = document.querySelector(".progress");
const progressVideoBar = document.querySelector(".progress-bar");
const rewindButtons = document.querySelector(".container-button-rewind");
const containerVolumeBar = document.querySelector(".container-volume-bar");
const volumeBar = document.querySelector(".volume-bar");

let mutedId = false;

function startVideo(event) {
  if (video.paused) {
    video.play();
    videoPlayerButton.classList.add("button-visible-non");
    videoPlayerStartStop.classList.add("video-active");
    lengthVideo.textContent = getTime(video.duration);
  } else {
    video.pause();
    videoPlayerButton.classList.remove("button-visible-non");
    videoPlayerStartStop.classList.remove("video-active");
  }
}

function getTime(time) {
  let hours = Math.floor(time / 60 / 60);
  let minutes = Math.floor(time / 60) - hours * 60;
  let seconds = Math.floor(time % 60);
  let formatTime = [
    hours.toString().padStart(1, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  return formatTime;
}

function udateProgress() {
  let formatTime = getTime(video.currentTime);
  progressVideo.textContent = formatTime;
  let procent = (video.currentTime / video.duration) * 100;
  progressVideoBar.style.backgroundImage = `linear-gradient(to right, #bdae82 0%,
     #bdae82 ${procent}%, rgba(0, 0, 0, 0.3) ${procent}%, rgba(0, 0, 0, 0.3) 100% )`;
}

function togleVideo(event) {
  if (
    event.target.classList.contains("video-player") ||
    event.target.classList.contains("video-player-button-icon")
  ) {
    startVideo();
  }
}

function toggleVolume() {
  if (video.volume !== 0) {
    volumeButton.classList.toggle("video-active");
    video.muted = !video.muted;
    mutedId = !mutedId;
  }
}

function volumeChange() {
  let procentVolume = video.volume * 100;
  volumeBar.style.backgroundImage = `linear-gradient(to right, #bdae82 0%,
     #bdae82 ${procentVolume}%, rgba(255, 255, 255, 0.3) ${procentVolume}%, rgba(255, 255, 255, 0.3) 100% )`;
  if (video.volume === 0) {
    volumeButton.classList.add("video-active");
    video.muted = true;
  } else if (!mutedId) {
    volumeButton.classList.remove("video-active");
    video.muted = false;
  }
}

function videoRewindBar(event) {
  video.currentTime =
    (event.offsetX / progressVideoBar.offsetWidth) * video.duration;
}

function rewind(event) {
  video.currentTime += parseFloat(event.target.dataset.rewind);
}

cntVideo.addEventListener("click", togleVideo);
videoPlayerStartStop.addEventListener("click", startVideo);
volumeButton.addEventListener("click", toggleVolume);
video.addEventListener("volumechange", volumeChange);
video.addEventListener("timeupdate", udateProgress);
rewindButtons.addEventListener("click", rewind);

progressVideoBar.addEventListener("click", videoRewindBar);

let mouseDown = false;
let mouseOver = false;
progressVideoBar.addEventListener("mousemove", (e) => {
  if (mouseDown && mouseOver) {
    videoRewindBar(e);
  }
});
progressVideoBar.addEventListener("mouseover", () => (mouseOver = true));
progressVideoBar.addEventListener("mousedown", () => (mouseDown = mouseOver));
progressVideoBar.addEventListener("mouseup", () => {
  mouseDown = false;
});
progressVideoBar.addEventListener("mouseout", () => {
  mouseOver = false;
  mouseDown = false;
});

// VOLUME

function volumeRewindBar(event) {
  let volume = event.offsetX / volumeBar.offsetWidth;
  if (volume < 0.02) {
    volume = 0;
  }
  video.volume = volume;
}

volumeBar.addEventListener("click", volumeRewindBar);

let mouseDownVolume = false;
let mouseOverVolume = false;
volumeBar.addEventListener("mousemove", (e) => {
  if (mouseDownVolume && mouseOverVolume) {
    volumeRewindBar(e);
  }
});
volumeBar.addEventListener(
  "mousedown",
  () => (mouseDownVolume = mouseOverVolume)
);
volumeBar.addEventListener("mouseup", () => {
  mouseDownVolume = false;
});
volumeBar.addEventListener("mouseover", () => (mouseOverVolume = true));
volumeBar.addEventListener("mouseout", () => {
  mouseOverVolume = false;
  mouseDownVolume = false;
});
