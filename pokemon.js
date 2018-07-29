function loadImages(){
    pokemonImage =new Image();
    enemyImage =new Image();
    goalImage =new Image();
    pokemonImage.src ='images/pika1.png';
    enemyImage.src ='images/enemy.gif';
    goalImage.src ='images/PokeBall.png';
}


function init(){
    SCORE=0;
    HEALTH=100;
canvas =document.getElementById('mycanvas');
pen = canvas.getContext('2d');

 WIDTH = canvas.width;
 HEIGHT = canvas.height;

//pen.fillStyle="#fcf";
//pen.fillRect(100,100,150,150);       //(x,y,width,height)

    pokemon = {
        x:0,
        y:HEIGHT/2,
        w:50,
        h:50,
        speed:8,
        moving:false
    };
    goal = {
        x:WIDTH-50,
        y:HEIGHT/2,
        w:50,
        h:50
    };
    enemies =[ 
    {
    x:200,
    y:100,
    w:50,
    h:50,
    speed:5,
        color:"red"
  },
    {
    x:400,
    y:200,
    w:50,
    h:50,
    speed:10,
        color:"blue"
  },
    {
    x:500,
    y:400,
    w:50,
    h:50,
    speed:8,
        color:"green"
  }];
    
    document.addEventListener('keydown',function(e){
    if(e.key == "ArrowRight"){
        pokemon.x += pokemon.speed;
    }
    if(e.key == "ArrowLeft"){
        pokemon.x -= pokemon.speed;
    }
    if(e.key == "ArrowUp"){
        pokemon.y -= pokemon.speed;
    }
    if(e.key == "ArrowDown"){
        pokemon.y += pokemon.speed;
    }
        
        
    });
    document.addEventListener('mousedown',function(e){
      pokemon.moving= true;
    });
    document.addEventListener('mouseup',function(e){
      pokemon.moving= false;
    });
    
    }
function isColliding(box1,box2){
        
        x_axis = Math.abs(box1.x - box2.x) <=box1.w;
        y_axis = Math.abs(box1.y - box2.y) <=box1.w;
        return x_axis && y_axis;
        }


function draw(){
   //erase the old screen
    pen.clearRect(0,0,WIDTH,HEIGHT);
    
    pen.drawImage(pokemonImage, pokemon.x,pokemon.y,pokemon.w,pokemon.h);
    pen.drawImage(goalImage, goal.x,goal.y,goal.w,goal.h);
    
    for(var i=0;i<enemies.length;i++){
        //pen.fillStyle = enemies[i].color;
        pen.drawImage(enemyImage ,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h);
    }
    
}

function update(){
    SCORE = (pokemon.x-0) + Math.abs(pokemon.y-HEIGHT/2);
    for(var i=0;i<enemies.length;i++){
    enemies[i].y += enemies[i].speed;
    if(enemies[i].y >= (HEIGHT-enemies[i].h)|| enemies[i].y<=0)
        enemies[i].speed *= -1;
    }
    if(  isColliding(pokemon,goal) ){
        alert("YOU WON");
        startGame();
    }
    enemies.forEach(function(enemy){
        if(isColliding(enemy, pokemon)){
              HEALTH = HEALTH-.5;
        //    alert("GAME OVER");
        //    GAME_OVER = true;
        }
    })
    document.getElementById("mydiv").innerHTML="<b>Health : "+HEALTH+"%</b>";
    document.getElementById("mydiv2").innerHTML="<b>High Score : "+SCORE+"</b>";
    
    
    if(HEALTH >= 0)
        GAME_OVER=false;
    else{
        GAME_OVER= true;
       if(localStorage.getItem('hs') <= SCORE){
        localStorage.setItem('hs',SCORE);
       }
       
       
        alert("Game Over!!\nYour score is : "+SCORE+"\nHIGHEST SCORE is : "+ localStorage.getItem('hs') );
    }
    
}

function render(){
    GAME_OVER=false;
    draw();
    update();
    console.log("In Render");
    if(GAME_OVER==false){
           window.requestAnimationFrame(render);
    }
    else{
        startGame();
    }
}
loadImages();
function startGame(){
init();
render();
}
startGame();