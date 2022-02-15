import { blockSise } from "./const.js";
import {
  startGame,
  keyPress,
  setLocalStorage,
  getLocalStorage,
} from "./func.js";

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
buttonPlay.addEventListener("click", startGame);
document.addEventListener("keydown", keyPress);

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
