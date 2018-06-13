// Code goes here




var width = 10;
var height = 10;
var board = new Board(width, height);

var cells = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
              
var currentPlayer = 1;
var lastClick = Date.now();             

function handleClick(col, row)
{
  // Avoid double clicks
  var t = Date.now();
  if (t - lastClick < 1000) {
    lastClick = t;
    return;
  }
  var test = cells [col][row] != 0;
  
  if (test) {
    return;
  }
  var nextPlayer = 0;  
  if (currentPlayer == 1) {
      board.setImage(col, row, "image1");
      cells[col][row] = 1;
      nextPlayer = 2;
  } else if (currentPlayer == 2) {
      board.setImage(col, row, "image2");
      cells[col][row] = 2;
      nextPlayer = 1;
  }
  var n = flipKnights(currentPlayer, nextPlayer);
  while (n !== 0)
    n = flipKnights(currentPlayer, nextPlayer);
  n = flipKnights(nextPlayer, currentPlayer);
  while (n !== 0)
    n = flipKnights(nextPlayer, currentPlayer);
    
  currentPlayer = nextPlayer;
  showPlayer(currentPlayer); 
  showStats();
  lastClick = t;
}

function numberOfKnights(col, row, player)
{
  var number = 0;
  var test1 = (row > 0) && (cells[col][row - 1] == player);
  var test2 = (row < width - 1)  && (cells[col][row + 1] == player);
  var test3 = (col < height -1) && (cells[col + 1][row] == player);
  var test4 = (col > 0) && (cells[col - 1][row] == player);
  if (test1){
    number++;
  }
  if (test2){
    number++;
  }
  if (test3){
    number++;
  }
  if (test4){
    number++;
  }
  return number;
}

function flipKnights(player, otherPlayer)
{
  var m = 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) { 
      var number = numberOfKnights(x, y, player);
      if (number >= 3 && cells[x][y] == otherPlayer) {
        cells[x][y] = player;
        board.setImage(x, y, "image" + player);
        m++;
      }
    }
  }
  return m;
}

function showStats()
{
  var nwhite = 0;
  var nplayer1 = 0;
  var nplayer2 = 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) { 
      if (cells[x][y] == 0) {
        nwhite++;
      } else if (cells[x][y] == 1) {
        nplayer1++;
      } else if (cells[x][y] == 2) {
        nplayer2++;
      }
    }
  }
  showScore("Player 1: " + nplayer1 + " - Player 2: " + nplayer2);
}


board.onClick(handleClick);

showPlayer(currentPlayer); 
    
