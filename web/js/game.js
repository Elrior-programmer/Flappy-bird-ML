const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const optionsBtn = document.getElementById("optionsBtn");
const optionsOverlay = document.getElementById("optionsOverlay");
const closeBtn = document.getElementById("closeBtn");

let isGameStoped = false;

canvas.width = 1000;
canvas.height = 400;

const birdStartSetting = {
    birdStartX:canvas.width/4,
    birdStartY:canvas.height/2,
    birdRadius:canvas.height/12,
    birdSpeed:3
};

let gamemap = new gameMap(2000,1,canvas.height);

let bird = new Bird(
    birdStartSetting.birdStartX,
    birdStartSetting.birdStartY,
    birdStartSetting.birdRadius,
    birdStartSetting.birdSpeed
);

function canvasClear(ctx) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function isBirdIntersectingAnyBorders(borders,bird) {
    for(let i = 0 ; i < borders.length ; i++)
    {
        let intersect = circleIntersectsLineSegment(
            bird.x,bird.y,bird.radius,
            borders[i].startX,
            borders[i].startY,
            borders[i].endX,
            borders[i].endY
        ) 
        if(intersect) {
            return true;
        }
    }
    return false;
    
}

function animate() {
    canvasClear(ctx);

    // Sprawdź kolizję z mapowymi borderami
    if (isBirdIntersectingAnyBorders(gamemap.borders, bird)) {
        bird.isAlive = false;
    }

    // Sprawdź kolizję z kolumnami
    for (let i = 0; i < gamemap.columns.length; i++) {
        if (isBirdIntersectingAnyBorders(gamemap.columns[i].borders, bird)) {
            bird.isAlive = false;
        }
    }

    ctx.save();
    ctx.translate(-bird.x + canvas.width / 5, 0);
    gamemap.draw(ctx, canvas);
    bird.draw(ctx, canvas);

    let Allborders = gamemap.borders;
    gamemap.columns.forEach( (column) => {
        column.borders.forEach( (border) => {
            Allborders.push(border);
        })
    })

    
    if(!isGameStoped) {
        bird.update(Allborders);
        requestAnimationFrame(animate);
    }
    ctx.restore();
    if(!bird.isAlive)
    {
        pauseBtn.disabled = true;
    }
}

pauseBtn.addEventListener("click",()=>{
    isGameStoped ? isGameStoped = false : isGameStoped = true;
    if(isGameStoped) {
        pauseBtn.textContent = "STOPED";
        pauseBtn.style.background = "red";
    }
    else
    {
        pauseBtn.textContent = "PAUSE";
        pauseBtn.style.background = "lightgreen";
        requestAnimationFrame(animate);
    }
})

resetBtn.addEventListener("click",() => {
    bird = new Bird(
        birdStartSetting.birdStartX,
        birdStartSetting.birdStartY,
        birdStartSetting.birdRadius,
        birdStartSetting.birdSpeed
    );
    pauseBtn.disabled = false; // when bird died and we reset pausebtn is going back
    if(isGameStoped) {
        pauseBtn.textContent = "PAUSE";
        pauseBtn.style.background = "lightgreen";
        isGameStoped = false;
        requestAnimationFrame(animate);
    }
})

optionsBtn.addEventListener("click", () => {
    if(!isGameStoped)
        pauseBtn.click();
    optionsOverlay.style.visibility = "visible";
})

closeBtn.addEventListener("click", () => {
    optionsOverlay.style.visibility = "hidden";
})

animate();

if(!bird.isAlive)
    {
        pauseBtn.disabled = true;
    }

