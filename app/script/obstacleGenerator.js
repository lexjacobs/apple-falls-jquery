// generates bricks
$obstacleGen = function(){

  var randomNumber = Math.random();

  // generates obstacles in the first row
  if(randomNumber < 0.5){
    var rows = $board.board.length;
    var cols = $board.board[0].length;
    var positionOfObstacle = Math.floor(Math.random()*cols);
    $board.board[rows-1][positionOfObstacle] = 'b';
  }
};

// advances obstacles
$obstacleAdvance = function(){
  $collsionDetect();
  for (var i = 1; i < $board.board.length-1; i++) {
    for (var j = 0; j < $board.board[i].length; j++) {
      $board.board[i][j] = $board.board[i+1][j];
      $board.board[i+1][j] = 'x';
    }
  }
  $render();
};

// set interval of obstacle generation once per second
$interval(function(){
  $obstacleGen();
  $render();
}, 1000);

// detects non-empty squares below apple before advancing row
$collsionDetect = function() {
  for(var i = 0; i < $board.board[0].length; i++ ){
    if($board.board[0][i] === 'o'){
      if($board.board[1][i] !== 'x'){
        console.log('collision detected!');
      }
    }
  }
}