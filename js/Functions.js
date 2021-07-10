
// FUNCTIONS:

// Distance between 2 points (p and q)
function dist(p, q) {
    return Math.sqrt((p[0] - q[0])**2 + (p[1] - q[1])**2);
}

// Returns the sum of all points in a list of points
function add(pts) {
    let sum_x = 0;
    let sum_y = 0;
    for (let i=0; i<pts.length; i++) {
        sum_x += pts[i][0];
        sum_y += pts[i][1];
    }
    return [sum_x, sum_y];
}

// Multiply a point by a constant
function mul(point, cte) {
    return [cte * point[0], cte * point[1]]
}

// Generates a point on the Bezier curve for a given t
function getPointOnBezierCurve(points, t) {
    const invT = (1 - t);
    const sum = [
        mul(points[0], invT**3),
        mul(points[1], 3 * invT**2 * t),
        mul(points[2], 3 * invT * t**2),
        mul(points[3], t**3)
    ];
    return add(sum);
}

// Generates a set of points for the curve
function getPointsOnBezierCurve(points, numPoints) {
    const cpoints = [];
    for (let i = 0; i < numPoints; ++i) {
        const t = i / (numPoints - 1);
        cpoints.push(getPointOnBezierCurve(points, t));
    }
    return cpoints;
}

// Draws a circle in the canvas
function drawCircle(ctx, center, fill, circle_width, circle_color, radius) {
    ctx.fillStyle = circle_color
    ctx.strokeStyle = circle_color;
    ctx.lineWidth = circle_width;

    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    ctx.closePath();
    if (fill) ctx.fill();
    ctx.stroke();

}

// Draws a line in the canvas
function drawLines(ctx, points, num, line_width, line_color) {
    ctx.fillStyle = line_color
    ctx.strokeStyle = line_color;
    ctx.lineWidth = line_width;

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i=1; i<num; i++) ctx.lineTo(points[i][0], points[i][1]);
    ctx.stroke();
}