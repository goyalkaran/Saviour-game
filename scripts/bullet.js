import { Board } from "./board.js";
import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

export class Bullet extends Sprite{
    constructor(x,y){
        super(x,y,50,50,"./assets/images/ball.png");
        this.speed=15;
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y,this.w,this.h);
        this.move();
        if(this.outOfScreen()==true){
            console.log("out of screen",Board.bullets.length);
            Board.bullets.shift();
            console.log("After delete",Board.bullets.length);
        }
    }
    outOfScreen(){
        if(this.x>CONFIG.BOARD_WIDTH){
            return true;
        }else{
            return false;
        }
    }
    move(){
        this.x=this.x+this.speed;
    }
}