

// Thanks to Scott Andrew LePera
// (http://www.scottandrew.com/weblog/articles/cbs-events) and
// Christian Heilmann
// (http://onlinetools.org/articles/unobtrusivejavascript/chapter4.html)
// for the setEventHandler() and removeEventHandler() functions.
function setEventHandler(obj, evType, fn)
{ 
        if (obj.addEventListener){ 
                obj.addEventListener(evType, fn, false); 
                return true; 

        } else if (obj.attachEvent){ 
                var r = obj.attachEvent("on"+evType, fn); 
                return r; 

        } else { 
                return false; 
        } 
}

function onclick(e, handler)
{
  e.onclick = function() { return false; }
  e.onmousedown = function() { return false; }
  setEventHandler(e, "click", handler);
}

function CellClickHandler(board, col, row)
{
  this.handler = function (e) {
    board.handleClick(col, row);        
  }
}

function Board(cols, rows)
{
  this.create = function (cols, rows) {
    var div = document.getElementById("board");
    this.table = document.createElement("table");  
    this.table.className = "board";
    div.appendChild(this.table);
    for (var row = 0; row < rows; row++) {
      var r = document.createElement("tr");  
      this.table.appendChild(r);
      for (var col = 0; col < cols; col++) {
        var c = document.createElement("td");
        c.className = "square";
        onclick(c, new CellClickHandler(this, col, row).handler);
        r.appendChild(c);
      }
    }
  }

  this.handleClick = function (col, row) {
    if (this.onClickCallback) {
      this.onClickCallback(col, row);
    }
  }

  this.onClick = function (callback) {
    this.onClickCallback = callback;
  }

  this.getCell = function (col, row) {
    var r = this.table.rows[row];
    var cell = r.cells[col];
    return cell;
  }

  this.setColor = function(col, row, color) {
    var cell = this.getCell(col, row);
    cell.style.backgroundColor = color;
  }
  
  this.setBorderColor = function(col, row, color) {
    var cell = this.getCell(col, row);
    cell.style.borderColor = color;
  }
  
  this.setImage = function(col, row, name) {
    var cell = this.getCell(col, row);
    cell.className = "square " + name;
  }
  
  this.removeImage = function(col, row) {
    var cell = this.getCell(col, row);
    cell.className = "square";
  }

  this.create(cols, rows);
}


function showScore(str)
{
  var div = document.getElementById("score");
  div.innerHTML = str;
}

function showPlayer(num)
{
  var div = document.getElementById("player");
  div.innerHTML = "Player " + num + "'s turn";
  div.className = "player player" + num;
}
