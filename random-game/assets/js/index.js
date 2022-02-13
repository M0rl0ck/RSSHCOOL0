import { getFigure, genFigure, rotateFigure } from "./func.js";

const buttonPlay = document.querySelector("button");

const presPlay = () => {
  buttonPlay.classList.add("click");
};

const upPlay = () => {
  buttonPlay.classList.remove("click");
};

buttonPlay.addEventListener("mousedown", presPlay);
buttonPlay.addEventListener("mouseup", upPlay);
buttonPlay.addEventListener("mouseout", upPlay);

let currentFigure = {};
