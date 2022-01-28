import i18Obj from './translate.js';
// MENU
const hamburger = document.querySelector('.hamburger');
const adaptivemenu = document.querySelector('.nav');

const openMenu = () => {
    hamburger.classList.toggle('hamburger-active');
    adaptivemenu.classList.toggle('open-menu');
}
const closeMenu = (event) => {
    if (event.target.classList.contains('nav-link')) {
        hamburger.classList.remove('hamburger-active');
        adaptivemenu.classList.remove('open-menu');
    }
}

hamburger.addEventListener('click', openMenu);
adaptivemenu.addEventListener('click', closeMenu);

// PORNFOLIO
const containerButton = document.querySelector('.container-button');
const portfolioButton = document.querySelectorAll('.portfolio-button');
const portfolioFoto = document.querySelectorAll('.foto-item');
const fotoItemStyle = ['autumn-foto', 'summer-foto', 'spring-foto', 'winter-foto'];

function changeImage(event) {
    if(event.target.classList.contains('portfolio-button')) {
        portfolioButton.forEach(item => item.classList.remove('active-button'));
        event.target.classList.add('active-button');
        const season = event.target.dataset.season;
        portfolioFoto.forEach(img => {
            fotoItemStyle.forEach(fotoStyle => {
                img.classList.remove(fotoStyle);
            });
            img.classList.add(season);
        })
    }
  }

  containerButton.addEventListener('click', changeImage);

//   TRANSLATION
let actuvLang = '';
const engLang = document.querySelector('.en-lng');
const rusLang = document.querySelector('.ru-lng');

function getTranslate(lang) {
    if (lang === 'ru') {
        engLang.classList.remove('active-lng');
        rusLang.classList.add('active-lng');
    } else if (lang === 'en') {
        engLang.classList.add('active-lng');
        rusLang.classList.remove('active-lng');
    }
    const translaitList = document.querySelectorAll('[data-i18n]');
    translaitList.forEach(elem => {
        if (elem.placeholder) {
            elem.placeholder = i18Obj[lang][elem.dataset.i18n];
            elem.textContent = ''
        }
    elem.textContent = i18Obj[lang][elem.dataset.i18n];
    });
}

function switchLangRu() {
    actuvLang = 'ru';
    getTranslate('ru');
}

function switchLangEn() {
    actuvLang = 'en';
    getTranslate('en');
}

engLang.addEventListener('click', switchLangEn);
rusLang.addEventListener('click', switchLangRu);
// getTranslate('ru')

// PRELOAD

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach(seasn => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${seasn}/${i}.jpg`;
          }
    })
   
  }
  preloadImages();