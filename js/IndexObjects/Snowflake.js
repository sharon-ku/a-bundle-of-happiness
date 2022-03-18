// Snowflake
// Falls to the bottom of the globe
class Snowflake {
  constructor(globe) {
    // size of snowflake
    this.size = 6;
    // movement information
    this.x = random(globe.x - globe.radius, globe.x + globe.radius);
    this.y = random(globe.y - globe.radius, globe.y + globe.radius);
    this.speed = 0.5;
    this.vx = 0;
    this.vy = 0;
    // light pink
    this.fill = {
      r: 237,
      g: 217,
      b: 228,
    };
  }

  // Update all behaviour of snowflake
  update(globe) {
    // only display snowflake when it is inside the globe
    if (this.isInsideGlobe(globe)) {
      this.display();
    }

    // let snowflake fall
    this.fall();

    // wrap snowflake back to top once it reaches bottom of globe
    this.wrapBackToTop(globe);
  }

  // Returns true if object overlaps with globe
  isInsideGlobe(globe) {
    // Calculating distance between object's and globe's center points
    let distBtwObjectAndGlobe = dist(this.x, this.y, globe.x, globe.y);

    // If the object is inside the globe, return true
    if (distBtwObjectAndGlobe < globe.radius - this.size) {
      return true;
    } else {
      return false;
    }
  }

  // Wrap snowflake back to top when it reaches the bottom of the globe
  wrapBackToTop(globe) {
    if (this.y > globe.y + globe.radius) {
      this.y -= 2 * globe.radius;
    }
  }

  // Display a snowflake as a circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Make snowflake fall
  fall() {
    this.vy = this.speed;
    this.y += this.vy;
  }
}
