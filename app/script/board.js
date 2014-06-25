var BoardMaker = function(nX, nY){

  this.board = [];
  
  for(var i = 0; i < nY; i++){
    this.board.push([]);
  }

  for(var j = 0; j < this.board.length; j++){
    for(var k = 0; k < nX; k++){
      this.board[j].push('x');
    }
  }
};

BoardMaker.prototype.moveRight = function(){
  for(var i = 0; i < this.board[0].length; i++){

    if(this.board[0][i] === 'o' && i < this.board[0].length-1){
      this.board[0][i] = 'x';
      this.board[0][i+1] = 'o';
      break;
    }
    if(this.board[0][i] === 'p' && i < this.board[0].length-1){
      this.board[0][i] = 'x';
      this.board[0][i+1] = 'p';
      break;
    }
  }
  return;
}

BoardMaker.prototype.moveLeft = function(){
  for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === 'o' && i !== 0){
      this.board[0][i] = 'x';
      this.board[0][i-1] = 'o';
      break;
    }
    if(this.board[0][i] === 'p' && i !== 0){
      this.board[0][i] = 'x';
      this.board[0][i-1] = 'p';
      break;
    }
  }
  return;
}

BoardMaker.prototype.deploy = function(){
 for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === 'o'){
      this.board[0][i] = 'p';
      $deploy();
      break;
    }
  }
  return true; 
}