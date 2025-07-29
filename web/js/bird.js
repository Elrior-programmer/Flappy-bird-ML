
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
        this.sensors = [];
        createSensors(this.sensors,16,Math.PI/8,200,this.x,this.y);
    }

    resetSpeed() {
        this.speed = this.speedReturn;
    }

    update(borders) {
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
            this.sensors.forEach((sensor) => {
                sensor.update(this.x,this.y,borders);
            });
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
       this.sensors.forEach( (sensor) => {
        sensor.draw(ctx,canvas);
       })
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

function createSensors(array,amount,angleBetween,width,x,y) {
    angle = 0;
    for(let i = 0 ; i < amount ; i++)
    {
        nextSensor = new Sensor(x,y,width,angle)
        array.push(nextSensor);
        angle += angleBetween;

    }
}