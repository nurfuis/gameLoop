import { BACKGROUND_COLOR, HEIGHT, WIDTH } from "./src/constants";
import { Vector2 } from "./src/Vector2";

import { GameObject } from "./src/gameObject";
import { GameLoop } from "./src/gameLoop";
import { Player } from "./src/Player";
import { Input } from "./src/Input";
import { AutomatedInput } from "./src/Automatedinput";
import { Creature } from "./src/Creature";
import { Spawner } from "./src/Spawner";

const display = document.querySelector("#display");
display.width = WIDTH;
display.height = HEIGHT;
display.style.backgroundColor = BACKGROUND_COLOR;
const ctx = display.getContext("2d");

let main;
let input;
let automatedInput;



const update = (delta) => {
  main.stepEntry(delta, main);
};

const draw = () => {
  ctx.clearRect(0, 0, display.width, display.height);
  main.draw(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.name = "mainLoop";

let player;
let creature;
let spawner;

const TIMER = 10;

const startScreen = document.getElementById("start-screen");
let gameStarted = false; // Flag to track game state

let remainingTime = TIMER; // Set a timer duration (in seconds)
let timerInterval; // Store the timer interval reference

function gameOver() {
  // Display final score or any other end-game logic
  gameLoop.stop();
  gameStarted = false;

  player = undefined;
  creature = undefined;
  spawner = undefined;

  startScreen.style.display = ""; // Hide start screen

  // You can add here actions like displaying a game over screen or restarting the game
}

function startTimer() {
  timerInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      gameOver(); // Call the end event function
    }
  }, 1000); // Update every second
}

startScreen.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    startScreen.style.display = "none";

    main = new GameObject({ position: new Vector2(0, 0) });
    input = new Input();
    automatedInput = new AutomatedInput();

    player = new Player();
    player.position.x =  WIDTH / 2;
    player.position.y = HEIGHT / 2;

    creature = new Creature();
    spawner = new Spawner(Creature);

    main.addChild(player);
    main.addChild(creature);
    main.spawner = spawner;
    // main.input = input;
    main.automatedInput = automatedInput;

    gameLoop.start();

    remainingTime = TIMER;
    startTimer(); // Start the timer
  }
});
