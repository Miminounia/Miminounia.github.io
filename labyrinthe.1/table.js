

function createTable(cols, rows)
{
  this.create = function (cols, rows) {
    var div = document.getElementById("table");
    this.table = document.createElement("table");  
    this.table.className = "board";
    div.appendChild(this.table);
    for (var row = 0; row < rows; row++) {
      var r = document.createElement("tr");  
      this.table.appendChild(r);
      for (var col = 0; col < cols; col++) {
        var c = document.createElement("td");  
        c.className = "square";
        r.appendChild(c);
      }
    }
  }

  this.getCell = function (col, row) {
    var row = this.table.rows[row];
    var cell = row.cells[col];
    return cell;
  }

  this.setColor = function(col, row, color) {
    var cell = getCell(col, row);
    cell.style.backgroundColor = color;
  }
  
  this.setBorderColor = function(col, row, color) {
    var cell = getCell(col, row);
    cell.style.borderColor = color;
  }
  
  this.setImage = function(col, row, name) {
    var cell = getCell(col, row);
    cell.className = "square " + name;
  }
  
  this.removeImage = function(col, row)
  {
    var cell = getCell(col, row);
    cell.className = "square";
  }

  this.create(cols, rows);
}


function showText(str)
{
  var div = document.getElementById("text");
  div.innerHTML = str;
}

