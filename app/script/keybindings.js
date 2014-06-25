$(function(){

$('body').on('keydown', function(e){
  if(e.keyCode === 39){
    $board.moveRight();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 37){
    $board.moveLeft();
    $render();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 32){
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 81){ // q
    clearInterval($advancer);
    clearInterval($generator);

  }
})

});
