var canvas = document.getElementById("canvas")

var ctx = canvas.getContext("2d")

//ctx.fillStyle = "red"
//ctx.fillRect(0,0, 512, 512)

//variable
// var marioLink = "https://bit.ly/2v3FTX5"
// var imagen = new Image()
// imagen.src = marioLink
// imagen.onload = function(){
//   ctx.drawImage(imagen, 0, 0, 50, 50)
// }
// var x = 0
// var y = 0
// setInterval(function(){
//
//     ctx.clearRect(0,0,canvas.width, canvas.height)
//     ctx.drawImage(imagen, x, y, 50, 50)
//     //y = (25 -x^(2) )^(-2)
//     x++
//     if(x>512 || y > 512){x = 0; y = 0}
// },1000/60)

//variables
var frames = 0
var fondo = "https://bit.ly/2LA87TH"
var intervalo
var enemies = []
var frames = 0
//constructores
function Background(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.imagen = new Image()
    this.imagen.src = fondo
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)

    this.draw = function(){
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}

function Mario(){
  this.x = 0
  this.y = 512-50
  this.width = 50
  this.height = 50
  this.imagen = new Image()
  this.imagen.src = "https://bit.ly/2v3FTX5"
  this.imagen.onload = function(){
      this.draw()
  }.bind(this)

  this.draw = function(){
      ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
  }
  this.checkIfTouch = function(enemy){
    return (this.x < enemy.x + enemy.width) &&
            (this.x + this.width > enemy.x) &&
            (this.y < enemy.y + enemy.height) &&
            (this.y + this.height > enemy.y);
    }
}
function Enemy(x){
  this.x = x
  this.y = 0
  this.width = 50
  this.height = 50
  this.imagen = new Image()
  this.imagen.src = "https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_77b05ce5bdfb069e316ba875cb672888.png"
  this.imagen.onload = function(){
      this.draw()
  }.bind(this)

  this.draw = function(){
    this.y++
      ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
  }
}
//los objetos hechos a partir de una clase se llamas instancias
//instancias
var board = new Background()
var mario = new Mario()
//var enemy = new Enemy(20)
//instancias

//main functions
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width, canvas.height)
  board.draw()
  mario.draw()
  generarEnemigo()
  drawEnemies()
  checkCollition()
  //console.log("lala")
}

function start(){
  document.getElementById("start").style.display = "none";
  intervalo = setInterval(update, 1000/60)
}

function gameOver(){
  clearInterval(intervalo)
  ctx.font = "50px Avenir"
  ctx.fillStyle = "white"
  ctx.fillText("Game Over", 100,100 )
}

//aux functions
function generarEnemigo(){
  if(frames % 100 === 0){
    var x = Math.floor(Math.random()*512)
    enemies.push(new Enemy(x))
  }

}

function drawEnemies(){
  enemies.forEach(function(enemy){
    enemy.draw()
  })
}

function checkCollition(){
    enemies.forEach(function(enemy){
      if(mario.checkIfTouch(enemy)){
          gameOver()
      }
    })
}

//listeners
addEventListener('keydown', function(event){
  console.log(event.keyCode)
  if (event.keyCode === 37){
    if(mario.x <= 0){
      mario.x = 0
    }else{
      mario.x -= 64
    }

  }
  if (event.keyCode === 39){
    if(mario.x >= 448){
      mario.x = 448
    }else{
      mario.x += 64
    }

  }
})


