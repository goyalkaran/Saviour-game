import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

export class Enemy extends Sprite {
  constructor(num) {
    super(200, 35, 300, 300, "./assets/images/black_enemy.gif");
    this.isDead = false;
    this.speed = 5;
  }
  fall() {
    if (this.isDead) {
      this.speed = 20;
    }
  }
  draw(context, isGameOn) {
    context.drawImage(this.image, this.x, this.y, this.w, this.h);
    if (isGameOn) {
      this.move();
    }
  }
  outOfScreen() {
    if (!this.isDead && this.y > CONFIG.BOARD_HEIGHT) {
      this.y = 0;
    }
  }
  move() {
    this.y = this.y + this.speed;
    this.fall();
    this.outOfScreen();
  }
}
