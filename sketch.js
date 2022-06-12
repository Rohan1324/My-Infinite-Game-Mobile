var PLAY = 1;
var END=0;
var gameState = PLAY;
var rocket,rocketImg,rocket_collided
var backgroundImg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstaclesGroup,obstacleImg
var score=0;
var gameOverSound,checkpointSound,coinSound
var gameOverImg,restartImg,gameOver,restart
var coin,coinImg,coinsGroup
var coinsCollected = 0;


function preload(){



backgroundImg = loadImage("background.png");
rocketImg = loadAnimation("rocket.gif");
rocket_collided = loadAnimation("rocketCollided.gif");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
coinImg = loadImage("coin.png")
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
gameOverSound = loadSound("gameOver.mp3");
checkPointSound = loadSound("checkpoint.mp3");
coinSound = loadSound("coin.mp3");
}

function setup() {
    createCanvas(windowWidth,windowHeight)
 background = createSprite(width/3,height,width,5);
 background.addImage("background",backgroundImg);
 background.y = height/2
 background.velocityY = +3;

 rocket = createSprite(width/2,height-140,30,40)
 rocket.addAnimation("rocket",rocketImg);
 rocket.addAnimation("collided",rocket_collided)
 rocket.scale=0.5

 gameOver = createSprite(650,200,200,80)
 gameOver.addImage(gameOverImg)

 restart = createSprite(650,500,20,20)
restart.addImage(restartImg)
restart.scale = 0.5
rocket.setCollider("rectangle",0,0,rocket.width,rocket.height);
rocket.debug = false;
 obstaclesGroup = new Group();
 coinsGroup = new Group();
 score = 0;
 coinsCollected = 0;
}

function draw() {

  drawSprites();
  textSize(20);
  fill("white");
  text("score: "+ score,10,30);
  textSize(20);
  fill("white");
  text("Coins: "+ coinsCollected,10,30);

  

  if (gameState===PLAY){
    gameOver.visible = false;
    restart.visible = false;
    rocket.x = World.mouseX;
    score = score + Math.round(getFrameRate()/60);
    background.velocityY = +(4 + 3* score/100)
    if (background.y>400){
      background.y = height/6
    }
    gameOver.visible = false;
    if(score>0 && score%200 === 0){
      checkPointSound.play() 
    }
    if(obstaclesGroup.isTouching(rocket)){
      gameOverSound.play()
      gameState = END;
    }

    if(coinsGroup.isTouching(rocket)){
      coinSound.play()
      coinsGroup.destroyEach()
      coinsCollected = coinsCollected +1

    }
    spawnObstacles()
    spawnCoins()

  

  }
  else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;

    rocket.changeAnimation("collided",rocket_collided)

    background.velocityY = 0;
    rocket.velocityY = 0;

    obstaclesGroup.setLifetimeEach(-1)
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.destroyEach()
    rocket.changeAnimation()
    coinsGroup.setVelocityEach(0)
    coinsGroup.destroyEach()
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  

 drawSprites();
 textSize(20);
 fill("white");
 text("score: "+ score,10,50);
 textSize(20)
 fill("white")
 text("coins: "+ coinsCollected,10,30)

 function reset(){

 gameState = PLAY;
 gameOver.visible = false;
 restart.visible = false;

 obstaclesGroup.destroyEach();
 rocket.changeAnimation("rocket",rocketImg)
 score = 0;
 coinsCollected = 0;
 }
 
 }

 function spawnCoins(){
 if (frameCount %150 === 0){
   var coin = createSprite(Math.round(random(10, 1000),40, 10, 10))
   coin.addImage(coinImg);
   coin.scale = 0.08
   coin.velocityY = 10
   coin.lifetime = 300
   coinsGroup.add(coin)
 }

 }

 function spawnObstacles(){
  if (frameCount % 40 === 0){
    var obstacle = createSprite(random(10,1000),random(10,100),70,60);
    obstacle.velocityY = +(6 + score/100);
    obstacle.setCollider('circle',0,0,30)
    obstacle.scale=0.4
 //obstacle.y=Math.round(random(100,300));


 var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2)
              break;
      case 3: obstacle.addImage(obstacle3)
              break;
      case 4: obstacle.addImage(obstacle4)
              break;
      case 5: obstacle.addImage(obstacle5)
              break;
      default: break;

 }
 obstacle.depth=rocket.depth;
 rocket.depth=rocket.depth+1
 obstaclesGroup.add(obstacle);
 obstaclesGroup.lifeTime = 300
}
    
  
}
 
