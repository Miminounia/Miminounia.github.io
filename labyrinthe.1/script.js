// Code goes here


var fantx = 6;
var fanty = 7;
var fantdir = 1;

var posx = 0;
var posy = 0;

var width = 10;
var height = 10;

var targetx = 9
var targety = 9


var mines = [[5, 4]];

var bonbon = [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
              [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 0, 0, 0, 1, 0]];
              
var mines2 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
              [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
              [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
              [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]];
              
              

var timerStart = Date.now();

function isMine2(x, y)
{
  if (mines2[y][x] == 1)
      return true;
  else
    return false;
}


function isbonbon(x, y)
{
  if (bonbon[y][x] == 1)
      return true;
  else
    return false;
}


createTable(width, height);
setImage(5, 8, "image1");
setImage(fantx, fanty, "image2")

for (var y = 0; y < height; y++) {
  for (var x = 0; x < width; x++) {
    if (mines2[y][x] == 1)
      setColor(x, y, "blue");
  }
} 


for (var y = 0; y < height; y++) {
  for (var x = 0; x < width; x++) {
    if (bonbon[y][x] == 1)
      setImage(x, y, "image1");
  }
} 

//setBorderColor(2, 2, "green");
setColor(targetx, targety, "red")
setImage(posx, posy, "image2");


function moveDown()
{
  removeImage(posx, posy);
  posy = posy + 1;
  if (posy >= height)
    posy = height - 1;
  setImage(posx, posy, "image2");
}


function moveLeft()
{
  removeImage(posx, posy);
  posx = posx - 1;
  if (posx < 0)
    posx = 0;
  setImage(posx, posy, "image2");
}


function moveRight()
{
  removeImage(posx, posy);
  posx = posx + 1;
  if (posx >= width)
    posx = width - 1;
  setImage(posx, posy, "image2");
}


function moveUp()
{
  removeImage(posx, posy);
  posy = posy - 1;
  if (posy < 0)
    posy = 0;
  setImage(posx, posy, "image2");
}

var nB = 0;



document.onkeypress = function(event)
{
  var key = event.keyCode;
  if (key == 40)
    moveDown();
  if (key == 39)
    moveRight();
  if (key == 37)
    moveLeft();
  if (key == 38)
    moveUp();
  var arrived = (posx == targetx) && (posy == targety);
  if (arrived) { 
      var seconds = (Date.now() - timerStart) / 1000.0;
      document.write("Gagné : ton score : " + seconds + " secondes  ; tu as récupéré " + nB + "/10 bonbons.");
  }
  if (isMine2(posx, posy)){
    document.write("Perdu");
  }
  
  var lose = (posx == fantx) && (posy == fanty)
  if (lose){
    document.write ("Perdu")
  }

  if (isbonbon(posx, posy)){
    nB++;
    bonbon[posy][posx] = 0;
  }

  
}     


function myTimer()
{
  var seconds = (Date.now() - timerStart) / 1000.0;
  showText("Tu joues depuis " + seconds + " secondes. Nombre de bonbons : " + nB + "/10");
  removeFantom();
  var lose = (posx == fantx) && (posy == fanty)
  if (lose){
    document.write ("Perdu")
  }
}


function removeFantom()
{
  removeImage(fantx, fanty);
  fantx = fantx + fantdir;
  if (fantx == width) {
    fantx = width - 2;
    fantdir = -1;
  }
  if (fantx < 6) {
    fantx = 7;
    fantdir = 1;
  }
  setImage(fantx, fanty, "image2")
}

setInterval(myTimer, 1000);





    
