$(function(){

$('body').on('keydown', function(e){
  if(e.keyCode === 39){
    $board.moveRight();
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 37){
    $board.moveLeft();
  }
})

});
