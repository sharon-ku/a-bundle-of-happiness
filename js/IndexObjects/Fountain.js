// Fountain
// Shoots from top of whale's head when mouse hovers over whale
class Fountain {
  constructor(fountainImages, whale) {
    // array containing fountain images
    this.images = fountainImages;
    // stores current image number (index of this.images array)
    this.currentImage = 0;
    // frames elapsed between images
    this.framesElapsed = 0;
    // frames need to switch images
    this.framesBetweenImages = 5;
    // position information
    this.x = whale.x - 25;
    this.y = whale.y - 63;
    // tracks when it's time to release fountain
    this.timeToRelease = false;
  }

  // Create fountain spraying animation by switching images
  spray() {
    // Increase frames elapsed
    this.framesElapsed++;
    // Once frames elapsed is equal to frames needed to switch between the images, update current wheels image
    if (this.framesElapsed === this.framesBetweenImages) {
      if (this.currentImage === 0) {
        this.currentImage = 1;
        // Reset frames elapsed
        this.framesElapsed = 2;
      } else if (this.currentImage === 1) {
        this.currentImage = 2;
        // Reset frames elapsed
        this.framesElapsed = 3;
      } else if (this.currentImage === 2) {
        this.currentImage = 3;
        // Reset frames elapsed
        this.framesElapsed = -5;
      } else if (this.currentImage === 3) {
        this.currentImage = 4;
        // Reset frames elapsed
        this.framesElapsed = -15;
      } else if (this.currentImage === 4) {
        this.currentImage = 0;
        // Set timeToRelease fountain to false when animation is over
        this.timeToRelease = false;
        // Reset frames elapsed
        this.framesElapsed = -15;
      }
    }
  }

  // Display fountain image
  display() {
    push();
    imageMode(CENTER);
    // scale(0.8);
    this.spray();
    image(this.images[this.currentImage], this.x, this.y);
    pop();
  }
}
