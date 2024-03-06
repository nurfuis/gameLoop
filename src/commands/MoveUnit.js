import gameParams from "../../config/gameParams.json";

export class MoveUnit {
  constructor(entity) {
    this.entity = entity;
    this.boundaries = gameParams.world.boundaries; // Access boundaries from gameParams
  }

  up(distance) {
    const newY = this.entity.position.y - distance;
    this.clampY(newY); // Ensure newY stays within boundaries
  }

  down(distance) {
    const newY = this.entity.position.y + distance;
    this.clampY(newY); // Ensure newY stays within boundaries
  }

  left(distance) {
    const newX = this.entity.position.x - distance;
    this.clampX(newX); // Ensure newX stays within boundaries
  }

  right(distance) {
    const newX = this.entity.position.x + distance;
    this.clampX(newX); // Ensure newX stays within boundaries
  }

  clampX(newX) {
    this.entity.position.x = Math.max(this.boundaries.minX, Math.min(newX, this.boundaries.maxX - this.entity.width));
  }

  clampY(newY) {
    this.entity.position.y = Math.max(this.boundaries.minY, Math.min(newY, this.boundaries.maxY - this.entity.height));
  }
}