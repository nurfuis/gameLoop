import { Vector2 } from "./Vector2.js";
import { MoveUnit } from "./commands/MoveUnit.js";
import { GameObject } from "./gameObject.js";

export class Player extends GameObject {
  constructor() {
    super({
      position: new Vector2(0, 0),
    });
    this.width = 64;
    this.height = 64;
    this.radius = 32;

    this.move = new MoveUnit(this);
  }

  get center() {
    if (this.position && this.width && this.height) {
      const x = Math.floor(this.position.x + this.width / 2);
      const y = Math.floor(this.position.y + this.height / 2);
      return new Vector2(x, y);
    } else {
      return this.position.duplicate();
    }
  }  
  step(delta, root) {
    const { input } = root;
    if (input.direction) {
        console.log(input.direction)
    } 

  }

  drawImage(ctx) {
    ctx.beginPath(); // Start a new path
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true); // Draw the circle
    ctx.strokeWidth = 5; // Adjust to your desired thickness

    ctx.strokeStyle = "red";
    ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
    ctx.strokeStyle = "red";
    ctx.stroke(); // Draw the circle
    ctx.fill(); // Add a semi-transparent fill

    ctx.closePath(); // Close the path
    ctx.strokeWidth = 1; // Adjust to your desired thickness
  }
}
