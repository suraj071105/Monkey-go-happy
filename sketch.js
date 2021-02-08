//All variables
  var jungle,jungleImg;
  var monkeyImg1,monkeyImg2,monkeyImg3,monkeyImg4,monkeyImg5,monkeyImg6,monkeyImg7,monkeyImg8,monkeyImg9,monkeyImg10
  var obstaclesGroup,stoneImg;
  var foodGroup,foodImg;
  var fakeJungle
  var score = 0;

  var gameState=2;
  var out=0;
  var play=2;
  var jump=3;
  var once=0;
  var bounce=0

function preload(){
  //Loading Images
    monkeyImg1=loadImage("Monkey_01.png");
    monkeyImg2=loadImage("Monkey_02.png");
    monkeyImg3=loadImage("Monkey_03.png");
    monkeyImg4=loadImage("Monkey_04.png");
    monkeyImg5=loadImage("Monkey_05.png");
    monkeyImg6=loadImage("Monkey_06.png");
    monkeyImg7=loadImage("Monkey_07.png");
    monkeyImg8=loadImage("Monkey_08.png");
    monkeyImg9=loadImage("Monkey_09.png");
    monkeyImg10=loadImage("Monkey_10.png");

    jungleImg=loadImage("jungle.jpg");

    foodImg=loadImage("banana.png");

    stoneImg=loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  //Background
    jungle=createSprite(200,200,200,200);
    jungle.addImage("jungle",jungleImg);
    jungle.scale=0.6;

    fakeJungle=createSprite(600,200,400,400);
    fakeJungle.addImage("jungle",jungleImg);
    fakeJungle.scale=0.6;

  //Monkey
    monkey = createSprite(40,300,80,80)
    monkey.addAnimation("monkeyMoving",monkeyImg1,monkeyImg2, monkeyImg3,monkeyImg4,monkeyImg5,monkeyImg6,monkeyImg7,monkeyImg8,monkeyImg9,monkeyImg10);
   monkey.scale=0.08;
  // monkey.debug=true
  monkey.setCollider("circle",0,0);
  
  //Groups
    foodGroup=createGroup();
    obstaclesGroup=createGroup();
}
function draw() {
  background(220);
  
  
  if (gameState===play||gameState===jump){
      //Background in motion
    jungle.velocityX=-2;
    fakeJungle.velocityX=-2;

    if(jungle.x<-200){
      jungle.x=600;
    }
     if(fakeJungle.x<-200){
      fakeJungle.x=600;
    }
  
  

  
  //Motion of monkey
    if (keyDown("space")&&gameState===play){
      monkey.velocityY=-2;
      gameState=jump;
    }
    if (monkey.y<250){
      monkey.velocityY+=0.2;
    }
    if (monkey.y>=300){
      monkey.y=300;
      gameState=play;
    
    }
      
    //Appearance of food
    if (frameCount%200===0 || frameCount===0){
      food();
      obstacle();
    }
    
    if (foodGroup.isTouching(monkey)){
    score+=2
    foodGroup.destroyEach()
  }
    if (obstaclesGroup.isTouching(monkey)){
        monkey.scale=0.08;
        once+=1;
        
        
    }
     if (once===45){
      gameState=out;
  }
    console.log(once);
    
  
    switch (score){
      case 10: monkey.scale=0.10;
        break;
      case 20: monkey.scale=0.12;
        break;
      case 30: monkey.scale=0.14;
        break;
      case 40: monkey.scale=0.16;
        break;     
    
      default:break;
  }    
    }
  
  if (gameState===out){
    
    jungle.velocityX=0;
    fakeJungle.velocityX=0;
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    monkey.velocity=(0,0);
    
  }

    
   
  drawSprites();
  if (gameState===out){
  textSize(30)
    stroke("white");
    fill("red");
    text("OUT",150,100)}
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+score,200,200)
  
  
}

function food(){
  var food = createSprite(400,250,200,200);
  food.addImage("food",foodImg);
  food.scale=0.03;
  food.velocityX=-2;
  foodGroup.add(food);
  food.lifetime=400/2+3;
}
function obstacle(){
  var obstacle = createSprite(400,320,200,200);
  obstacle.addImage("food",stoneImg);
  obstacle.scale=0.1;
  obstacle.velocityX=-2;
  obstaclesGroup.add(obstacle);
  //obstacle.debug=true;
  obstacle.setCollider("circle",50,50);
  obstacle.lifetime=400/2+10
}
function reset(){
  gameState=play;
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach(); monkey.changeAnimation("monkeyMoving",monkeyImg1,monkeyImg2,monkeyImg3,monkeyImg4,monkeyImg5,monkeyImg6,monkeyImg7,monkeyImg8,monkeyImg9,monkeyImg10);
  jungle.velocityX=-2;
  fakeJungle.velocityX=-2;
  once=0;
  
}