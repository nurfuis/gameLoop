import { Vector2 } from "./Vector2.js";
import { events } from "./Events.js";

/**
 * GameObject class
 * @constructor
 * @param {object} options - Object containing initial properties for the game object.
 * @param {Vector2} options.position - Initial position of the game object. Defaults to (0, 0).
 */
export class GameObject {
  /**
   * The current position of the game object in 2D space.
   * @type {Vector2}
   */
  position;

  /**
   * An array of child game objects attached to this object.
   * @type {GameObject[]}
   */
  children;

  /**
   * Reference to the parent game object, if this object is a child of another.
   * @type {GameObject}
   */
  parent;

  /**
   * Flag indicating if the `ready` function has already been called.
   * @type {boolean}
   */
  hasReadyBeenCalled;

  /**
   * Flag indicating if child objects should be sorted by z-index before drawing.
   * @type {boolean}
   */
  zSort;

  /**
   * Creates a new game object instance.
   * @param {object} options - See constructor documentation for details.
   */
  constructor(options) {
    this.position = options.position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
    this.zSort = false;
  }

  /**
   * Called recursively for each game object in the hierarchy during the game loop.
   * Performs updates on the current object and its children.
   * @param {number} delta - Time elapsed since the last frame in milliseconds.
   * @param {GameObject} root - Reference to the root game object in the hierarchy.
   */
  stepEntry(delta, root) {
    if (this.inactive) {
      return; // Skip updates if the object is inactive
    }

    // Update child objects recursively
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call the `ready` function only once on the first update
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Sort children by z-index if enabled
    if (this.zSort === true) {
      this.sortChildren();
    }

    // Perform object-specific updates
    this.step(delta, root);
  }

  /**
   * This function is intended to be overridden by subclasses to implement object-specific
   * initialization logic that is called only once when the object is first added to the scene.
   */
  ready() {
    // ... (subclass implementation)
  }

  /**
   * This function is intended to be overridden by subclasses to implement object-specific
   * update logic that is called every frame during the game loop.
   * @param {number} delta - Time elapsed since the last frame in milliseconds.
   */
  step(delta) {
    // ... (subclass implementation)
  }

  /**
   * Draws the game object and its children onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D canvas rendering context.
   * @param {number} x - The x-coordinate offset for drawing.
   * @param {number} y - The y-coordinate offset for drawing.
   */
  draw(ctx, x, y) {
    if (this.invisible) {
      return; // Skip drawing if the object is invisible
    }

    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // Draw the object itself (implementation specific)
    this.drawImage(ctx, drawPosX, drawPosY);

    // Draw child objects recursively
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  /**
   * This function is intended to be overridden by subclasses to implement specific object
   * drawing logic onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D canvas rendering context.
   * @param {number} drawPosX - The x-coordinate offset for drawing, considering parent position.
   * @param {number} drawPosY - The y-coordinate offset for drawing, considering parent position.
   */
  drawImage(ctx, drawPosX, drawPosY) {
    // ...
  }
  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.parent.removeChild(this);
  }
  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }
  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
  sortChildren() {
    this.children.sort((a, b) => {
      const aQuadrant =
        a.position.x >= 0
          ? a.position.y >= 0
            ? 1
            : 4
          : a.position.y >= 0
          ? 2
          : 3;
      const bQuadrant =
        b.position.x >= 0
          ? b.position.y >= 0
            ? 1
            : 4
          : b.position.y >= 0
          ? 2
          : 3;

      // Apply quadrant-specific sorting
      if (aQuadrant !== bQuadrant) {
        // Prioritize based on quadrant
        return aQuadrant - bQuadrant;
      } else {
        // Same quadrant
        if (a.position.y !== b.position.y) {
          // Modify based on quadrant
          if (aQuadrant === 1 || aQuadrant === 4) {
            return a.position.y - b.position.y; // Ascending
          } else {
            return b.position.y - a.position.y; // Descending
          }
        } else {
          if (aQuadrant === 1 || aQuadrant === 4) {
            return a.position.x - b.position.x; // Ascending
          } else {
            return b.position.x - a.position.x; // Descending
          }
        }
      }
    });
  }
}
