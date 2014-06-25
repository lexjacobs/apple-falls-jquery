var BoardMaker = function(nX, nY){

  this.board = [];
  
  for(var i = 0; i < nY; i++){
    this.board.push([]);
  }

  for(var j = 0; j < this.board.length; j++){
    for(var k = 0; k < nX; k++){
      this.board[j].push("<span class='spot'>&nbsp;</span>");
    }
  }
};

BoardMaker.prototype.moveRight = function(){
  for(var i = 0; i < this.board[0].length; i++){

    if(this.board[0][i] === '<span class = "spot">o</span>' && i < this.board[0].length-1){
      this.board[0][i] = "<span class='spot'>&nbsp;</span>";
      this.board[0][i+1] = '<span class = "spot">o</span>';
      break;
    }
  }
  return;
}

BoardMaker.prototype.moveLeft = function(){
  for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === '<span class = "spot">o</span>' && i !== 0){
      this.board[0][i] = "<span class='spot'>&nbsp;</span>";
      this.board[0][i-1] = '<span class = "spot">o</span>';
      break;
    }
  }
  return;
}