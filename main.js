import gameParams from "./config/gameParams.json";

import { Vector2 } from "./src/Vector2";

import { GameObject } from "./src/gameObject";
import { GameLoop } from "./src/gameLoop";
import { Player } from "./src/Player";
import { Input } from "./src/Input";
import { AutomatedInput } from "./src/Automatedinput";
import { Creature } from "./src/Creature";
import { Spawner } from "./src/Spawner";

const display = document.querySelector("#display");
display.width = gameParams.width;
display.height = gameParams.height;
display.style.backgroundColor = gameParams.backgroundColor;
const ctx = display.getContext("2d");

const main = new GameObject({ position: new Vector2(0, 0) });

const player = new Player();
main.addChild(player);

const input = new Input();
// main.input = input;

const automatedInput = new AutomatedInput();
main.automatedInput = automatedInput;

const creature = new Creature();
main.addChild(creature);

const spawner = new Spawner(Creature);
main.spawner = spawner;

const update = (delta) => {
  main.stepEntry(delta, main);
};

const draw = () => {
  ctx.clearRect(0, 0, display.width, display.height);
  main.draw(ctx, 0, 0);

};

const gameLoop = new GameLoop(update, draw);
gameLoop.name = "mainLoop";
gameLoop.start();
