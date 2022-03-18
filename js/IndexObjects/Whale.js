// Wally the whale
// Changes colors
class Whale {
  constructor() {
    // movement information
    this.x = width / 2 + 140;
    this.y = height - 160;
    // size information
    this.width = 134;
    this.height = 86;
    // animation information
    this.sprite = createSprite(this.x, this.y);
    this.whaleAnimation = loadAnimation(
      "assets/images/index/whale0.png",
      "assets/images/index/whale1.png",
      "assets/images/index/whale2.png",
      "assets/images/index/whale3.png"
    );
    // number of frames between each frame
    this.whaleAnimation.frameDelay = 70;
    // adding animation to the sprite
    this.sprite.addAnimation("changeColor", this.whaleAnimation);
  }

  // Returns true if object overlaps with whale
  overlapsWith(object) {
    return this.sprite.overlapPoint(object.x, object.y);
    // if (object.x < (this.x + this.width / 2) &&
    //   object.x > (this.x - this.width / 2) &&
    //   object.y < (this.y + this.height / 2) &&
    //   object.y > (this.y - this.height / 2)) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
