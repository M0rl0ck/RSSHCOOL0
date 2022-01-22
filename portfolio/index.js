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