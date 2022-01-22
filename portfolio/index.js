const hamburger = document.querySelector('.hamburger');
const adaptivemenu = document.querySelector('.nav');
const allLincs = document.querySelectorAll('.nav-link');
const openMenu = () => {
    hamburger.classList.toggle('hamburger-active');
    adaptivemenu.classList.toggle('open-menu');
}
const closeMenu = () => {
    hamburger.classList.remove('hamburger-active');
    adaptivemenu.classList.remove('open-menu');
}
hamburger.addEventListener('click', openMenu);
allLincs.forEach((element) => element.addEventListener('click', closeMenu));