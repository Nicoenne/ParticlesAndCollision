function closestPointToLine(pointA, pointB, pointP) {
    let a = pointB.y - pointA.y;
    let b = pointA.x - pointB.x;
    let c = pointA.x * (pointA.y - pointB.y) + pointA.y * (pointB.x - pointA.x);
    let den = pow(a, 2) + pow(b, 2);
    let x = (b * (b * pointP.x - a * pointP.y) - a * c) / den;
    let y = (a * (a * pointP.y - b * pointP.x) - b * c) / den;
    return createVector(x, y);
}

function isPointOnSegment(pointA, pointB, pointP) {
    let distAP = dist(pointA.x, pointA.y, pointP.x, pointP.y);
    let distBP = dist(pointB.x, pointB.y, pointP.x, pointP.y);
    let distAB = dist(pointA.x, pointA.y, pointB.x, pointB.y);

    return distAP + distBP > distAB - 0.1 && distAP + distBP < distAB + 0.1;
}

function setSpawnAndTargetPoints(spawnPoint, targetPoint) {
    push();
    fill(255, 0, 0);
    noStroke;
    circle(spawnPoint.x, spawnPoint.y, 10);
    circle(targetPoint.x, targetPoint.y, 10);
    pop();
}

function celebrateVictory() {
    push();
    fill(255);
    textAlign(CENTER);
    text("Victory", width / 2, height / 2);
    pop();
}

function useUserInput(player) {
    if (keyIsDown(LEFT_ARROW)) {
        player.moveLeft();
      }
      if (keyIsDown(RIGHT_ARROW)) {
        player.moveRight();
      }
      if (keyIsDown(UP_ARROW)) {
        player.jump();
      }
}

