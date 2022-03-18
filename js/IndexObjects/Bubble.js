// Bubble that indicates hover instruction

class Bubble {
  constructor(anchorObject) {
    this.clutterRadius = 10; //10
    this.yDisplacement = 50;

    this.x = random(
      anchorObject.x - this.clutterRadius,
      anchorObject.x + this.clutterRadius
    );
    this.y = random(
      anchorObject.y - this.yDisplacement - this.clutterRadius,
      anchorObject.y - this.yDisplacement + this.clutterRadius
    );

    this.size = random(3, 5); //2-5

    this.fill = {
      r: 255,
      g: 255,
      b: 255,
      alpha: 255,
    };

    this.fadeOutSpeed = random(2, 5);

    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
  }

  update() {
    this.disperse();

    this.fadeOut();

    this.shrink();

    this.display();
  }

  shrink() {
    this.size -= 0.005;
  }

  disperse() {
    this.x += this.vx;
    this.y += this.vy;
  }

  fadeOut() {
    this.fill.alpha -= this.fadeOutSpeed;
  }

  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
