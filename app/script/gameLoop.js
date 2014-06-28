($init = function(){

  $gameOn = true;
  $parachuteCount = 3;
  $lifeCount = 3;
  $scoreCount = 0;

  $board = new BoardMaker(5,8);

  // place apple
  $board.board[0][Math.floor($board.board[0].length/2)] = 'o';

  $(function(){

    $render = function(){

      // clear board at beginning of interval
      $('.board').text('');

      // iterate through board and render each item found in arrays
      for (var i = 0; i < $board.board.length; i++) {
        $('.board').append('<span class = "row'+i+'"></span><br>')
        for (var j = 0; j < $board.board[i].length; j++) {
          if($board.board[i][j] === 'o'){
            $('.row'+i).append('<span class = "apple">o</span>');
          }
          if($board.board[i][j] === 'p'){
            $('.row'+i).append('<span class = "parachute">p</span>');
          }
          if($board.board[i][j] === 'x'){
            $('.row'+i).append('<span class = "spot">|</span>');
          }
          if($board.board[i][j] === 'b'){
            $('.row'+i).append('<span class = "brick">+</span>');
          }
        }
      }

      $('.parachutes').text($parachuteCount);
      $('.lives').text($lifeCount);
      $('.score').text($scoreCount);
    }

    // initial rendering
    $render();        

  // end of document ready loop
  });

  $deploy = function(board){
    board.deploy();
  }

  $endOfGame = function(){
    clearInterval($advancer);
    clearInterval($generator); 
    $('.status').html('GAME OVER!<br>Press "s" to restart!');
    $gameOn = false;
  }

  // set up gravity simulation
  $timeDecreaser = {
    cache: [700,700,680,650,600,550,500,450,400,450,300,275,250,200,200,200,150],
    // cache: [700,700,680,650],
    current: -1,
    span: function(){
      if(this.current < this.cache.length-1){
        this.current++
        return this.cache[this.current];
      } else {
        return this.cache[this.current];
      }
    }
  };

  // set interval of advancement

  $advanceIt = function(){

    if(!$gameOn){
      return null;
    }

    $advancer = setTimeout(function(){
      $obstacleAdvance($board.board);
      $advanceIt();
      $obstacleGen($board.board);
    }, $timeDecreaser.span());

  }

  $advanceIt()

  // set interval of obstacle generation
  $generator = setInterval(function(){
    $obstacleGen($board.board);
    $render();
  }, 300);

  $('.status').text('');
})();
