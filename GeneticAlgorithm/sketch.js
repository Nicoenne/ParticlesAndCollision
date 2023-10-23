var walls = [];
var currGen = [];
var nextGen = [];
var NPOPULATION = 200;
var lifeSpan = 60 * 5;
var gravity;
var spawnPointX = 20;
var spawnPointY = 280;

function setup() {
  frameRate(60);
  createCanvas(600, 300);
  spawnPoint = createVector(spawnPointX, spawnPointY);
  targetPoint = createVector(width - 20, height - 220);
  gravity = createVector(0, 0.2);

  walls[0] = new Wall(width, 0, 0, 0);
  walls[1] = new Wall(0, 0, 0, height - 0);
  walls[2] = new Wall(0, height, 200, height, "jumpable");
  walls[3] = new Wall(width, height, width, 0);

  walls[4] = new Wall(200, height, 200, height - 100);
  walls[5] = new Wall(200, height - 100, 400, height - 100, "jumpable");
  walls[6] = new Wall(400, height - 100, 400, height - 200);
  walls[7] = new Wall(400, height - 200, width, height - 200, "jumpable");
  for (let i = 0; i < NPOPULATION; i++) {
    currGen[i] = new Player();
  }
}

function draw() {
  background(0);
  setSpawnAndTargetPoints(spawnPoint, targetPoint);
  for (let i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  for (let i = currGen.length - 1; i > -1; i--) {
    let p = currGen[i];
    p.applyForce(gravity);
    p.bounceWalls(walls);
    p.think();
    p.setScore(targetPoint);
    p.show();
    p.update();
    if (!p.isAlive) {
      nextGen.push(p);
      currGen.splice(i, 1);
    }
  }

  if (currGen.length == 0) {
    makeNewGeneration();
  }


  
}




