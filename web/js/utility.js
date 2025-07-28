function circleIntersectsLineSegment(cx, cy, r, x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    let fx = cx - x1;
    let fy = cy - y1;

    let t = (fx * dx + fy * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));

    let closestX = x1 + t * dx;
    let closestY = y1 + t * dy;

    let distX = closestX - cx;
    let distY = closestY - cy;
    let distance = Math.sqrt(distX * distX + distY * distY);

    return distance <= r;
}

function lerp(A,B,t) {
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}