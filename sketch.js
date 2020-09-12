const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

let blocks = [];

let polygon_img, polygon;

function preload() {
  polygon_img = loadImage("polygon.png");
}

function setup() {
  createCanvas(800, 400);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 50);
  platform1 = new Ground(390, 315, 250, 40);

  for (let i = 300; i <= 480; i += 30) {
    blocks.push(new Block(i, 275, 30, 40));
  }

  for (let i = 330; i <= 450; i += 30) {
    blocks.push(new Block(i, 235, 30, 40));
  }

  for (let i = 360; i <= 420; i += 30) {
    blocks.push(new Block(i, 195, 30, 40));
  }

  blocks.push(new Block(390, 155, 30, 40));

  polygon = Bodies.circle(100, 200, 20, { density: 1.2, restitution: 0.4, friction: 1 });
  World.add(world, polygon);

  sling = new SlingShot(polygon, { x: 100, y: 200 });

  Engine.run(engine);
}

function draw() {
  background(0);

  ground.display();
  platform1.display();

  sling.display();

  imageMode(CENTER);
  image(polygon_img, polygon.position.x, polygon.position.y, 40, 40);

  for (let block of blocks) {
    block.display();
  }

  drawSprites();
  if (mouseIsPressed) {
    Body.setPosition(polygon, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  sling.fly();
}

function keyPressed() {
  if (key == ' ') {
    sling.attach(polygon);
  }
}