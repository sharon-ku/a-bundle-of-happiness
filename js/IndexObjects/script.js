/**************************************************
Portfolio Index Page Interactive Elements
Sharon Ku

Four interesting objects are found on the tabletop:
1) A plant with moving leaves positioned on top of books
2) A globe containing a unicorn and falling snowflakes
3) A whale named Wally that changes colors
4) A Ferris wheel that rotates

When the user hovers over each of these objects, this is what happens:
1) The plant releases a set of butterflies that fly upwards
2) The unicorn inside the globe flaps its wings as a way of saying "hi"
3) Wally the whale stays the same.
4) The Ferris wheel lights up brilliantly.
**************************************************/

let numFrameImages = 5;

let overlapImage = false;

// $(`#frame-images`).position()

$(`.close`).click(() => {
  // $(`#info-box`).removeClass(`show-info-box`);
  $(`#info-box`).hide();
  $(`#dark-filter`).hide();
});

// canvas that contains animated content
let canvas;
let canvasX;
let canvasY;

// paragraph of text that contains description about me
let paragraph;

// background color: navy blue
// hex code: #3f738c
let bg = {
  r: 63,
  g: 115,
  b: 140,
};

// table that holds objects
let table;
// table width
let tableWidth = undefined;

// mouse that follows cursor
let mouse = {
  x: 0,
  y: 0,
  size: 20,
};

// plant
let plant;

// array that stores my pretty butterflies
let butterflies = [];
// tracks whether it is time to release butterflies or not
let releaseButterflies = false;

// keeping track of frames to know when to release new butterfly
let butterflyFrames = {
  elapsed: 149,
  neededToReleaseNewButterfly: 150,
};

// array that stores images of butterfly
let butterflyImages = [];
// number of butterfly images
const NUM_BUTTERFLY_IMAGES = 2;

// globe that houses unicorn
let globe;

// stores image of globe and globe base
let globeImage = undefined;
let globeBaseImage = undefined;

// array that stores images of unicorn
let unicornImages = [];
// number of unicorn images
const NUM_UNICORN_IMAGES = 4;

// array that stores sparks emitted from unicorn's horn
let sparks = [];
// number of sparks
let numSparks = 10;

// array that stores snowflakes
let snowflakes = [];
// number of snowflakes inside globe
const NUM_SNOWFLAKES = 20;

// Wally the whale
let whale;

// array that stores fountain images that Wally will spew out
let fountainImages = [];
// number of fountain images
const NUM_FOUNTAIN_IMAGES = 5;

// ferris wheel
let ferrisWheel;

// contains ferris wheel images
let ferrisWheelImage = {
  // array that stores wheel images
  wheels: [],
  // number of wheel images
  numWheelImages: 3,
  // image of stand that holds wheel up
  stand: undefined,
  // image of ferris wheel seat
  seat: undefined,
};

// array that contains ferris wheel seats
let ferrisWheelSeats = [];
// number of ferris wheel seats
const NUM_SEATS = 6;
// angle used to position seat relative to wheel's center
let seatInitialAngle = 0;

let bubbles = [];
let numBubbles = 30;
let randomAnchorObject = undefined;
let delayToSwitchAnchorObject = 5000;

let bigBubbles = [];
let numBigBubbles = 5;

// // String
let strings = [];
let numStrings = 5;

let photoFrames = [];
let photoFrameImage = undefined;

let photoFrameImages = [];
let numPhotoFrameImages = 5;

let clickImage = undefined;

// preload()
//
// Preloads assets (images, sounds, fonts)
function preload() {
  // load click image
  clickImage = loadImage(`assets/images/click.png`);

  // load photo frame image
  photoFrameImage = loadImage(`assets/images/photo-frame.png`);

  // Load photo frame images
  for (let i = 0; i < numPhotoFrameImages; i++) {
    let image = loadImage(
      `assets/images/index/photo-frames/photo-frame${i}.png`
    );
    photoFrameImages.push(image);
  }

  // store images of butterfly inside butterflyImages array
  for (let i = 0; i < NUM_BUTTERFLY_IMAGES; i++) {
    let butterflyImage = loadImage(`assets/images/index/butterfly${i}.png`);
    butterflyImages.push(butterflyImage);
  }

  // image of globe
  globeImage = loadImage(`assets/images/index/globe.png`);
  // image of globe base
  globeBaseImage = loadImage(`assets/images/index/globeBase.png`);

  // store images of unicorn inside unicornImages array
  for (let i = 0; i < NUM_UNICORN_IMAGES; i++) {
    let unicornImage = loadImage(`assets/images/index/unicorn${i}.png`);
    unicornImages.push(unicornImage);
  }

  // store images of fountain inside fountainImages array
  for (let i = 0; i < NUM_FOUNTAIN_IMAGES; i++) {
    let fountainImage = loadImage(`assets/images/index/fountain${i}.png`);
    fountainImages.push(fountainImage);
  }

  // store images of wheel inside ferrisWheelImage.wheels array
  for (let i = 0; i < ferrisWheelImage.numWheelImages; i++) {
    let loadedImage = loadImage(`assets/images/index/ferrisWheel${i}.png`);
    ferrisWheelImage.wheels.push(loadedImage);
  }

  // image of stand that holds wheel
  ferrisWheelImage.stand = loadImage(
    `assets/images/index/ferrisWheelStand.png`
  );
  // image of ferris wheel seat
  ferrisWheelImage.seat = loadImage(`assets/images/index/ferrisWheelSeat.png`);
}

// setup()
//
// Create canvas, remove all strokes, create all objects
function setup() {
  // Create a canvas that takes up full screen
  canvas = createCanvas(windowWidth, windowHeight);

  // Remove strokes on all shapes
  noStroke();

  // Hide cursor
  // noCursor();

  // Center canvas on window
  centerCanvas();
  // Place canvas behind DOM elements
  canvas.style(`z-index`, `-1`);

  // Create a new table
  table = new Table();

  // Create a new plant
  plant = new Plant();

  // Create a new globe
  globe = new Globe(globeImage, globeBaseImage, unicornImages);

  // Create new snowflakes and store them in snowflakes array
  for (let i = 0; i < NUM_SNOWFLAKES; i++) {
    let snowflake = new Snowflake(globe);
    snowflakes.push(snowflake);
  }

  // Create a new array that stores sparks
  for (let i = 0; i < numSparks; i++) {
    let spark = new Spark(globe);
    sparks.push(spark);
  }

  // Create a new whale
  whale = new Whale();

  // Create a new fountain
  fountain = new Fountain(fountainImages, whale);

  // Create a new ferris wheel
  ferrisWheel = new FerrisWheel(
    ferrisWheelImage.wheels,
    ferrisWheelImage.stand
  );

  // Create 6 new ferris wheel seats and push to ferrisWheelSeats array
  for (let i = 0; i < NUM_SEATS; i++) {
    // The seat's initial angles are equally spaced across the perimeter of the ferris wheel:
    seatInitialAngle = i * (TWO_PI / NUM_SEATS) + PI / 2;
    // Create a new seat positioned at the initial angle
    let ferrisWheelSeat = new FerrisWheelSeat(
      ferrisWheelImage.seat,
      seatInitialAngle
    );
    // Push to new seat to the ferrisWheelSeats array
    ferrisWheelSeats.push(ferrisWheelSeat);
  }

  // Create new bubbles
  randomAnchorObject = plant;
  createBubbles(randomAnchorObject);

  setInterval(switchAnchorObject, delayToSwitchAnchorObject);

  // Create big container bubbles
  for (let i = 0; i < numBigBubbles; i++) {
    let bigBubble = new BigBubble();
    bigBubbles.push(bigBubble);
  }

  // Create a dangling string
  for (let i = 0; i < numStrings; i++) {
    // tracks the image we're looking at
    let imageNumber = i;

    let stringX;
    let string;
    // photo frame images
    let stringImages = [photoFrameImages[i], photoFrameImages[i + 1]];

    if (width < 1000) {
      stringX = width / (numStrings + 1);
      string = new String(stringX * (i + 1), stringImages, imageNumber);
    } else {
      let totalStringSpan = 800;
      let distBetweenStrings = totalStringSpan / (numStrings - 1);

      let midStringX = width / 2;

      let firstStringPositionX =
        midStringX - floor(numStrings / 2) * distBetweenStrings;
      stringX = firstStringPositionX + distBetweenStrings * i;

      string = new String(stringX, stringImages, imageNumber);
    }

    strings.push(string);
  }
}

function switchAnchorObject() {
  let allObjects = [plant, globe, ferrisWheel, whale];
  let tryThisObject = random(allObjects);

  // if the randomly picked object is the same as previous, keep randomizing
  while (randomAnchorObject === tryThisObject) {
    tryThisObject = random(allObjects);
  }

  // Set random object to new object
  randomAnchorObject = tryThisObject;
}

// Create new bubbles
function createBubbles(anchorObject) {
  for (let i = 0; i < numBubbles; i++) {
    let bubble = new Bubble(anchorObject);
    bubbles.push(bubble);
  }
}

// Center canvas to window
function centerCanvas() {
  canvasX = (windowWidth - width) / 2;
  canvasY = (windowHeight - height) / 2;

  // let canvasDistanceFromBottom = 50;
  // canvasY = (windowHeight - height) / 2 - canvasDistanceFromBottom;
  canvas.position(canvasX, canvasY);
}

// windowResized()
//
// Resize canvas every time window size changes
function windowResized() {
  console.log(`resized`);
  // resize canvas to window width and height
  resizeCanvas(windowWidth, windowHeight);

  // center canvas in middle of window
  centerCanvas();
}

// draw()
//
// Set mouse's x and y position, set background color, create all interactive table elements
function draw() {
  // Set mouse's position to camera's position
  mouse.x = camera.mouseX;
  mouse.y = camera.mouseY;

  // if (overlapImage) {
  //   cursor.classList.add("hover");
  // } else {
  //   cursor.classList.remove("hover");
  // }

  // Set bg color
  background(bg.r, bg.g, bg.b);

  // Create table elements: table, butterflies, globe, ferris wheel, whale, plant
  updateTableElements();

  // // Display sparks
  // for (let i = 0; i < sparks.length; i++) {
  //   let spark = sparks[i];
  //   // spark.display();
  // }

  // Update dangling string
  for (let i = 0; i < strings.length; i++) {
    let string = strings[i];
    string.update();

    if (i === strings.length - 1) {
      // Add click image
      push();
      let clickImageX =
        string.photoFrame.x +
        50 +
        (string.images[0].width * string.photoFrameScale) / 2;
      let clickImageY = string.photoFrame.y - 100;
      imageMode(CENTER);
      image(clickImage, clickImageX, clickImageY);
      pop();
    }
  }
}

// Create table elements: table, butterflies, globe, ferris wheel, whale, plant
function updateTableElements() {
  // updateBigBubbles();

  // Display table
  tableWidth = width;
  table.display(tableWidth);

  if (width > 400 && height > 700) {
    updateBubbles();

    // Release fountain if mouse hovers over whale
    releaseFountain();

    // Create butterflies that have the following behaviours:
    // If mouse hovers over plant, release butterflies at a certain ineterval
    // Butterflies flap wings
    createButterflies();

    // Create a globe that contains all these behaviours:
    // Displays globe and unicorn
    // Release snowflakes inside globe
    // Unicorn flaps wings when mouse hovers on globe
    createGlobe();

    // Create a ferris wheel that contains all these behaviours:
    // Display rotating ferris wheel and seats that revolve around it
    // Lights animation when mouse hovers over ferris wheel
    createFerrisWheel();
  }

  // Draw all sprites: whale animation, plant animation
  drawSprites();
}

// Create butterflies that have the following behaviours:
// If mouse hovers over plant, release butterflies at a certain ineterval
// Butterflies flap wings
function createButterflies() {
  // If mouse hovering over plant, release butterflies
  if (plant.overlapsWith(mouse)) {
    releaseButterflies = true;
  } else {
    // Make frames elapsed closer to total frames elapsed
    butterflyFrames.elapsed = butterflyFrames.neededToReleaseNewButterfly - 1;
  }

  // If it's time to release butterflies, create butterflies at an interval of time
  if (releaseButterflies) {
    // Increase frames elapsed
    butterflyFrames.elapsed++;
    // Once frames elapsed is equal to frames needed to switch between the images, update current wheels image
    if (
      butterflyFrames.elapsed === butterflyFrames.neededToReleaseNewButterfly
    ) {
      // Create new butterfly
      let butterfly = new Butterfly(butterflyImages, plant);
      butterflies.push(butterfly);
      // Reset frames elapsed to zero
      butterflyFrames.elapsed = 0;
    }

    // Set releaseButterflies to false to prevent more butterflies from being released
    releaseButterflies = false;
  }

  // Display butterflies and let them fly
  // Also remove butterfly from array if it goes off canvas
  for (let i = 0; i < butterflies.length; i++) {
    let butterfly = butterflies[i];
    // let butterfly fly and display it
    butterfly.update();

    // If butterfly goes off canvas, remove it from butterflies array
    if (butterfly.y < 0) {
      butterflies.splice(i, 1);
    }
  }
}

// Display globe with unicorn and falling snow inside it
// And unicorn flaps wings when mouse hovers over globe
function createGlobe() {
  // If mouse hovers over globe
  if (globe.overlapsWith(mouse)) {
    // Release snowflakes behind the globe
    releaseSnowflakes();

    // allow unicorn to flap wings
    globe.unicornFlapsWings();
  }

  // Update all behaviour of globe
  globe.update(mouse);

  // Release snowflakes in front of the globe
  if (globe.overlapsWith(mouse)) {
    // Release snowflakes behind the globe
    releaseSnowflakes();
  }
}

// Display snowflakes, let them fall, and wrap to top when they reach the bottom of the globe
function releaseSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    let snowflake = snowflakes[i];
    snowflake.update(globe);
  }
}

// Display rotating ferris wheel with seats that revolve around it
// And create a lights animation when mouse hovers over ferris wheel
function createFerrisWheel() {
  // Display ferris wheel seats
  for (let i = 0; i < ferrisWheelSeats.length; i++) {
    let ferrisWheelSeat = ferrisWheelSeats[i];
    ferrisWheelSeat.display(ferrisWheel);
  }

  // Display and rotate ferris wheel
  ferrisWheel.displayAndRotate();

  // If mouse overlaps with ferris wheel, cue lights animation by switching between wheel images
  if (ferrisWheel.overlapsWithMouse()) {
    ferrisWheel.animateWheelImages();
  }
}

// Release fountain if mouse hovers over whale
function releaseFountain() {
  // If the mouse hovers over the whale image, set timeToRelease fountain to true
  if (whale.overlapsWith(mouse)) {
    fountain.timeToRelease = true;
  }

  // If it's time to release the fountain, display the fountain
  if (fountain.timeToRelease) {
    fountain.display();
  }
}

function updateBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    bubble.update();

    if (bubble.fill.alpha <= 0) {
      bubbles.splice(i, 1);
    }
  }

  if (bubbles.length <= numBubbles * 0.8) {
    createBubbles(randomAnchorObject);
  }
}

function updateBigBubbles() {
  for (let i = 0; i < bigBubbles.length; i++) {
    let bigBubble = bigBubbles[i];

    bigBubble.update();
  }
}

// function mousePressed() {
//   // Click on photo frame
//   for (let i = 0; i < strings.length; i++) {
//     strings[i].mousePressed();
//   }
// }

function mouseReleased() {
  // Click on photo frame
  for (let i = 0; i < strings.length; i++) {
    strings[i].mouseReleased();
  }
}
