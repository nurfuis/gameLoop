import gameParams from "./config/gameParams.json";

import { Vector2 } from "./src/Vector2";

import { GameObject } from "./src/gameObject";
import { GameLoop } from "./src/gameLoop";

const display = document.querySelector("#display");
display.width = gameParams.width;
display.height = gameParams.height;
display.style.backgroundColor = gameParams.backgroundColor;
const ctx = display.getContext("2d");

const offscreenCanvas = document.createElement("canvas");
offscreenCanvas.width = gameParams.width;
offscreenCanvas.height = gameParams.height;
const offscreenCtx = offscreenCanvas.getContext("2d");

const main = new GameObject({ position: new Vector2(0, 0) });

const update = (delta) => {
  main.stepEntry(delta, main);
};

const draw = () => {
  ctx.clearRect(0, 0, display.width, display.height);
  main.draw(ctx, 0, 0);
  offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  ctx.drawImage(offscreenCanvas, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.name = "mainLoop";
gameLoop.start();
