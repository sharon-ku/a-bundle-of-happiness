// Plant
// Its leaves move around
class Plant {
  constructor() {
    // movement information
    this.x = width / 2 - 350;
    this.y = height - 280;
    // size information
    this.width = 137;
    this.height = 195;
    // animation information
    this.sprite = createSprite(this.x, this.y);
    this.plantAnimation = loadAnimation(
      "assets/images/index/plant0.png",
      "assets/images/index/plant1.png"
    );
    // number of frames between each frame
    this.plantAnimation.frameDelay = 40;
    // adding animation to the sprite
    this.sprite.addAnimation("moveLeaves", this.plantAnimation);
  }

  // Returns true if object overlaps with plant
  overlapsWith(object) {
    if (
      object.x < this.x + this.width / 2 &&
      object.x > this.x - this.width / 2 &&
      object.y < this.y + this.height / 2 &&
      object.y > this.y - this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
