var monkey, ground;
var ObstaclesGroup;
var monkeyAnimation, stoneImg, bg;
var score;

function preload() {
  monkeyAnimation = loadAnimation(
    "sprites/Monkey_01.png",
    "sprites/Monkey_02.png",
    "sprites/Monkey_03.png",
    "sprites/Monkey_04.png",
    "sprites/Monkey_05.png",
    "sprites/Monkey_06.png",
    "sprites/Monkey_07.png",
    "sprites/Monkey_08.png",
    "sprites/Monkey_09.png",
    "sprites/Monkey_10.png"
  );
  stoneImg = loadImage("sprites/stone.png");
  bg = loadImage("sprites/jungle.jpg");
}

function setup() {
  canvas = createCanvas(1600, 400);
  monkey = createSprite(200, 300, 30, 30);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.2;

  ground = createSprite(800, 405, 1600, 10);

  ObstaclesGroup = createGroup();

  score = 0;
}

function draw() {
  background(bg);

  if (keyDown("space") && monkey.y >= 320) {
    monkey.velocityY = -15;
  }

  ground.visible = false;

  monkey.velocityY = monkey.velocityY + 0.5;

  spawnObstacles();

  monkey.collide(ground);
  ObstaclesGroup.collide(ground);

  if (monkey.collide(ObstaclesGroup)) {
    ObstaclesGroup.destroyEach();
    monkey.y = 300;
    monkey.velocityX = 0;
    score = 0;
  }

  if (frameCount % 20 === 0) {
    score += 1;
  }
  text("Score: " + score, 100, 100);

  drawSprites();
}

function spawnObstacles() {
  if (World.frameCount % 120 === 0) {
    var obstacle = createSprite(1500, 400, 10, 40);

    obstacle.velocityX = -10;

    obstacle.addImage(stoneImg);

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.2;
    obstacle.lifetime = 160;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
