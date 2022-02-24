const cards = document.querySelectorAll(".cards");

const rotateCard = (e) => {
  e.currentTarget.classList.toggle("rotate");
};

cards.forEach((item) => item.addEventListener("click", rotateCard));
