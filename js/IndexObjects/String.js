class String {
  constructor(x, images, imageNumber) {
    this.physics;
    this.particles = [];
    this.spring = [];
    this.numParticles = 50;
    this.numSprings = this.numParticles - 1;

    this.maxLength = 500;

    if (height > 500) {
      this.minLength = 200;
    } else {
      this.minLength = this.maxLength - 100;
    }

    this.length = random(this.minLength, this.maxLength);

    this.stiffness = 0.9;
    this.spacing = this.length / this.numSprings;

    this.x = x;
    this.images = images;

    // Set image name
    if (imageNumber === 0) {
      this.imageName = `snail`;
    } else if (imageNumber === 1) {
      this.imageName = `fogdog`;
    } else if (imageNumber === 2) {
      this.imageName = `water`;
    } else if (imageNumber === 3) {
      this.imageName = `saturday`;
    } else if (imageNumber === 4) {
      this.imageName = `slap`;
    }

    // Initialize the physics
    this.physics = new VerletPhysics2D();
    this.physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

    // Set the world's bounding box
    this.physics.setWorldBounds(new Rect(0, 0, width, height));

    // Photo frame properties
    this.photoFrame = {
      x: undefined,
      y: undefined,
    };

    this.photoFrameScale = 1;

    // Make particles
    for (var i = 0; i < this.numParticles; i++) {
      this.particles[i] = new Particle(new Vec2D(this.x, i * this.spacing));

      // Anything we make, we have to add into the physics world
      this.physics.addParticle(this.particles[i]);

      if (i > 0) {
        // Make a spring connecting both Particles
        this.spring[i - 1] = new VerletSpring2D(
          this.particles[i - 1],
          this.particles[i],
          this.spacing,
          this.stiffness
        );
        this.physics.addSpring(this.spring[i - 1]);
      }

      // Lock one in place
      this.particles[0].lock();
    }
  }

  update() {
    this.overlapsMouse();

    // Update the physics world
    this.physics.update();

    // background(51);

    // Draw a line between the particles
    stroke(200);
    strokeWeight(2);

    // Display the particles
    for (let i = 0; i < this.numParticles; i++) {
      if (i > 0) {
        line(
          this.particles[i - 1].x,
          this.particles[i - 1].y,
          this.particles[i].x,
          this.particles[i].y
        );
      }
    }

    // Display photo frame image
    push();
    imageMode(CENTER);

    this.photoFrame.x = this.particles[this.numParticles - 1].x;
    this.photoFrame.y =
      this.particles[this.numParticles - 1].y + this.images[0].height / 2;
    translate(this.photoFrame.x, this.photoFrame.y);
    // this.photoFrameScale = map(this.length, this.minLength, this.maxLength, 0.8, 1);
    if (width < 400) {
      this.photoFrameScale = 0.5;
    } else {
      this.photoFrameScale = 0.8;
    }
    scale(this.photoFrameScale);

    // this.photoFrameScale = map(
    //   this.particles[this.numParticles - 1].x,
    //   307,
    //   537,
    //   0.7,
    //   1
    // );
    image(
      this.images[0],
      0,
      0 - ((1 - this.photoFrameScale) * this.images[0].height) / 2 - 30
    );
    pop();

    // Move the last particle according to the mouse
    if (mouseIsPressed && this.overlapsMouse()) {
      // // FOR FUN:
      // this.particles[this.numParticles - 1].x = mouseX;
      // this.particles[this.numParticles - 1].x = constrain(
      //   this.particles[this.numParticles - 1].x,
      //   146,
      //   340
      // );
      // particles[numParticles-1].y = mouseY;
      // $(`#info-box`).hide("slide", { direction: "left" }, 1000);
      // $(`#info-box`).toggle();
      //
      // console.log(this.imageName);
      //
      // console.log(mouseX);
    }
  }

  mouseReleased() {
    // Move the last particle according to the mouse
    if (this.overlapsMouse()) {
      // $(`#info-box`).hide("slide", { direction: "left" }, 1000);
      $(`#info-box`).show(1000);

      $(`#info-box`).addClass(`show-info-box`);
    }
  }

  overlapsMouse() {
    if (
      mouseX >
        this.photoFrame.x - (this.images[0].width * this.photoFrameScale) / 2 &&
      mouseX <
        this.photoFrame.x + (this.images[0].width * this.photoFrameScale) / 2 &&
      mouseY >
        this.photoFrame.y -
          (this.images[0].height * this.photoFrameScale) / 2 &&
      mouseY <
        this.photoFrame.y + (this.images[0].height * this.photoFrameScale) / 2
    ) {
      console.log(this.imageName);
      return true;
    } else {
      return false;
    }
  }
}
