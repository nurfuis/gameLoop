// Import game parameters, game object, and game loop classes
/**
 * Imports essential configurations for game dimensions and appearance.
 */
import gameParams from "./config/gameParams.json";

import { Vector2 } from "./src/Vector2";
/**
 * Imports the `GameObject` class for representing game objects within the game.
 */
import { GameObject } from "./src/gameObject";

/**
 * Imports the `GameLoop` class for managing the core game loop responsible for updates and rendering.
 */
import { GameLoop } from "./src/gameLoop";

// Set up the main display canvas
const display = document.querySelector("#display");
display.width = gameParams.width;          // Set width based on configuration
display.height = gameParams.height;        // Set height based on configuration
display.style.backgroundColor = gameParams.backgroundColor; // Set background color
const ctx = display.getContext("2d");       // Access 2D drawing context

// Create an offscreen canvas for potential intermediate rendering
const offscreenCanvas = document.createElement("canvas");
offscreenCanvas.width = gameParams.width;    // Match dimensions for smoother rendering
offscreenCanvas.height = gameParams.height;
const offscreenCtx = offscreenCanvas.getContext("2d"); // Access its 2D drawing context

// Create a main game object
const main = new GameObject({ position: new Vector2(0, 0) }); // Instance with initial position

// Define update function for game logic
const update = (delta) => {
  main.stepEntry(delta, main);  // Invoke a step-based update on the main game object
};

// Define draw function for rendering visuals
const draw = () => {
  ctx.clearRect(0, 0, display.width, display.height); // Clear previous frame for fresh rendering

  main.draw(ctx, 0, 0);                              // Draw the main game object onto the display

  offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height); // Clear offscreen canvas
  ctx.drawImage(offscreenCanvas, 0, 0);               // Composite potential offscreen content onto display
};

// Initialize and start the game loop
const gameLoop = new GameLoop(update, draw);    // Create an instance with provided update and draw functions
gameLoop.name = "mainLoop";                  // Optional naming for identification
gameLoop.start();                            // Kick off the game loop
