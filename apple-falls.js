var BoardMaker = function(nX, nY){

  this.board = [];
  
  for(var i = 0; i < nY; i++){
    this.board.push([]);
  }

  for(var j = 0; j < this.board.length; j++){
    for(var k = 0; k < nX; k++){
      this.board[j].push('x');
    }
  }
};

BoardMaker.prototype.moveRight = function(){
  for(var i = 0; i < this.board[0].length; i++){

    if(this.board[0][i] === 'o' && i < this.board[0].length-1){
      this.board[0][i] = 'x';
      this.board[0][i+1] = 'o';
      break;
    }
    if(this.board[0][i] === 'p' && i < this.board[0].length-1){
      this.board[0][i] = 'x';
      this.board[0][i+1] = 'p';
      break;
    }
  }
  return;
};

BoardMaker.prototype.moveLeft = function(){
  for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === 'o' && i !== 0){
      this.board[0][i] = 'x';
      this.board[0][i-1] = 'o';
      break;
    }
    if(this.board[0][i] === 'p' && i !== 0){
      this.board[0][i] = 'x';
      this.board[0][i-1] = 'p';
      break;
    }
  }
  return;
};

BoardMaker.prototype.deploy = function(){
  if($parachuteCount === 0){
    return false;
  }
 
  for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === 'o'){
      this.board[0][i] = 'p';

      var that = this;
      setTimeout(function(){
        that.undeploy();
      },3000);

      $parachuteCount--;
      $timeDecreaser.current = 1;
      break;
    }
  }
  return false; 
};

BoardMaker.prototype.undeploy = function(){
 for(var i = 0; i < this.board[0].length; i++){
    if(this.board[0][i] === 'p'){
      this.board[0][i] = 'o';
      break;
    }
  }
  return true; 
};
$firstRun = true;

($init = function(){

  $gameOn = true;
  $parachuteCount = 3;
  $lifeCount = 3;
  $scoreCount = 0;
  $bonusChuteMultiple = 5000;
  $postHighScore = function(){
    $('.highScore').text(localStorage['highScore']);
  }

  $board = new BoardMaker(5,8);

  // place apple
  $board.board[0][Math.floor($board.board[0].length/2)] = 'o';

  $(function(){

  $('.chuteMultiple').text($bonusChuteMultiple);
  if(localStorage['highScore']){
    $postHighScore();
  } else {
    $('.highScore').text('0');
  }

    $render = function(){

      // iterate through board and cache each item found in arrays
      var freshBoard = '';

      for (var i = 0; i < $board.board.length; i++) {
        freshBoard += '<span class = "boardRow">';
        
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

      // update dashboard with parachute/life/score count
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
    $gameOn = false;
    localStorage['date'] = new Date();
    localStorage['lastScore'] = $scoreCount;
    localStorage['highScore'] = localStorage['highScore'] || 0;
    if(localStorage['highScore'] < $scoreCount){
      localStorage['highScore'] = $scoreCount;
    }
    $postHighScore();

    if($firstRun){
      $('.instructions').prepend('GAME OVER!<br><br>');
      $firstRun = false;
    }
    $('.instructions').toggle(700);
  };

  $startOfGame = function(){
    clearInterval($advancer);
    clearInterval($generator); 
    $gameOn = false;
  };



  // set up gravity simulation
  $timeDecreaser = {
    cache: [750,700,680,650,600,550,500,450,400,350,300,275,250,200,200,200,150],
    // cache: [700,700,680,650],
    current: 4,
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
// http://www.gravitycalc.com/

var FallingObject = function(height, g){

  var height = height;

  var startTime = new Date();

  g = (g * 10);

  this.currentHeight = function(){

    // in seconds
    var timeElapsed = (new Date() - startTime) / 1000;

    var fallen = g * Math.pow(timeElapsed, 2) / 2;

    return height - fallen;
  };

};

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
        $render();
      }

      if(e.keyCode === 81){ // q
        clearInterval($advancer);
        clearInterval($generator);
        $gameOn = false;
      }
    }
    if(!$gameOn){
      if(e.keyCode === 32){ // s
        $('.instructions').toggle(200);
        $init();
      }
    }
  });

});

// generates bricks
$obstacleGen = function(board){
  var randomNumber = Math.random();
  // generates obstacles in the first row
  if(randomNumber < 0.5){
    var rows = board.length;
    var cols = board[0].length;
    var positionOfObstacle = Math.floor(Math.random()*cols);
    board[rows-1][positionOfObstacle] = 'b';
  }
};

// advances obstacles
$obstacleAdvance = function(board){
  if($collisionDetect(board)){
    $collisionHappened();
  }
  for (var i = 0; i < board.length-1; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if(board[i][j] !== 'o' && board[i][j] !== 'p'){
        board[i][j] = board[i+1][j];
        board[i+1][j] = 'x';
      }
    }
  }
  $render();
  $scoreCount += 100;
  if($scoreCount % $bonusChuteMultiple === 0){
    $board.board[$board.board.length-2][Math.floor(Math.random() * $board.board[0].length)] = 'e';
  }
};

// detects non-empty squares below apple before advancing row
$collisionDetect = function(board) {
  for(var i = 0; i < board[0].length; i++ ){
    if(board[0][i] === 'p' || board[0][i] === 'o'){
      if(board[1][i] === 'e'){
        $bonusChuteAdder();
        return false;
      }
    }
    if(board[0][i] === 'o' && board[0][i] !== 'p'){
      if(board[1][i] !== 'x'){
        return true;
      }
    }
  }
  return false;
};

$sideCollisionDetectRight = function(board) {
  for(var i = 0; i < board[0].length; i++ ){
    if(board[0][i] === 'p' || board[0][i] === 'o'){
      if(board[0][i+1] === 'e'){
        $bonusChuteAdder();
        return false;
      }
    }
    if(board[0][i] === 'o' && board[0][i] !== 'p'){
      if(board[0][i+1] === 'b'){
        $collisionHappened();
        return true;
      }
    }
  }
  return false;
};

$sideCollisionDetectLeft = function(board) {
  for(var i = 0; i < board[0].length; i++){
    if(board[0][i] === 'p' || board[0][i] === 'o'){
      if(board[0][i-1] === 'e'){
        $bonusChuteAdder();
        return false;
      }
    }
    if(board[0][i] === 'o' && board[0][i] !== 'p'){
      if(board[0][i-1] === 'b'){
        $collisionHappened();
        return true;
      }
    }
  }
  return false;
};

$collisionHappened = function(){
    $('.container').toggleClass('crashFlash');
    setTimeout(function(){
      $('.container').toggleClass('crashFlash');
    },50);

    if($lifeCount === 0){
      $endOfGame();
    } else {
      $lifeCount--;
    }
};
