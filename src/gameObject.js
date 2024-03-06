import { Vector2 } from "./Vector2.js";
import { events } from "./Events.js";

export class GameObject {
  position;
  children;
  parent;
  hasReadyBeenCalled;
  zSort;

  constructor(options) {
    this.position = options.position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
    this.zSort = false;
  }

  stepEntry(delta, root) {
    if (this.inactive) {
      return;
    }

    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    if (this.zSort === true) {
      this.sortChildren();
    }

    this.step(delta, root);
  }

  ready() {}

  step(delta) {}

  draw(ctx, x, y) {
    if (this.invisible) {
      return;
    }

    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx, drawPosX, drawPosY) {}

  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent.removeChild(this);
  }

  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => g !== gameObject);
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
