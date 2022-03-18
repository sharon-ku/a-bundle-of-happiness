// Butterfly
// Flies away from plant when mouse hovers over the plant
class Butterfly {
  constructor(butterflyImages, plant) {
    // array containing butterfly images
    this.images = butterflyImages;
    // stores current image number (index of this.images array)
    this.currentImage = 0;
    // frames elapsed between images
    this.framesElapsed = 0;
    // frames need to switch images
    this.framesBetweenImages = 15;
    // position information
    // this.x = random(
    //   plant.x + plant.width / 2 - plant.width / 3,
    //   plant.x + plant.width / 2 + plant.width / 3
    // );
    this.x = plant.x + plant.width;
    this.y = plant.y + plant.height / 2;
    // velocity information
    this.vx = 0;
    this.vy = 0;
    this.speed = random(0.5, 1);
    // height butterflies need to fly before they disappear
    this.disapperanceHeight = 100;

    // console.log(`plant: ${plant.x}`);
    console.log(this.x);
  }

  // Update butterfly's behaviour
  update() {
    // let butterfly fly
    this.fly();
    // display butterfly
    this.display();
  }

  // Let butterfly fly!
  fly() {
    this.vy = -this.speed;

    let change = random();
    if (change < 0.5) {
      this.vx = random(-this.speed, this.speed);
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  // create flapping wings animation by switching images
  flapWings() {
    // Increase frames elapsed
    this.framesElapsed++;
    // Once frames elapsed is equal to frames needed to switch between the images, update current wheels image
    if (this.framesElapsed === this.framesBetweenImages) {
      if (this.currentImage === 0) {
        this.currentImage = 1;
      } else if (this.currentImage === 1) {
        this.currentImage = 0;
      }
      // Reset frames elapsed to zero
      this.framesElapsed = 0;
    }
  }

  // Display butterfly image
  display() {
    push();
    imageMode(CENTER);
    scale(0.8);
    this.flapWings();

    image(this.images[this.currentImage], this.x, this.y);
    pop();
  }
}
