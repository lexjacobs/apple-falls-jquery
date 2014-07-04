($init = function(){

  $gameOn = true;
  $parachuteCount = 3;
  $lifeCount = 3;
  $scoreCount = 0;
  $bonusChuteMultiple = 5000;

  $board = new BoardMaker(5,8);

  // place apple
  $board.board[0][Math.floor($board.board[0].length/2)] = 'o';

  $(function(){

    $render = function(){

      // clear board at beginning of interval
      $('.board').text('');

      // iterate through board and cache each item found in arrays
      var freshBoard = '';

      for (var i = 0; i < $board.board.length; i++) {
        freshBoard += '<span>';
        
        for (var j = 0; j < $board.board[i].length; j++) {
          if($board.board[i][j] === 'o'){
            freshBoard += '<span class = "apple">o</span>';
          }
          if($board.board[i][j] === 'p'){
            freshBoard += '<span class = "parachute">p</span>';
          }
          if($board.board[i][j] === 'x'){
            freshBoard += '<span class = "spot">|</span>';
          }
          if($board.board[i][j] === 'b'){
            freshBoard += '<span class = "brick">+</span>';
          }
          if($board.board[i][j] === 'e'){
            freshBoard += '<span class = "bonusParachute">p</span>';
          }
        }
        freshBoard += '</span><br>';
      }

      // append cached board element to DOM
      $('.board').html(freshBoard);

      $('.parachutes').text($parachuteCount);
      $('.lives').text($lifeCount);
      $('.score').text($scoreCount);
    };

    // initial rendering
    $render();        

  // end of document ready loop
  });

  $deploy = function(board){
    board.deploy();
  };

  $bonusChuteAdder = function(){
    $parachuteCount++;
  };

  $endOfGame = function(){
    clearInterval($advancer);
    clearInterval($generator); 
    $('.status').html('GAME OVER!<br>To restart:<br>Press "s"!');
    $gameOn = false;
  };

  // set up gravity simulation
  $timeDecreaser = {
    cache: [750,700,680,650,600,550,500,450,400,350,300,275,250,200,200,200,150],
    // cache: [700,700,680,650],
    current: -1,
    span: function(){
      if(this.current < this.cache.length-1){
        this.current++;
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
      $obstacleGen($board.board);
      $advanceIt();
    }, $timeDecreaser.span());

  };

  $advanceIt();

  // set interval of obstacle generation
  $generator = setInterval(function(){
    $obstacleGen($board.board);
    $render();
  }, 300);

  $('.status').text('');
})();
