class String {
  constructor(x) {
    this.physics;
    this.particles = [];
    this.spring = [];
    this.numParticles = 50;
    this.numSprings = this.numParticles - 1;

    this.minLength = 200;
    this.maxLength = 650;
    this.length = random(this.minLength, this.maxLength);

    this.stiffness = 0.9;
    this.spacing = this.length / this.numSprings;

    this.x = x;

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
      this.particles[this.numParticles - 1].y + photoFrameImage.height / 2;
    translate(this.photoFrame.x, this.photoFrame.y);
    photoFrameScale = map(this.length, this.minLength, this.maxLength, 1, 0.8);
    scale(photoFrameScale);

    // photoFrameScale = map(
    //   this.particles[this.numParticles - 1].x,
    //   307,
    //   537,
    //   0.7,
    //   1
    // );
    image(
      photoFrameImage,
      0,
      0 - ((1 - photoFrameScale) * photoFrameImage.height) / 2
    );
    pop();

    // Move the last particle according to the mouse
    if (mouseIsPressed && this.overlapsMouse()) {
      this.particles[this.numParticles - 1].x = mouseX;
      // this.particles[this.numParticles - 1].x = constrain(
      //   this.particles[this.numParticles - 1].x,
      //   146,
      //   340
      // );
      // particles[numParticles-1].y = mouseY;

      console.log(mouseX);
    }
  }

  overlapsMouse() {
    if (
      mouseX > this.photoFrame.x - photoFrameImage.width / 2 &&
      mouseX < this.photoFrame.x + photoFrameImage.width / 2 &&
      mouseY > this.photoFrame.y - photoFrameImage.height / 2 &&
      mouseY < this.photoFrame.y + photoFrameImage.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
