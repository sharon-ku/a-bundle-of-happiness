// Globe
// Contains unicorn and is supported by base
// When mouse hovers over globe, unicorn flaps wings and changes horn colors
class Globe {
  constructor(globeImage, globeBaseImage, unicornImages) {
    // contains globe image
    this.globeImage = globeImage;
    // position information
    this.x = width / 2 - 180;
    this.y = height - 230;
    // radius of globe
    this.radius = 134 / 2;

    // globe's base
    this.base = {
      // contains image of base
      image: globeBaseImage,
      // position relative to globe's x and y positions
      xOffsetFromGlobe: 0,
      yOffsetFromGlobe: 78,
    };

    // globe's unicorn
    this.unicorn = {
      // contains array of unicorn images
      images: unicornImages,
      // stores current image number (index of wheel.images array)
      currentImage: 0,
      // frames elapsed between images
      framesElapsed: 0,
      // frames need to switch images
      framesBetweenImages: 15,
    };
  }

  // Update all behaviour of globe
  update(mouse) {
    // Display globe images: its base, the actual globe, unicorn inside
    this.displayBase();
    this.displayGlobe();
    this.displayUnicorn();
  }

  // Display unicorn image
  displayUnicorn() {
    push();
    imageMode(CENTER);
    image(this.unicorn.images[this.unicorn.currentImage], this.x, this.y);
    pop();
  }

  // Switch between unicorn images to create a wing flapping animation
  unicornFlapsWings() {
    // Increase frames elapsed
    this.unicorn.framesElapsed++;
    // Once frames elapsed is equal to frames needed to switch between the images, update current image
    if (this.unicorn.framesElapsed === this.unicorn.framesBetweenImages) {
      if (this.unicorn.currentImage === 0) {
        this.unicorn.currentImage = 1;
      } else if (this.unicorn.currentImage === 1) {
        this.unicorn.currentImage = 2;
      } else if (this.unicorn.currentImage === 2) {
        this.unicorn.currentImage = 3;
      } else if (this.unicorn.currentImage === 3) {
        this.unicorn.currentImage = 0;
      }
      // Reset frames elapsed to zero
      this.unicorn.framesElapsed = 0;
    }
  }

  // Returns true if object overlaps with globe
  overlapsWith(object) {
    // Calculating distance between object's and globe's center points
    let distBtwObjectAndGlobe = dist(object.x, object.y, this.x, this.y);

    // If the object is inside the globe, return true
    if (distBtwObjectAndGlobe < this.radius) {
      return true;
    } else {
      return false;
    }
  }

  // Display globe image
  displayGlobe() {
    push();
    imageMode(CENTER);
    image(this.globeImage, this.x, this.y);
    pop();
  }

  // Display image of globe's base
  displayBase() {
    push();
    imageMode(CENTER);
    image(
      this.base.image,
      this.x + this.base.xOffsetFromGlobe,
      this.y + this.base.yOffsetFromGlobe
    );
    pop();
  }
}
