$(function(){

$('body').on('keydown', function(e){
  if(e.keyCode === 39){ // right arrow
    $board.moveRight();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 37){ // left arrow
    $board.moveLeft();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 32){ // space bar
    $board.deploy();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 81){ // q
    clearInterval($advancer);
    clearInterval($generator);

  }
})

});
