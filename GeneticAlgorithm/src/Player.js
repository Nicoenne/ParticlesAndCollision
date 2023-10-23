class Player {
    constructor(brain) {
      this.pos = createVector(spawnPointX, spawnPointY);
      this.vel = createVector();
      this.acc = createVector();
      this.r = 10;
      this.canJump = false;
      this.lifeTime = 0;
      this.lifeSpan = lifeSpan;
      this.isAlive = true;

      this.hasWon = false;
      this.score = 0;
      this.fitness = 0;
      if (brain) {
        this.brain = brain;
      }
      else {
        this.brain = this.getBrain();
      }
    }

    checkVictory(targetPoint) {
      let d = dist(this.pos.x, this.pos.y, targetPoint.x, targetPoint.y);
      if (d < 10) {
        this.hasWon = true;
      }
      return this.hasWon;
    }

    setScore(targetPoint) {
      let distance = dist(this.pos.x, this.pos.y, targetPoint.x, targetPoint.y);
      distance = distance / sqrt(pow(width, 2) + pow(height, 2));
      this.score = 1 / (distance);
    }

    jump() {
      if (this.canJump) {
        let jumpForce = createVector(0, -5);
        this.applyForce(jumpForce);
      }
      this.canJump = false;
    }

    moveRight() {
      this.applyForce(createVector(0.1, 0));
    }

    moveLeft() {
      this.applyForce(createVector(- 0.1, 0));
    }

    getBrain() {
      let brain = [];
      for (let i = 0; i < this.lifeSpan; i++) {
        brain[i] = [];
        for (let j = 0; j < 3; j++) {
          brain[i][j] = random() > 0.5;
        }
      }
      return brain;
    }

    mutate(percentageOfGenes) {
      let numberOfGenes = floor(percentageOfGenes * this.lifeSpan);
      for (let i = 0; i < numberOfGenes; i++) {
        let index = floor(random(numberOfGenes));
        for (let j = 0; j < 3; j++) {
          this.brain[index][j] = !this.brain[index][j];
        }
      }
    }

    think() {
      if (!this.isAlive) return;
      let t = this.lifeTime;
      if(this.brain[t][0]) this.moveLeft();
      if(this.brain[t][1]) this.moveRight();
      if(this.brain[t][2]) this.jump();
    }

    bounceWalls(walls) {
      for (let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        let closestPoint = closestPointToLine(wall.startPoint, wall.endPoint, this.pos);
        if (!isPointOnSegment(wall.startPoint, wall.endPoint, closestPoint)) continue;
        let distance = dist(closestPoint.x, closestPoint.y, this.pos.x, this.pos.y);
        if (distance > this.r) continue;
        this.vel.reflect(wall.normalVector.copy());
        let friction = wall.normalVector.copy().mult(this.vel.mag() / wall.bounciness);
        this.vel.sub(friction);
        let newPos = p5.Vector.add(closestPoint, wall.normalVector.copy().mult(this.r));
        this.pos.set(newPos.x, newPos.y);
        if (wall.isJumpable) this.canJump = true;
      }
      
    }

    applyForce(force) {
      this.acc.add(force);
    }
  
    update() {
      if(!this.isAlive) return;
      this.vel.add(this.acc);
      this.vel.limit(2 * this.r);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.lifeTime ++;
      if (this.lifeTime > this.lifeSpan - 1) {
        this.isAlive = false;
      }
    } 
  
    show(...what) {
      push();
      translate(this.pos.x, this.pos.y);
      fill(255, 100);
      circle(0, 0, this.r * 2);
      pop();
      if (what.indexOf("speed") > -1) {
        push();
        stroke(0, 255, 0);
        translate(this.pos.x, this.pos.y);
        translate(this.vel.x  * 10, this.vel.y * 10);
        rotate(this.vel.heading());
        line(0, 0, - this.vel.mag() * 10, 0);
        line(0, 0, - this.vel.mag() * 2, this.vel.mag() * 2);
        line(0, 0, - this.vel.mag() * 2, - this.vel.mag() * 2);
        pop();
      }
      if (what.indexOf("acc") > -1) {
        push();
        stroke(237, 139, 100);
        translate(this.acc.x * 80, this.acc.y * 80);
        rotate(this.acc.heading());
        line(0, 0, - this.acc.mag() * 80, 0);
        line(0, 0, - this.acc.mag() * 15, this.acc.mag() * 15);
        line(0, 0, - this.acc.mag() * 15, - this.acc.mag() * 15);
        pop();
      }
    }
  }
  
