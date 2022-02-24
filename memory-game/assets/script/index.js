const cards = document.querySelectorAll(".cards");
let isRotatedCard = false;
let lockCards = false;
let firstCard, secondCard;

function compareCards() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }
  unrotateCard();
}

function disableCards() {
  isRotatedCard = false;
  lockCards = false;
  firstCard.removeEventListener("click", rotateCard);
  secondCard.removeEventListener("click", rotateCard);
}

function unrotateCard() {
  isRotatedCard = false;
  setTimeout(() => {
    lockCards = false;
    firstCard.classList.remove("rotate");
    secondCard.classList.remove("rotate");
  }, 1500);
}

function rotateCard() {
  if (lockCards) {
    return;
  }
  if (!isRotatedCard) {
    isRotatedCard = true;
    firstCard = this;
    this.classList.add("rotate");
    return;
  } else if (firstCard === this) {
    return;
  }
  this.classList.add("rotate");
  secondCard = this;
  lockCards = true;
  compareCards();
}

function mixCards() {
  cards.forEach((item) => {
    item.style.order = Math.floor(Math.random() * 20);
  });
}
cards.forEach((item) => item.addEventListener("click", rotateCard));
mixCards();
