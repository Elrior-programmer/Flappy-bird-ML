class Sensor {
    constructor(x,y,width,angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.angle = angle;
    }

    update(x,y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx,canvas) {
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(
            this.x + Math.sin(this.angle)*this.width,this.y + Math.cos(this.angle)*this.width);
        ctx.stroke();
    }
}