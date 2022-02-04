console.log(`1 Смена изображений в секции portfolio +25
2 Перевод страницы на два языка +25\n3 Переключение светлой и тёмной темы +25
4 Дополнительный функционал: выбранный пользователем язык отображения страницы и
светлая или тёмная тема сохраняются при перезагрузке страницы +5
Total score: 80 / 75`);

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

let cntVideo = document.querySelector(".container-video-player");
let videoPlayerButton = document.querySelector(".video-player-button");
let video = document.querySelector(".video-player");
let videoPlayerStartStop = document.querySelector(
  ".video-player-controll-button"
);
let volumeButton = document.querySelector(".volume-button");

function startVideo(event) {
  videoPlayerButton.classList.toggle("button-visible-non");
  videoPlayerStartStop.classList.toggle("video-active");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function togleVideo(event) {
  if (event.target.classList.contains("video-player")) {
    startVideo();
  }
}

function toggleVolume() {
  volumeButton.classList.toggle("video-active");
  video.muted = !video.muted;
}

cntVideo.addEventListener("click", togleVideo);
videoPlayerStartStop.addEventListener("click", startVideo);
volumeButton.addEventListener("click", toggleVolume);
