//Create variables here
var dog;
var happyDog;
var database;
var foodS,foodStock;


function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  dogHappy=loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();

  dog=createSprite(250,250,5,5);
  dog.addImage(dogImg);
  dog.scale=0.1;

  
  foodStock=database.ref('Food');
   foodStock.on("value",readStock,showError);
   
  
}


function draw() {


background(46,139,87);

 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
 }
 
 drawSprites();


  //add styles here
  stroke(0);
  textSize(20);
  fill("red");
  text("Note: press UP_ARROW to feed drago Milk!",100, 450);
  
stroke(255);
textSize(25);
fill("blue");
text("food:"+foodS,30,50);
  

}

//function to read values from DB
function readStock(data){
   foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
function showError(){
  console.log(Error);
}



