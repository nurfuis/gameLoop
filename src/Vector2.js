/**
 * Vector2 class representing a 2D vector with x and y coordinates.
 */
export class Vector2 {
    /**
     * Creates a new Vector2 instance.
     * @constructor
     * @param {number} [x=0] - Initial x-coordinate (defaults to 0).
     * @param {number} [y=0] - Initial y-coordinate (defaults to 0).
     */
    constructor(x = 0, y = 0) {
      /**
       * The x-coordinate of the vector.
       * @type {number}
       */
      this.x = x;
      /**
       * The y-coordinate of the vector.
       * @type {number}
       */
      this.y = y;
    }
  
    /**
     * Validates the current Vector2 instance, ensuring both coordinates are finite numbers.
     * Throws an error if invalid.
     * @throws {Error} If either x or y coordinate is invalid (null, undefined, or not a number).
     * @returns {Vector2} The validated Vector2 instance.
     */
    validate() {
      if (
        this.x === null ||
        this.y === null ||
        this.x === undefined ||
        this.y === undefined ||
        isNaN(this.x) ||
        isNaN(this.y)
      ) {
        throw new Error(
          "Invalid position: " + this.x + " and " + this.y + " must be finite numbers."
        );
      }
      return this; // Return the validated Vector2 instance
    }
  
    /**
     * Creates a duplicate of the current Vector2 instance.
     * @returns {Vector2} A new Vector2 instance with the same coordinates as this one.
     */
    duplicate() {
      return new Vector2(this.x, this.y);
    }
  }