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
      this.title = `A Snail's Journey`;
    } else if (imageNumber === 1) {
      this.imageName = `fogdog`;
      this.title = `Fogdog`;
    } else if (imageNumber === 2) {
      this.imageName = `water`;
      this.title = `The Water Scene`;
    } else if (imageNumber === 3) {
      this.imageName = `slap`;
      this.title = `Slap Slap`;
    } else if (imageNumber === 4) {
      this.imageName = `saturday`;
      this.title = `Saturday Morning`;
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

    // Only show text when hovering over picture
    this.showText = false;

    // Make particles
    for (let i = 0; i < this.numParticles; i++) {
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

    if (width < 400) {
      this.photoFrameScale = 0.5;
    } else {
      this.photoFrameScale = 0.8;
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
    // if (width < 400) {
    //   this.photoFrameScale = 0.5;
    // } else {
    //   this.photoFrameScale = 0.8;
    // }
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

    if (this.showText) {
      this.displayName();
    }

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
    if (this.overlapsMouse() && $(`#info-box`).is(":hidden")) {
      this.setCorrectInfo();

      $(`#dark-filter`).show();

      // $(`#info-box`).hide("slide", { direction: "left" }, 1000);
      $(`#info-box`).show();

      // $(`#info-box`).addClass(`show-info-box`);
    }
  }

  setCorrectInfo() {
    // A Snail's Journey
    if (this.imageName === `snail`) {
      // change title
      $(`#info-box > h1`).text(`A Snail's Journey`);
      // change paragraph
      $(`#info-box > p`)
        .text(`Ring-a-ring-ding-ding! Shelee the snail got a special phone call from
        her friend. She's invited to play in a game of hide-and-seek.
        Shelee has to get out of her shell and explore the wilderness.`);
      // change link
      $(`#info-box > a`).attr(
        "href",
        "https://sharonku.itch.io/a-snails-journey"
      );
      // change image
      $(`#info-box > figure > img`).attr(
        "src",
        "assets/images/index/screenshots/snail/5.png"
      );
    } else if (this.imageName === `fogdog`) {
      // change title
      $(`#info-box > h1`).text(`Fogdog`);
      // change paragraph
      $(`#info-box > p`).text(
        `Fogdog is an interactive game about a little circular character named Kay. Kay follows a routine each day: waking up in the morning to check emails, heading to work, doing tasks at work while being judged harshly by Peep the bird, then going home at night and spending some quality time saying affirmations out loud.`
      );
      // change link
      $(`#info-box > a`).attr(
        "href",
        "https://sharon-ku.github.io/cart263/projects/project2/"
      );
      // change image
      $(`#info-box > figure > img`).attr(
        "src",
        "assets/images/index/screenshots/fogdog/0.png"
      );
    } else if (this.imageName === `water`) {
      // change title
      $(`#info-box > h1`).text(`The Water Scene`);
      // change paragraph
      $(`#info-box > p`).text(
        `Take part in a relaxing boat ride on a river. Dodge the rocks along the way and navigate towards the sun.`
      );
      // change link
      $(`#info-box > a`).attr(
        "href",
        "https://sharonku.itch.io/the-water-scene"
      );
      // change image
      $(`#info-box > figure > img`).attr(
        "src",
        "assets/images/index/screenshots/water/0.png"
      );
    } else if (this.imageName === `saturday`) {
      // change title
      $(`#info-box > h1`).text(`When You Try to Wake Up on a Saturday Morning`);
      // change paragraph
      $(`#info-box > p`).text(
        `Welcome to a silly narrative game inspired by waking up on a Saturday morning. You hold the power to decide what to do next.`
      );
      // change link
      $(`#info-box > a`).attr(
        "href",
        "https://sharonku.itch.io/when-you-try-to-wake-up-on-a-saturday-morning"
      );
      // change image
      $(`#info-box > figure > img`).attr(
        "src",
        "assets/images/index/screenshots/saturday/0.png"
      );
    } else if (this.imageName === `slap`) {
      // change title
      $(`#info-box > h1`).text(`Slap Slap`);
      // change paragraph
      $(`#info-box > p`).text(
        `Slap around and make unexpected sounds! This is a short prototype on the potentials that the player can unlock from controlling a giant hand.`
      );
      // change link
      $(`#info-box > a`).attr(
        "href",
        "https://sharonku.itch.io/slap-slap?secret=FcuxMz3rBnJZhDUfamK8vNB6Y"
      );
      // change image
      $(`#info-box > figure > img`).attr(
        "src",
        "assets/images/index/screenshots/slap/0.png"
      );
    }
  }

  displayName() {
    // let mainFont = "Poppins";

    let textX = this.photoFrame.x;
    let textY =
      this.photoFrame.y +
      (this.images[0].height * this.photoFrameScale) / 2 -
      10;

    push();
    fill(0);
    rectMode(CENTER);

    // let bbox = mainFont.textBounds(this.title, textX, textY, 15);

    strokeWeight(0);
    // rect(textX, textY, 150, 30, 15);
    // rect(bbox.x, bbox.y, bbox.w, bbox.h);
    pop();

    push();
    fill(255).strokeWeight(0);
    textAlign(CENTER);
    textFont("Poppins");
    textSize(15);

    text(this.title, textX, textY);
    pop();
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
      // cursor.classList.add("hover");
      this.showText = true;

      // this.photoFrameScale = 0.9;
      console.log(this.imageName);
      return true;
    } else {
      this.showText = false;

      // if (width < 400) {
      //   this.photoFrameScale = 0.5;
      // } else {
      //   this.photoFrameScale = 0.8;
      // }
      // cursor.classList.remove("hover");
      return false;
    }
  }
}
