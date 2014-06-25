$(function(){

$('body').on('keydown', function(e){
  if(!$gameOn){
    return null;
  }
  if(e.keyCode === 39){ // right arrow
    $sideCollisionDetectRight($board.board);
    $board.moveRight();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(!$gameOn){
    return null;
  }
  if(e.keyCode === 37){ // left arrow
    $sideCollisionDetectLeft($board.board);
    $board.moveLeft();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(!$gameOn){
    return null;
  }
  if(e.keyCode === 32){ // space bar
    $deploy($board);
  }
})

$('body').on('keydown', function(e){
  if(!$gameOn){
    return null;
  }
  if(e.keyCode === 81){ // q
    clearInterval($advancer);
    clearInterval($generator);
    $gameOn = false;
  }
})

$('body').on('keydown', function(e){
  if($gameOn){
    return null;
  }
  if(e.keyCode === 83){ // s
    $init();
  }
})

});
