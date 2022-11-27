export class Sprite{
    constructor(x, y, w, h, src){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 2;
        this.image = new Image();
        this.image.src = src;

    }
}