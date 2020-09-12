class Block {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;

    var options = {
      restitution: 0.4,
      friction: 1,
      density: 0.8
    }

    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    World.add(world, this.body);

    this.visibility = 255;

    this.col = { r: random(255), g: random(255), b: random(255) }
  }

  display() {
    if (this.body.speed < 3) {
      rectMode(CENTER);
      fill(this.col.r, this.col.g, this.col.b);
      noStroke();
      rect(this.body.position.x, this.body.position.y, this.width, this.height);
    } else {
      rectMode(CENTER);
      noStroke();
      fill(this.col.r, this.col.g, this.col.b, this.visibility);
      this.visibility -= 5;
      rect(this.body.position.x, this.body.position.y, this.width, this.height);
      World.remove(world, this.body);
    }
  }
}
