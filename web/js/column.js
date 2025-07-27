class Column {
    constructor(startX, startY, width, height) {
        this.x =startX;
        this.y = startY;
        this.width = width;
        this.height = height;
        this.borders = [
            {//poziomy dół| const - y, zmienia sie x
                startX: this.x,
                startY: this.y,
                endX: this.x + this.width,
                endY: this.y
            },

            {//pozioma| gora const - y, zmienia sie x
                startX: this.x,
                startY: this.y + this.height,
                endX: this.x + this.width,
                endY: this.y + this.height
            },

            {// pionowy| przód const - x, zmienia sie y
                startX: this.x,
                startY: this.y,
                endX: this.x,
                endY: this.y + this.height
            },

            {//pionowy| tył const - y, zmienia sie x
                startX: this.x + this.width,
                startY: this.y,
                endX: this.x + this.width,
                endY: this.y + this.height
            }
        ]
    }

     

    draw(ctx,canvas) {
        let saveFillStyle = ctx.fillStyle;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.width,this.height);

    ctx.strokeStyle = "red";
    for (let border of this.borders) {
        ctx.beginPath();
        ctx.moveTo(border.startX, border.startY);
        ctx.lineTo(border.endX, border.endY);
        ctx.stroke();
    }

        ctx.fillStyle = saveFillStyle;
    }
}

