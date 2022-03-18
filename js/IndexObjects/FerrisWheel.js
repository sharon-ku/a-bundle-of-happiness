// Ferris wheel
// Spins and is held up by a static stand
// When mouse hovers over wheel, the lights change colors
class FerrisWheel {
  constructor(ferrisWheelImages, ferrisWheelStandImage) {
    // position information
    this.x = (width / 2) + 300;
    this.y = height - 320;

    // information for wheel
    this.wheel = {
      // stores images of wheel
      images: ferrisWheelImages,
      // stores current image number (index of wheel.images array)
      currentImage: 0,
      // frames elapsed between images
      framesElapsed: 0,
      // frames need to switch images
      framesBetweenImages: 10,
      // image width and height
      width: 200,
      height: 200,
      // radius of wheel
      radius: 100,
      // wheel angle (for rotation)
      theta: {
        current: 0,
        total: TWO_PI,
      },
      // wheel rotation speed
      rotationSpeed: PI / 180,
    };

    // information for wheel stand
    this.stand = {
      // image of stand that holds wheel up
      image: ferrisWheelStandImage,
      // image width and height
      width: 84,
      height: 144,
      // position information (offset from wheel's center position)
      xOffsetFromWheel: 2,
      yOffsetFromWheel: 80,
    };


  }

  // Display the image of the stand that holds ferris wheel up
  displayStand() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.stand.image, this.stand.xOffsetFromWheel, this.stand.yOffsetFromWheel);
    pop();
  }

  // Rotate the wheel about its center point
  rotateWheel() {
    translate(this.x, this.y);
    rotate(this.wheel.theta.current);
    this.wheel.theta.current += this.wheel.rotationSpeed;

    // When ferris wheel makes a full rotation (2pi), start a new rotation by setting theta back 2pi
    if (this.wheel.theta.current > this.wheel.theta.total) {
      this.wheel.theta.current -= this.wheel.theta.total;
    }
  }

  // Display the ferris wheel image
  displayWheel() {
    imageMode(CENTER);
    image(this.wheel.images[this.wheel.currentImage], 0, 0);
  }

  // Display wheel and stand images and rotate wheel
  displayAndRotate() {
    // display the image of stand that supports the wheel
    this.displayStand();

    push();
    // rotate wheel about its center
    this.rotateWheel();

    // display the wheel's image
    this.displayWheel();
    pop();
  }

  // Return true if mouse is overlapping with wheel
  overlapsWithMouse() {
    if (camera.mouseX > this.x - this.wheel.radius &&
    camera.mouseX < this.x + this.wheel.radius &&
    camera.mouseY > this.y - this.wheel.radius &&
    camera.mouseY < this.y + this.wheel.radius) {
      return true;
    }
    else {
      return false;
    }
  }

  // Switch between wheels images to create a lights animation
  animateWheelImages() {
    // Increase frames elapsed
    this.wheel.framesElapsed++;
    // Once frames elapsed is equal to frames needed to switch between the images, update current wheels image
    if (this.wheel.framesElapsed === this.wheel.framesBetweenImages) {
      if (this.wheel.currentImage === 0) {
        this.wheel.currentImage = 1;
      } else if (this.wheel.currentImage === 1) {
        this.wheel.currentImage = 2;
      } else if (this.wheel.currentImage === 2) {
        this.wheel.currentImage = 0;
      }
      // Reset frames elapsed to zero
      this.wheel.framesElapsed = 0;
    }
  }


}
