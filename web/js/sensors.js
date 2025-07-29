class Sensor {
    constructor(x,y,width,angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.angle = angle;
        this.reading = {
            x: this.x + Math.sin(this.angle)*this.width,
            y: this.y + Math.cos(this.angle)*this.width,
            distance: this.width,
            isReading: false
        }
    }

    update(x,y,borders) {
        this.x = x;
        this.y = y;
        this.#getReading(borders);
    }

    draw(ctx,canvas) {
        ctx.beginPath()
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(
            this.reading.x,
            this.reading.y
        );
        ctx.stroke();
        if(this.reading.isReading) {
            ctx.beginPath()
            ctx.fillStyle = "red";
            ctx.arc(this.reading.x,this.reading.y,2,0,Math.PI*2);
            ctx.fill();
        }
    }

    #getReading(borders) {
        let sensorStart = {
            x: this.x,
            y: this.y
        }
        let sensorEnd = {
            x: this.x + Math.sin(this.angle)*this.width,
            y: this.y + Math.cos(this.angle)*this.width
        }

        this.reading = {
            x: sensorEnd.x,
            y: sensorEnd.y,
            distance: this.width,
            isReading: false
        };

        borders.forEach( (border) => {
           let  borderStart = {
                x: border.startX,
                y: border.startY
            }
            let borderEnd = {
                x: border.endX,
                y: border.endY
            }
            let intersection = getIntersection(sensorStart,sensorEnd,borderStart,borderEnd);
            if(intersection) {
                this.reading.isReading = true;
                let distance = Math.sqrt( (intersection.x - sensorStart.x)*(intersection.x - sensorStart.x) + (intersection.y - sensorStart.y)*(intersection.y - sensorStart.y) );
                if(distance < this.reading.distance) 
                {
                    this.reading.x = intersection.x;
                    this.reading.y = intersection.y;
                    this.reading.distance = distance;
                }
            }
            
        });
        
    }
}