export class MoveUnit {
  constructor(entity) {
    this.entity = entity;
  }

  up(distance) {
    this.entity.lastY = this.entity.position.y;
    this.entity.position.y -= distance;
  }

  down(distance) {
    this.entity.lastY = this.entity.position.y;
    this.entity.position.y += distance;
  }

  left(distance) {
    this.entity.lastX = this.entity.position.x;
    this.entity.position.x -= distance;
  }
  right(distance) {
    this.entity.lastX = this.entity.position.x;
    this.entity.position.x += distance;
  }

  // Optional: Add validation/bounds checking or error handling within methods
}
