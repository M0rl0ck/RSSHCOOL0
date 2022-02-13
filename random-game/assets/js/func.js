import { fild, blockSise, colors, figuresName, figures } from "./const.js";

let nextFigure = {};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genFigure = () => {
  let color = colors[getRandom(0, colors.length - 1)];
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

const rotateFigure = (obj) => {
  if (obj.name === "O") {
    return obj;
  }
  let index = obj.figureIndex + 1;
  index = index % 4;
  obj.figureIndex = index;
  obj.matrix = figures[obj.name].kind[index];
  return obj;
};

const getFigure = () => {
  if (nextFigure.name === undefined) {
    nextFigure = genFigure();
  }
  let tempFigure = nextFigure;
  nextFigure = genFigure();
  return tempFigure;
};

export { getFigure, rotateFigure, genFigure, nextFigure };
