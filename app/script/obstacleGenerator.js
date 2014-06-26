// generates bricks
$obstacleGen = function(board){
  var randomNumber = Math.random();
  // generates obstacles in the first row
  if(randomNumber < 0.5){
    var rows = board.length;
    var cols = board[0].length;
    var positionOfObstacle = Math.floor(Math.random()*cols);
    board[rows-1][positionOfObstacle] = 'b';
  }
};

// advances obstacles
$obstacleAdvance = function(board){
  if(!$deployed && $collisionDetect(board)){
    $collisionHappened();
  };
  for (var i = 0; i < board.length-1; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if(board[i][j] !== 'o' && board[i][j] !== 'p'){
        board[i][j] = board[i+1][j];
        board[i+1][j] = 'x';
      }
    }
  }
  $render();
  $scoreCount += 10;
};

// detects non-empty squares below apple before advancing row
$collisionDetect = function(board) {
  for(var i = 0; i < board[0].length; i++ ){
    if(board[0][i] === 'o' || board[0][i] === 'p'){
      if(board[1][i] !== 'x'){
        return true;
      }
    }
  }
  return false;
}

$sideCollisionDetectRight = function(board) {
  for(var i = 0; i < board[0].length; i++ ){
    if(board[0][i] === 'o' || board[0][i] === 'p'){
      if(board[0][i+1] === 'b'){
        $collisionHappened();
        return true;
      }
    }
  }
  return false;
}

$sideCollisionDetectLeft = function(board) {
  for(var i = 0; i < board[0].length; i++ ){
    if(board[0][i] === 'o' || board[0][i] === 'p'){
      if(board[0][i-1] === 'b'){
        $collisionHappened();
        return true;
      }
    }
  }
  return false;
}

$collisionHappened = function(){
  $('.status').append('BONK!'+ '<br>')
    if($lifeCount === 0){
      $endOfGame();
    } else {
      $lifeCount--;
    }
};
