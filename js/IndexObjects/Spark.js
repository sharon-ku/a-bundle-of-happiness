// Spark
// Emitted from the unicorn's horn when mouse hovers on globe
class Spark {
  constructor(globe) {
    // size of spark line
    this.length = 20;
    // stroke weight of spark line
    this.strokeWeight = 2;
    // stroke color of spark line
    this.strokeFill = {
      r: random(125, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
    // position information
    // (x1, y1) and (x2, y2) are the coordinates of the end points of the line
    this.x1 = globe.x + random(50,80);
    this.y1 = globe.y - random(70,100);
    this.x2 = globe.x + 40;
    this.y2 = globe.y - 53;
    // speed information
    this.vx = 5;
    this.vy = random(5, 10);
    // acceleration informtaion
    this.ax = 0;
    this.ay = -2;
  }

  // Display the spark line
  display() {
    push();
    strokeWeight(this.strokeWeight);
    stroke(255);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
