import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { CONFIG } from "./config.js";
import { Bullet } from "./bullet.js";

export class Board {
  static bullets = [];

  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.image.src = "./assets/images/bg.jpeg";
    this.player = new Player();
    this.enemies = this.loadEnemies();
    this.interval = undefined;
    this.gameLoop();
    this.isWon = false;
    this.gameMessage = "";
    this.isGameOn = true;
  }

  isCollide(firstObject, secondObject) {
    let distanceX = Math.abs(firstObject.x - secondObject.x);
    let distanceY = Math.abs(firstObject.y - secondObject.y);
    let maxWidth = Math.abs(firstObject.w - secondObject.w);
    let maxHeight = Math.abs(firstObject.h - secondObject.h);
    return distanceX <= maxWidth - 120 && distanceY <= maxHeight - 10;
  }

  collision() {
    for (let enemy of this.enemies) {
      if (this.isCollide(this.player, enemy)) {
        this.gameMessage = "GAME OVER";
        this.isGameOn = false;
        return;
      }
    }
  }

  collisionBulletAndEnemy() {
    for (let bullet of Board.bullets) {
      for (let enemy of this.enemies) {
        if (this.isCollide(bullet, enemy)) {
          enemy.isDead = true;
        }
      }
    }
  }
  message(color, message) {
    this.context.font = "50px serif";
    this.context.fillStyle = color;
    this.gameMessage = message;
  }
  stopGame() {
    clearInterval(this.interval);
    let count = 1;
    const anim = setInterval(() => {
      if (count > 8) {
        clearInterval(anim);
      }

      console.log("count", count);
      if (count % 2 != 0 && !this.isWon) {
        this.message("red", "GAME OVER...");
      } else if (count % 2 != 0 && this.isWon) {
        this.message("green", "GAME WON...");
      } else {
        this.gameMessage = "";
      }
      count++;
      this.draw();
    }, 350);
  }

  gameLoop() {
    this.interval = setInterval(() => {
      this.draw();
      this.player.fall();
      this.collision();
      if (!this.isGameOn) {
        this.draw();
        this.stopGame();
      }
      this.collisionBulletAndEnemy();
      console.log("Game Loop");
    }, 30);
  }

  gameOver() {
    this.isWon = true;
    this.stopGame();
    console.log("Game Won");
  }

  keyCapture(event) {
    if (event.keyCode == CONFIG.RIGHT_ARROW) {
      this.player.moveForward();
      if (this.player.outOfScreen()) {
        this.gameOver();
      }
    } else if (event.keyCode == CONFIG.LEFT_ARROW) {
      this.player.moveBackWard();
    } else if (event.keyCode == CONFIG.Z_key) {
      this.fireBullets();
    } else if (event.keyCode == CONFIG.SHIFT_KEY) {
      this.player.jump();
    }
  }
  loadEnemies() {
    const GAP = 250;
    let currentX = 100;
    let speed = 5;
    const enemies = [];
    let lastX = 0;
    for (let i = 0; i < CONFIG.MAX_ENEMY; i++) {
      let enemy = new Enemy(i);
      enemy.x = lastX + currentX + GAP;
      lastX = enemy.x;
      enemy.speed = speed;
      speed = speed + 5;
      enemies.push(enemy);
    }
    return enemies;
  }
  fireBullets() {
    let bullet = new Bullet(
      this.player.x + this.player.w - 50,
      this.player.y + this.player.h / 2 - 10
    );
    Board.bullets.push(bullet);
  }
  //draws

  draw() {
    // console.log("this is", this);
    this.context.clearRect(0, 0, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
    this.context.drawImage(this.image, 0, 0);
    this.player.draw(this.context);
    this.drawEnemies();
    this.drawBullets();
    this.drawMessage();
  }
  drawEnemies() {
    for (let enemy of this.enemies) {
      enemy.draw(this.context, this.isGameOn);
    }
  }
  drawMessage() {
    if (this.gameMessage.length > 0) {
      this.context.font = "60px serif";
      this.context.fillText(
        this.gameMessage,
        CONFIG.BOARD_WIDTH / 3,
        CONFIG.BOARD_HEIGHT / 2
      );
    }
  }
  drawBullets() {
    for (let bullet of Board.bullets) {
      bullet.draw(this.context);
    }
  }
}
