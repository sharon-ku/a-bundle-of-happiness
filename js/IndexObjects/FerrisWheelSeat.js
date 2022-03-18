// Ferris wheel seat
// Revolves around ferris wheel's center
class FerrisWheelSeat {
  constructor(seatImage, initialAngle) {
    // stores image of seat
    this.image = seatImage;
    // size information
    this.width = 68;
    this.height = 39;
    // position information
    this.x = 0;
    this.y = 0;
    // angle information
    this.theta = {
      current: initialAngle,
    };
    // rotation speed
    this.rotationSpeed = PI / 180;
  }

  // Rotate the seats about the wheel's center
  rotate(wheelRadius) {
    this.x = wheelRadius * cos(this.theta.current);
    this.y = wheelRadius * sin(this.theta.current);
    this.theta.current += this.rotationSpeed;
  }

  // Display the seat's image
  display(ferrisWheel) {
    push();
    this.rotate(ferrisWheel.wheel.radius);

    translate(ferrisWheel.x, ferrisWheel.y);
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }



}
