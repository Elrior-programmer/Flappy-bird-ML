class gameMap {
    constructor(distance,amountOfColumns,height) {
        this.distance = distance;
        this.amountOfColumns = amountOfColumns;
        this.height = height;
        this.borders = [
            {
                startX:0,
                startY:height,
                endX:this.distance,
                endY:height
            },
            {
                startX:this.distance,
                startY:0,
                endX:this.distance,
                endY:this.height
            }
        ];
        this.columns = [
            new Column(500,200,50,200),
            new Column(750,0,50,200),
            new Column(1000,200,50,200),
            new Column(1250,0,50,200),
            new Column(1500,200,50,200),
            new Column(1750,0,50,200),
        ];
    }

   

    draw(ctx,canvas) {
        const widthOfEnd = 50;
        ctx.fillStyle = "gold";
        ctx.fillRect(this.distance - widthOfEnd, 0, widthOfEnd, canvas.height);

        ctx.save();
        ctx.translate(this.distance - widthOfEnd/2, canvas.height / 2); // przesuń środek
        ctx.rotate(Math.PI / 2); // obróć o 90 stopni
        ctx.font = "30px Arial";
        ctx.fillStyle = "#D4AF37";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("FINISH", 0, 0); // teraz rysujemy na środku
        ctx.restore();
        ctx.fillStyle = "black";
        for(let i = 0 ; i < this.columns.length ; i++)
        {
            this.columns[i].draw(ctx,canvas);
        }
    }


}