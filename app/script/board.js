$blankSpace = "<span class='spot'>&nbsp;</span>";
$apple = "<span class = 'spot'>o</span>"


var BoardMaker = function(nX, nY){

  this.board = [];
  
  for(var i = 0; i < nY; i++){
    this.board.push([]);
  }

  for(var j = 0; j < this.board.length; j++){
    for(var k = 0; k < nX; k++){
      this.board[j].push($blankSpace);
    }
  }
};

BoardMaker.prototype.moveRight = function(){
  for(var i = 0; i < this.board[0].length; i++){

    if(this.board[0][i] === $apple && i < this.board[0].length-1){
      this.board[0][i] = $blankSpace;
      this.board[0][i+1] = $apple;
      break;
    }
  }
  return;
}

BoardMaker.prototype.moveLeft = function(){
  for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === $apple && i !== 0){
      this.board[0][i] = $blankSpace;
      this.board[0][i-1] = $apple;
      break;
    }
  }
  return;
}