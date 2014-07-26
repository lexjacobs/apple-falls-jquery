var keyRight = function(){
  $sideCollisionDetectRight($board.board);
  $board.moveRight();
  $render();          
};

var keyLeft = function(){
  $sideCollisionDetectLeft($board.board);
  $board.moveLeft();
  $render();
};

$(function(){

  // sets initial state so that user must initiate game with 's' or click
  $startOfGame();

  $('body').on('keydown', function(e){
    if($gameOn){
      if(e.keyCode === 39){ // right arrow
        keyRight();
      }

      if(e.keyCode === 37){ // left arrow
        keyLeft();
      }

      if(e.keyCode === 32){ // space bar
        $deploy($board);
      }

      if(e.keyCode === 81){ // q
        clearInterval($advancer);
        clearInterval($generator);
        $gameOn = false;
      }
    }
    if(!$gameOn){
      if(e.keyCode === 83){ // s
        $init();
      }
    }
  });

  $('.buttonL').on('click', function(){
    if($gameOn){
      keyLeft();
    }
  });

  $('.buttonR').on('click', function(){
    if($gameOn){
      keyRight();
    }
  });

  $('.parachuteButton').on('click', function(){
    if($gameOn){
      $deploy($board);
    }
  });
  
});