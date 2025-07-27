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
