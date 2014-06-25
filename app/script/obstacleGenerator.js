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
  if($collisionDetect(board)){
    console.log('bonk!');
  };
  for (var i = 1; i < board.length-1; i++) {
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = board[i+1][j];
      board[i+1][j] = 'x';
    }
  }
  $render();
};

// set interval of obstacle generation once per second
$interval(function(){
  $obstacleGen($board.board);
  $render();
}, 1000);

// detects non-empty squares below apple before advancing row
$collisionDetect = function(board) {
  for(var i = 0; i < board[0].length; i++ ){
    if(board[0][i] === 'o'){
      if(board[1][i] !== 'x'){
        // console.log('collision detected!');
        return true;
      }
    }
  }
  return false;
}