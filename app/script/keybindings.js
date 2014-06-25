$(function(){

$('body').on('keydown', function(e){
  if(e.keyCode === 39){ // right arrow
    $sideCollisionDetect($board.board);
    $board.moveRight();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 37){ // left arrow
    $sideCollisionDetect($board.board);
    $board.moveLeft();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 32){ // space bar
    $deploy();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 81){ // q
    clearInterval($advancer);
    clearInterval($generator);

  }
})

});
