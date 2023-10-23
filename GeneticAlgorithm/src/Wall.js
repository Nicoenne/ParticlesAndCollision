class Wall {
    constructor(startPointX, startPointY, endPointX, endPointY, ...what) {
      this.startPoint = createVector(startPointX, startPointY);
      this.endPoint   = createVector(endPointX, endPointY);
      this.normalVector = this.getNormalVector();
      this.midPoint = this.getMidPoint();
      this.bounciness = 2;
      this.isJumpable = false;

      if (what.indexOf("jumpable") > -1) {
        this.isJumpable = true;
      }
    }
  
    getNormalVector() {
      let n = p5.Vector.sub(this.endPoint, this.startPoint);
      n.normalize();
      n.rotate(- HALF_PI);
      return n;
    }
  
    getMidPoint() {
      let m = p5.Vector.add(this.startPoint, this.endPoint);
      m.div(2);
      return m;
    }
  
    show(...what) {
      push();
      stroke(255);
      line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
      pop();
      if (what.indexOf("normal") > -1) {
        let arrowLength = 15;
        let sideLength = 5;
        let endPoint = p5.Vector.add(this.midPoint, p5.Vector.mult(this.normalVector, arrowLength));
        push();
        stroke(255, 0, 0);
        translate(endPoint.x, endPoint.y);
        rotate(this.normalVector.heading());
        line(0, 0, - arrowLength, 0);
        line(0, 0, - sideLength, sideLength);
        line(0, 0, - sideLength, -sideLength);
        pop();
      }
    }
  }