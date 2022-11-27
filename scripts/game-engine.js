import { Board } from "./board.js";
import { CONFIG } from "./config.js";

window.addEventListener("load", bindEvents);
window.addEventListener("keydown",keyPress);
let board;
function bindEvents() {
  const canvas = document.querySelector("#board");
  canvas.width = CONFIG.BOARD_WIDTH;
  canvas.height = CONFIG.BOARD_HEIGHT;
  const context = canvas.getContext("2d");
  console.log(context);
  board = new Board(context);
}
function keyPress(event){
    board.keyCapture(event);
}

// const canvas = document.querySelector("#board");
// const context = canvas.getContext("2d");
// canvas.width = CONFIG.BOARD_WIDTH;
// canvas.height = CONFIG.BOARD_HEIGHT;
// canvas.width=1200;
// canvas.height=700;

// // context.beginPath();
// // context.moveTo(0,0);
// // context.lineTo(0,30);
// // context.lineTo(100,30);
// // context.fill();
// // context.closePath();

// // context.font="80px times";
// // context.strokeText("game start",100,100);

// const image = new Image();
// image.src = "../assets/images/bg.jpeg";
// image.onload = function () {
//   context.drawImage(image, 0, 0);
// };
