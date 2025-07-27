
class Bird {
    constructor(x,y,radius,speed = 3) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.addEventListeners();
        this.flyUp = false;
        this.acceleration = 1.1;
        this.speed = speed;
        this.speedReturn = speed;
        this.speedLimit = 5;

        this.isAlive = true; // sprawdzamy cz ptak jest zywy
    }

    resetSpeed() {
        this.speed = this.speedReturn;
    }

    update() {
        if(this.isAlive)
        {
            this.x +=1;
            if(this.flyUp) {    
                if(this.y > this.radius) {
                    this.y -= this.speed;
                    if(this.speed < this.speedLimit) {
                        this.speed *= this.acceleration;
                    }
                }
            }
            else {
                this.y += this.speed;
            }
        }
    }

    draw(ctx,canvas) {
        if(this.isAlive)
        {
            ctx.fillStyle = "black";
        }
        else {
            ctx.fillStyle = "gray";
        }
        ctx.beginPath();
       ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    addEventListeners() {
        document.onkeydown = (e) => {
            if (e.key === "w") {
                this.flyUp = true;
            }
        }

        document.onkeyup = (e) => {
            this.flyUp = false;
            this.resetSpeed();
        }
    }
}