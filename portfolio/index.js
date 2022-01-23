console.log(`Вёрстка соответствует макету. Ширина экрана 768px +48\n
Ни на одном из разрешений до 320px включительно не появляется горизонтальная 
полоса прокрутки.\nВесь контент страницы при этом сохраняется: не обрезается 
и не удаляется +15\n
На ширине экрана 768рх и меньше реализовано адаптивное меню +22\n
Total score: 85 / 75`);


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