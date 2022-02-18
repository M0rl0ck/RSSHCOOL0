import {
  fild,
  counter,
  blockSise,
  colors,
  figuresName,
  figures,
} from "./const.js";

const canvas = document.querySelector(".canvas");
const canvasNext = document.querySelector(".next-canvas");
const context = canvas.getContext("2d");
const contextNext = canvasNext.getContext("2d");

let rAF = null;

let currentFigure = {};

let nextFigure = {};

let countTime = 0;
let count = counter; //speed

let gameStatus = false;

let score = 0;
let lines = 0;
let level = 0;
let countLines = 0;

const scoreText = document.getElementById("score");
const linesText = document.getElementById("lines");
const levelText = document.getElementById("level");

let records = [];
for (let i = 0; i < 10; i++) {
  records.push({ name: "Player", score: 0 });
}

const recordsText = document.querySelectorAll(".records");
const nameText = document.querySelectorAll(".name");
const inputName = document.querySelector(".imput-name");
let playerName = "Player";

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genFigure = () => {
  let color = getRandom(1, colors.length - 1);
  let figureName = figuresName[getRandom(0, figuresName.length - 1)];
  let figureNum = getRandom(0, figures[figureName].kind.length - 1);
  return {
    matrix: figures[figureName].kind[figureNum],
    name: figureName,
    figureIndex: figureNum,
    row: 0,
    col: figures[figureName].col,
    color: color,
  };
};

const isCanMoove = (obj) => {
  for (let r = 0; r < obj.matrix.length; r++) {
    for (let c = 0; c < obj.matrix.length; c++) {
      if (
        obj.matrix[r][c] &&
        (obj.col + c < 0 ||
          obj.col + c >= fild[0].length ||
          obj.row + r >= fild.length ||
          fild[obj.row + r][obj.col + c])
      ) {
        return false;
      }
    }
  }
  return true;
};

const rotateFigure = (obj) => {
  if (obj.name === "O") {
    return obj;
  }
  let tempObj = Object.assign({}, obj);
  let index = tempObj.figureIndex + 1;
  index = index % 4;
  tempObj.figureIndex = index;
  tempObj.matrix = figures[obj.name].kind[index];
  if (isCanMoove(tempObj)) {
    return tempObj;
  }
  return obj;
};

const moveDown = (obj) => {
  let tempObj = Object.assign({}, obj);
  tempObj.row = tempObj.row + 1;
  if (isCanMoove(tempObj)) {
    return tempObj;
  }
  return obj;
};

const moveFigure = (obj, n) => {
  let tempObj = Object.assign({}, obj);
  tempObj.col = tempObj.col + n;
  if (isCanMoove(tempObj)) {
    return tempObj;
  }
  return obj;
};

const getFigure = () => {
  if (nextFigure.name === undefined) {
    nextFigure = genFigure();
  }
  let tempFigure = Object.assign({}, nextFigure);
  nextFigure = genFigure();
  showNext();
  return tempFigure;
};

const showNext = () => {
  let offset = nextFigure.name === "O" ? 1 : 0;
  contextNext.clearRect(0, 0, canvasNext.width, canvasNext.height);
  contextNext.fillStyle = colors[nextFigure.color];
  for (let r = 0; r < nextFigure.matrix.length; r++) {
    for (let c = 0; c < nextFigure.matrix.length; c++) {
      if (nextFigure.matrix[r][c]) {
        contextNext.fillRect(
          (offset + c) * blockSise,
          (offset + r) * blockSise,
          blockSise - 1,
          blockSise - 1
        );
      }
    }
  }
};

const mountFigure = (obj) => {
  for (let r = 0; r < obj.matrix.length; r++) {
    for (let c = 0; c < obj.matrix.length; c++) {
      if (obj.matrix[r][c]) {
        fild[obj.row + r][obj.col + c] = obj.color;
      }
    }
  }
};

const checkRow = (r) => {
  for (let c = 0; c < fild[r].length; c++) {
    if (fild[r][c] === 0) {
      return false;
    }
  }
  return true;
};

const changeScore = () => {
  lines++;
  countLines++;
  if (countLines >= 5) {
    level++;
    count -= 2;
    countLines = 0;
  }
  score += 10 * (level + 1);
  scoreText.textContent = score;
  linesText.textContent = lines;
  levelText.textContent = level;
};

const checkFild = () => {
  for (let row = fild.length - 1; row >= 0; ) {
    if (checkRow(row)) {
      for (let r = row; r > 0; r--) {
        for (let c = 0; c < fild[0].length; c++) {
          fild[r][c] = fild[r - 1][c];
        }
      }
      for (let c = 0; c < fild[0].length; c++) {
        fild[0][c] = 0;
      }
      changeScore();
    } else {
      row--;
    }
  }
};

const stopGame = () => {
  cancelAnimationFrame(rAF);
  gameStatus = false;
  records.push({ name: playerName, score: score });
  records.sort((a, b) => b.score - a.score);
  records.pop();
  context.fillStyle = "black";
  context.globalAlpha = 0.7;
  context.fillRect(0, canvas.height / 2 - 40, canvas.width, 80);
  context.globalAlpha = 1;
  context.fillStyle = "white";
  context.font = "36px serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
  fillRecords();
};

const mainCycle = () => {
  rAF = requestAnimationFrame(mainCycle);

  if (countTime++ > count) {
    currentFigure.row++;
    countTime = 0;
  }
  if (!isCanMoove(currentFigure)) {
    currentFigure.row--;
    mountFigure(currentFigure);

    checkFild();
    currentFigure = getFigure();
    if (!isCanMoove(currentFigure)) {
      return stopGame();
    }
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 10; c++) {
      if (fild[r][c]) {
        context.fillStyle = colors[fild[r][c]];
        context.fillRect(
          c * blockSise,
          r * blockSise,
          blockSise - 1,
          blockSise - 1
        );
      }
    }
  }
  context.fillStyle = colors[currentFigure.color];
  for (let r = 0; r < currentFigure.matrix.length; r++) {
    for (let c = 0; c < currentFigure.matrix.length; c++) {
      if (currentFigure.matrix[r][c]) {
        context.fillRect(
          (currentFigure.col + c) * blockSise,
          (currentFigure.row + r) * blockSise,
          blockSise - 1,
          blockSise - 1
        );
      }
    }
  }
};

const fillRecords = () => {
  for (let i = 0; i < records.length; i++) {
    nameText[i].textContent = records[i].name;
    recordsText[i].textContent = records[i].score;
  }
};

const startGame = () => {
  if (gameStatus) {
    return;
  }
  if (inputName.value.split(" ").join("")) {
    playerName = inputName.value;
  } else {
    playerName = "Player";
  }
  score = 0;
  lines = 0;
  level = 0;
  countLines = 0;
  count = counter;
  scoreText.textContent = score;
  linesText.textContent = lines;
  levelText.textContent = level;
  gameStatus = true;
  for (let i = 0; i < 20; i++) {
    fild[i] = [];
    for (let j = 0; j < 10; j++) {
      fild[i][j] = 0;
    }
  }
  currentFigure = getFigure();
  rAF = requestAnimationFrame(mainCycle);
};

const keyPress = (event) => {
  if (event.code === "Escape" && gameStatus) {
    stopGame();
  }
  if (event.code === "Enter" && !gameStatus) {
    startGame();
    return;
  } else if (!gameStatus) {
    return;
  } else {
    event.preventDefault();
    if (event.code === "ArrowUp") {
      currentFigure = rotateFigure(currentFigure);
    }
    if (event.code === "ArrowDown") {
      currentFigure = moveDown(currentFigure);
    }
    if (event.code === "ArrowRight") {
      currentFigure = moveFigure(currentFigure, 1);
    }
    if (event.code === "ArrowLeft") {
      currentFigure = moveFigure(currentFigure, -1);
    }
  }
};

const setLocalStorage = () => {
  localStorage.setItem("records", JSON.stringify(records));
};
const getLocalStorage = () => {
  if (localStorage.getItem("records")) {
    let rec = localStorage.getItem("records");
    records = JSON.parse(rec);
    fillRecords();
  }
};

export {
  getFigure,
  rotateFigure,
  genFigure,
  nextFigure,
  startGame,
  keyPress,
  setLocalStorage,
  getLocalStorage,
};
