const cards = document.querySelectorAll(".cards");
const startGameButton = document.querySelector(".button-play");
const movesText = document.getElementById("moves");
const inputName = document.querySelector(".imput-name");
const playerNameRecord = document.querySelectorAll(".record");
const recordMoves = document.querySelectorAll(".moves-text");
const containerCards = document.querySelectorAll(".container-cards");

let isRotatedCard = false;
let lockCards = false;
let firstCard, secondCard;
let rotatedCards = 0;
let moves = 0;
let playerName = "";
let records = [];

for (let i = 0; i < 10; i++) {
  records.push({ name: "Player:", moves: "999" });
}

function fillRecords() {
  for (let i = 0; i < 10; i++) {
    playerNameRecord[i].textContent = records[i].name;
    recordMoves[i].textContent = records[i].moves;
  }
}

function stopGame() {
  rotatedCards = 0;
  records.push({ name: playerName, moves: moves });
  records.sort((a, b) => a.moves - b.moves);
  records.pop();
  fillRecords();
}

function compareCards() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    rotatedCards += 1;
    if (rotatedCards === 10) {
      stopGame();
    }
    return;
  }
  unrotateCard();
}

function disableCards() {
  isRotatedCard = false;
  lockCards = false;
  firstCard.classList.remove("rotate");
  firstCard.classList.add("stack");
  secondCard.classList.remove("rotate");
  secondCard.classList.add("stack");
  firstCard.parentNode.classList.add("disable");
  secondCard.parentNode.classList.add("disable");
  firstCard.removeEventListener("click", rotateCard);
  secondCard.removeEventListener("click", rotateCard);
}

function unrotateCard() {
  isRotatedCard = false;
  setTimeout(() => {
    lockCards = false;
    firstCard.classList.remove("rotate");
    secondCard.classList.remove("rotate");
  }, 1000);
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
  moves += 1;
  movesText.textContent = moves;
  compareCards();
}

function mixCards() {
  containerCards.forEach((item) => {
    item.style.order = Math.floor(Math.random() * 20);
  });
}

const startGame = () => {
  rotatedCards = 0;
  if (inputName.value.split(" ").join("")) {
    playerName = inputName.value + ":";
  } else {
    playerName = "Player:";
  }
  cards.forEach((item) => {
    item.addEventListener("click", rotateCard);
    item.classList.remove("stack");
  });
  containerCards.forEach((item) => {
    item.classList.remove("disable");
  });
  mixCards();
  moves = 0;
  movesText.textContent = 0;
};

const setLocalStorage = () => {
  localStorage.setItem("recordsMemory", JSON.stringify(records));
};

const getLocalStorage = () => {
  if (localStorage.getItem("recordsMemory")) {
    let rec = localStorage.getItem("recordsMemory");
    records = JSON.parse(rec);
    fillRecords();
  }
};

const pressButton = () => {
  startGameButton.classList.add("press-button");
};

const unPressButton = () => {
  startGameButton.classList.remove("press-button");
};

startGameButton.addEventListener("click", startGame);
startGameButton.addEventListener("mousedown", pressButton);
startGameButton.addEventListener("mouseup", unPressButton);
startGameButton.addEventListener("mouseout", unPressButton);
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
