var boardMaker = function(nX, nY){

  this.board = [];
  
  for(var i = 0; i < nY; i++){
    this.board.push([]);
  }

  for(var j = 0; j < this.board.length; j++){
    for(var k = 0; k < nX; k++){
      this.board[j].push('x');
    }
  }

this.moveRight = function(){
  for(var i = 0; i < this.board[0].length; i++){

    if(this.board[0][i] === 'o' && i < this.board[0].length-1){
      this.board[0][i] = 'x';
      this.board[0][i+1] = 'o';
      break;
    }
  }
  return;
}

this.moveLeft = function(){
  for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === 'o' && i !== 0){
      this.board[0][i] = 'x';
      this.board[0][i-1] = 'o';
      break;
    }
  }
  return;
}

};

