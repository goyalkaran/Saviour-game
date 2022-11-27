import { Sprite } from "./sprite.js";
import { CONFIG } from "./config.js";

export class Player extends Sprite {
  constructor() {
    super(10, 0, 150, 150, "./assets/images/player.gif");
    this.y = CONFIG.FLOOR - this.h;
    this.speed = 10;
    this.isJump = false;
    this.force = 0;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  outOfScreen() {
    if (this.x > CONFIG.BOARD_WIDTH) {
      return true;
    } else {
      return false;
    }
  }

  moveForward() {
    this.x = this.x + this.speed;
  }

  moveBackWard() {
    if (this.x < 10) {
      this.x = 10;
    }
    this.x = this.x - this.speed;
  }

  jump() {
    if (!this.isJump) {
      this.isJump = true;
      this.force = -20;
      this.y = this.y + this.force;
    }
  }
  fall() {
    if (this.y + this.h >= CONFIG.FLOOR) {
      this.y = CONFIG.FLOOR - this.h;
      this.isJump = false;
      return;
    }
    this.y = this.y + this.force;
    this.force = this.force + CONFIG.GRAVITY;
  }
}
