$board = new boardMaker(5,5);

// place apple

$board.board[0][0] = 'o';



// console.log($board);

$(function(){

  setInterval(function(){
    $('.board').text($board.board);
  }, 5);


});