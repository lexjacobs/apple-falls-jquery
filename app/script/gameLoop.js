$board = new BoardMaker(5,8);

// place apple
$board.board[0][0] = 'o';

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
        $('.row'+i).append('<span class = "spot">+</span>');
      }
      if($board.board[i][j] === 'b'){
        $('.row'+i).append('<span class = "brick">x</span>');
      }
    }
  }
}

// initial rendering
$render();        

// end of document ready loop
});
