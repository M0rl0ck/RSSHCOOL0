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
    for (let c = 0; r < obj.matrix.length; c++) {
      if (obj.matrix[r][c]) {
        fild[obj.row + r][obj.col + c] = obj.index;
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

const checkFild = () => {
  for (let row = fild.length - 1; row >= 0; ) {
    if (checkRow(row)) {
      for (let r = row; curRow > 0; r--) {
        for (let c = 0; c < fild[0].length; c++) {
          fild[r][c] = fild[r - 1][c];
        }
      }
      for (let c = 0; c < fild[0].length; c++) {
        fild[0][c] = 0;
      }
    } else {
      row--;
    }
  }
};

const mainCycle = () => {
  rAF = requestAnimationFrame(mainCycle);
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

  if (countTime++ > count) {
    currentFigure.row++;
    countTime = 0;
  }
  if (!isCanMoove(currentFigure)) {
    currentFigure.row--;
    mountFigure(currentFigure);
    checkFild();
    currentFigure = getFigure();
  }
};

export { getFigure, rotateFigure, genFigure, nextFigure, startGame };
