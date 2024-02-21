const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const background = document.createElement("img");
background.src = "Player/street.jpeg";

const heroImg = document.createElement("img");
heroImg.src = "Player/Player1.png";

const bulPist = document.createElement("img");
bulPist.src ="https://www.proarmis.si/product_images/l/sellier_bellot_300_win_magnum_spce_180grs_20pcs_2.jpg";

const audio = document.createElement("audio");
audio.src = "Audio/shot.mp3";

const dragImg = document.createElement("img");
dragImg.src = "Player/Player2.png";

  let data = {
       Person1: {
          xDelta:0,
          yDelta:0,
          x: 50,
          y: 290,
          width: 150,
          height: 250
        },
        bullets:[
            
        ],
        Person2:{
            xDelta:0,
            yDelta:0,
            x: canvas.width-250,
            y: 290,
            width: 150,
            height: 250
        }
    };
 
 function update() {
    data.Person1.x += data.Person1.xDelta;
    data.Person1.y += data.Person1.yDelta;
    data.bullets.forEach(function(bullet){
            bullet.x+=bullet.xDelta
    });
    data.Person2.x+=data.Person2.xDelta;
    data.bullets = data.bullets.filter(function(bullet){
         if(bullet.x>canvas.width ){
            return false;
         }
         return true;
    })

 }

function draw() {
  context.drawImage(background,0,0,canvas.width,canvas.height);
  context.drawImage(heroImg,data.Person1.x,data.Person1.y,data.Person1.width,data.Person1.height);
   context.drawImage(dragImg,data.Person2.x,data.Person2.y,data.Person2.width,data.Person2.height)
   data.bullets.forEach(function(bullet){
   context.drawImage(bulPist,bullet.x,bullet.y,bullet.width,bullet.height)
 });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}
loop();

document.addEventListener("keydown",function(evt){
    if(evt.code === "ArrowRight"){
        data.Person1.xDelta = 1;
    }else if(evt.code === "ArrowLeft"){
        data.Person1.xDelta = -1;
    }
});
document.addEventListener("keydown",function(evt){
    if(evt.code === "ArrowUp") {
        data.Person1.yDelta = -1;
    }else if(evt.code === "ArrowDown"){
            data.Person1.yDelta = 1;
    }else if(evt.code === "Space"){
            audio.currentTime = 0;
            audio.play();
            data.bullets.push({
            xDelta:0,
            x:data.Person1.x+data.Person1.width-5,
            y:data.Person1.y + data.Person1.height-220,
            width:15,
            height:5
    });
            data.bullets.forEach(function(bullet){
            bullet.xDelta = 5;
    });
    }
});
document.addEventListener("keyup",function(avt){
    data.Person1.xDelta = 0;
    data.Person1.yDelta = 0;
})