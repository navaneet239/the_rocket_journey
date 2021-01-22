var SET = 0,
  PLAY = 1,
  END = 2;
var gameState = SET;

var bk, bkk;

var astro, astrobk;

var stone, stonebk, stoneGroup;

var score = 0;

var holdbar, holdbarbk;

function preload() {

  bkk = loadImage("space floatbk.jpg")

  astrobk = loadImage("astronaut.png");

  stonebk = loadImage("astroid.png");

  holdbarbk = loadImage("rocket.png")



}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  bk = createSprite(200, 200, 400, 400);
  bk.addImage(bkk);
  bk.scale = 3;
  //bk.velocityX = -5;

  astro = createSprite(120, bk.y/2 + 130, 50, 50);
  astro.addImage(astrobk);
  astro.scale = 0.30;
  // astro.setCollider("rectangle", 0, 0, 150, 150, 0)
  //astro.debug = true

  stoneGroup = createGroup();
 
  holdbar = createSprite(150, 300, 400, 200);
  holdbar.addImage(holdbarbk);
  holdbar.setCollider("rectangle", 0, 0, 200, 50, 0)
  //holdbar.debug = true;



}

function draw() {

  drawSprites();


  
  text("Score: " + score, width/2 - 30, 30, fill("white"),textSize(20));

  astro.collide(holdbar)

  if (gameState === SET) {
    bk.velocityX = 0;

    text("Press space to start.", width/2 - 100, bk.y/2 + 100, fill("white"),textSize(25))
    
    if (keyWentDown("SPACE")) {
      gameState = PLAY;
      
    }


  }

  if (gameState === PLAY) {
    
    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if (keyDown("SPACE") && astro.y >= 120) {
      astro.velocityY = -13;
    }

    astro.velocityY = astro.velocityY + 0.8
    
    astroid();

    if(stoneGroup.isTouching(astro)){
      gameState = END;
      astro.velocityY = 0;
    }

  }

  if (gameState === END){
    bk.velocityX = 0;
    
    stoneGroup.setVelocityXEach(0);
    stoneGroup.destroyEach();
    
    stoneGroup.setLifetimeEach(-1);

    
    text("Press Space to restart",width/2 - 150,200, textSize(30));
    
    if (keyWentDown("SPACE")){
      replay();
    }
  }
  
}

function astroid() {

  if (frameCount % 80 === 0) {
    stone = createSprite(width, 200, 20, 20);
    stone.addImage(stonebk);
    stone.scale = 0.5;
    stone.velocityX = -(8 + 3 * score / 100);
    
    stone.setCollider("rectangle",0,0,90,90,0);
      //stone.debug = true;
    
    stone.lifetime = width/-(8 + 3 * score / 100);
    
    stoneGroup.add(stone);
    

  }
}



function replay (){
  
  gameState = PLAY;
  
  score = 0;

  packItem = 0;
  
  astro.y = bk.y/2 + 100;

  
}
