$(function(){

$('body').on('keydown', function(e){
  if(e.keyCode === 80){
    $('.fallingOrange').text('/=\\');
    $('.fallingOrange').css('margin-left','-15px');
  }
})

$('body').on('keydown', function(e){
  if(e.keyCode === 79){
    $('.fallingOrange').text('O');
    $('.fallingOrange').css('margin-left','0');
  }
})

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
