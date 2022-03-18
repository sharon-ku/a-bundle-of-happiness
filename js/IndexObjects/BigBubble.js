class BigBubble {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = 200;

    this.fill = {
      r: 255,
      g: 255,
      b: 255,
      alpha: 50,
    };
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  update() {
    this.display();
  }

  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
