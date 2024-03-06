/**
 * GameLoop class
 * @constructor
 * @param {function} update - Function to be called for game logic updates. This function
 *                             will be called with the elapsed time (in milliseconds) since the 
 *                             last update as an argument.
 * @param {function} render - Function to be called for rendering the game visuals.
 */
export class GameLoop {
    /**
     * Timestamp of the last rendered frame.
     * @type {number}
     */
    lastFrameTime = 0;
  
    /**
     * Accumulated time passed between frames, used for fixed time-step updates.
     * @type {number}
     */
    accumulatedTime = 0;
  
    /**
     * Target time between frames (in milliseconds), aiming for a specific frame rate (default: 60 fps).
     * @type {number}
     */
    timeStep = 1000 / 60; // set to run at 60 fps
  
    /**
     * Current frames per second (fps).
     * @type {number}
     */
    fps = 0;
  
    /**
     * Used for calculating fps (number of frames since last fps calculation).
     * @type {number}
     */
    frameCount = 0;
  
    /**
     * Used for calculating fps (accumulated time since last fps calculation).
     * @type {number}
     */
    frameTime = 0;
  
    /**
     * Function to be called for game logic updates, provided during object creation.
     * @type {function}
     */
    update;
  
    /**
     * Function to be called for rendering the game visuals, provided during object creation.
     * @type {function}
     */
    render;
  
    /**
     * ID of the scheduled animation frame using requestAnimationFrame.
     * @type {number}
     */
    rafId = null;
  
    /**
     * Flag indicating if the game loop is running.
     * @type {boolean}
     */
    isRunning = false;
  
    /**
     * Flag indicating if the game loop is paused.
     * @type {boolean}
     */
    isPaused = false;
  
    /**
     * Flag for enabling debug features (optional).
     * @type {boolean}
     */
    debug = false;
  
    /**
     * Core function of the game loop, called repeatedly using requestAnimationFrame.
     * @param {number} timestamp - DOMHighResTimeStamp representing the current time.
     */
    mainLoop = (timestamp) => {
      if (!this.isRunning) return;
  
      if (this.isPaused) {
        this.isPaused = false;
        this.lastFrameTime = timestamp;
      }
  
      let deltaTime = timestamp - this.lastFrameTime;
      this.lastFrameTime = timestamp;
  
      this.accumulatedTime += deltaTime;
  
      while (this.accumulatedTime >= this.timeStep) {
        this.update(this.timeStep);
        this.accumulatedTime -= this.timeStep;
      }
  
      this.render();
  
      this.rafId = requestAnimationFrame(this.mainLoop);
  
      this.frameTime += deltaTime;
      if (this.frameTime >= 1000) {
        this.fps = this.rafId - this.frameCount;
        this.frameCount = this.rafId;
        this.frameTime -= 1000;
      }
    };
  
    /**
     * Starts the game loop by requesting the first animation frame.
     */
    start() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.mainLoop);
      }
    }
  
    /**
     * Stops the game loop by canceling the scheduled animation frame.
     */
    stop() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      this.isRunning = false;
    }
  }