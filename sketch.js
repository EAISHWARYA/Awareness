var sanitizerimg,coughingimg,socimg,maskimg,donttouchimg,handwashsound;
var sanitizer,mask,coughing,donttouch,socialdistancing;
var gameState=0;
var nextbutton,nextbutton2;  


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1

var score=0;
var obstacleimg
var gameOver, restart;
function preload(){
  sanitizerimg=loadImage("Sanitizer.png")
  coughingimg=loadImage("coughing.png")
  socimg=loadImage("Social Distancing.jpg")
  maskimg=loadImage("mask.png")
  donttouchimg=loadImage("dont touch.png")
  handwashsound=loadSound("handwash.mp3")
  trex_running =   loadAnimation("running boy.png");
  trex_collided = loadAnimation("dead boy.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  
  obstacleimg=loadImage("virus.png");
}



function setup() {
  createCanvas(1200,750);
 
sanitizer=createSprite(100,150, 50, 50);
sanitizer.addImage("s",sanitizerimg)
sanitizer.scale=0.3
sanitizer.visible=false
mask=createSprite(550,500,50,50)
mask.addImage("hi",maskimg)
mask.scale=0.3  
mask.visible=false
socialdistancing=createSprite(300,360,50,50)
socialdistancing.addImage("no",socimg)
socialdistancing.scale=0.3
socialdistancing.visible=false
donttouch=createSprite(100,600)
donttouch.addImage("yess",donttouchimg)
donttouch.scale=0.3
donttouch.visible=false
coughing=createSprite(550,675)
coughing.addImage("noo",coughingimg)
coughing.scale=0.3
coughing.visible=false
nextbutton=createSprite(1100,730,50,30)
nextbutton.shapeColor="white"
nextbutton.visible=false
nextbutton2=createSprite(600,375,130,100)
nextbutton2.shapeColor="white"
nextbutton2.visible=false



trex = createSprite(100,730,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided", trex_collided);
trex.scale = 1.5;
trex.visible=false



ground = createSprite(600,730,1200,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);
ground.visible=false




gameOver = createSprite(600,375);
gameOver.addImage(gameOverImg);
gameOver.visible=false



restart = createSprite(600,400);
restart.addImage(restartImg);
restart.visible=false

gameOver.scale = 2.5;
restart.scale = 1.5;

gameOver.visible = false;
restart.visible = false;

invisibleGround = createSprite(600,740,1200,10);
invisibleGround.visible = false;


cloudsGroup = new Group();
obstaclesGroup = new Group();

score = 0;
}
function draw() {
  background("green");
  console.log(trex.y)

  drawSprites();
  
  if(gameState===0){
    text("Next",1090,730)
    nextbutton.visible=true
    sanitizer.visible=true
    mask.visible=true
    socialdistancing.visible=true
    donttouch.visible=true
    coughing.visible=true
    textSize(30)
  fill("white")
  text("Ways to prevent Covid-19",450,50)
  textSize(15)
  text("Maintain a safe distance from anyone who is coughing or sneezing.",200,275)
  text("Clean your hands often. Use soap and water, or an alcohol-based hand rub.",10,70)
  text("Wear a mask when physical distancing is not possible.",350,450)
  text("Don’t touch your eyes, nose or mouth.",10,550)
  text("Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.",350,600)
  
  }
  if((mousePressedOver(nextbutton )||  touches.length>0)){
    gameState=1;
    nextbutton.visible=false
    sanitizer.visible=false
    mask.visible=false
    socialdistancing.visible=false
    donttouch.visible=false
    coughing.visible=false
    touches = [];
  }
  
 
  if(gameState===1){
    textSize(40)
    fill("black")
  text("Wash your hands!",450,50)
  text("Play!",575,375)
  nextbutton2.visible=true
  
  if(frameCount/50===1){
    handwashsound.play()
  }

  }
  if(mousePressedOver(nextbutton2 )){
    gameState=2;
    nextbutton2.visible=false
    //handwashsound.stop()
  }
  if(gameState===2){
    spawnClouds();
    spawnObstacles();
    
    trex.visible=true
    ground.visible=true
   
  
  
 
    score = score + Math.round(getFrameRate()/60);
    
    text("Score: "+ score, 500,50);
    if(keyDown("space") && trex.y >= 600) {
      jumpSound.play();
      trex.velocityY = -18;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    
    if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
  
    if(obstaclesGroup.isTouching(trex)){
      dieSound.play();  
    
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    }
    
  }
  if(mousePressedOver(restart)) {
    reset();
  }
}
  

function reset(){
  score = score + Math.round(getFrameRate()/60);
    
  
  if(keyDown("space") && trex.y >= 600) {
    jumpSound.play();
    trex.velocityY = -18;
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  
  if (score>0 && score%100 === 0){
    checkPointSound.play();
  }
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(1200,random(200,600),40,10);
    cloud.y = Math.round(random(50,520));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(1200,710,10,40);
    obstacle.y=random(680,710)
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addImage("obstacle",obstacleimg)
    //generate random obstacles
    
    
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
