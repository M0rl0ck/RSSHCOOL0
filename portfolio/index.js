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
const langList = document.dataset.i18n;
console.log(langList);