describe("Apple Falls", function() {

describe('board', function(){
  it('should make a board of the proper size', function(){
    var b = new BoardMaker(11,30);

    expect(b.board.length).to.be.equal(30);
    expect(b.board[0].length).to.be.equal(11);
  });

  it('should place the apple on the first row', function(){
    var b = new BoardMaker(11,30);
    b.board[0][0] = 'o';

    expect(b.board[0][0]).to.equal('o');
  })

});

describe('movement', function(){
  it('apple should move left and right', function(){
    var b = new BoardMaker(11,30);
    b.board[0][0] = 'o';
    expect(b.board[0][0]).to.equal('o');
    expect(b.board[0][1]).to.equal('x');

    b.moveRight();
    expect(b.board[0][0]).to.not.equal('o');
    expect(b.board[0][1]).to.equal('o');

    b.moveRight();
    b.moveRight();
    expect(b.board[0][3]).to.equal('o');

    b.moveLeft();
    expect(b.board[0][3]).to.not.equal('o');
    expect(b.board[0][2]).to.equal('o');

  });


  it('apple should not move outside of board edges', function(){
    var b = new BoardMaker(11,30);
    b.board[0][0] = 'o';
    expect(b.board[0][0]).to.equal('o');
    expect(b.board[0][1]).to.equal('x');

    b.moveLeft();
    b.moveLeft();
    b.moveLeft();
    expect(b.board[0][0]).to.equal('o');

   b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();b.moveRight();
   b.moveRight();
    expect(b.board[0][10]).to.equal('o');
    expect(b.board[0][0]).to.equal('x');
    
  });
});

describe('collisions', function(){

<<<<<<< HEAD
  it('parchute should deploy and un-deploy', function(){
    b = new BoardMaker(5,5);
    b.board[0][0] = 'o';
    // b.board[4] = ['b','b','b','b','b']
    //expect($collisionDetect(b.board)).to.equal(false);
    //$obstacleAdvance(b.board);$obstacleAdvance(b.board);$obstacleAdvance(b.board);
    //expect($collisionDetect(b.board)).to.equal(true);
    b.deploy();
    expect(b.board[0][0]).to.equal('p');
    b.undeploy();
    expect(b.board[0][0]).to.equal('o');
    expect(b.board[0][1]).to.equal('x');

  });

=======
>>>>>>> parent of 4a8188f... Refactors to ignore collisions when parachute is deployed
  it('collisions with non-blank spaces should be detected', function(){
    b = new BoardMaker(5,5);
    b.board[0][0] = 'o';
    b.board[4] = ['b','b','b','b','b']
    expect($collisionDetect(b.board)).to.equal(false);
    $obstacleAdvance(b.board);$obstacleAdvance(b.board);$obstacleAdvance(b.board);
    expect($collisionDetect(b.board)).to.equal(true);
<<<<<<< HEAD
  });

  it('side collisions with non-blank spaces should be detected', function(){
    b = new BoardMaker(5,5);
    b.board[0][2] = 'o';
    b.board[1] = ['b','b','b','b','b']
    expect($collisionDetect(b.board)).to.equal(true);
    $obstacleAdvance(b.board);
    expect($collisionDetect(b.board)).to.equal(false);
    expect($sideCollisionDetectRight(b.board)).to.equal(true);
    expect($sideCollisionDetectLeft(b.board)).to.equal(true);
  });

  it('collisions should be ignored when parachute is deployed', function(){
    b = new BoardMaker(5,5);
    b.board[0][2] = 'o';
    b.deploy();
    b.board[1] = ['b','b','b','b','b']
    expect($collisionDetect(b.board)).to.equal(false);
    $obstacleAdvance(b.board);
    expect($sideCollisionDetectRight(b.board)).to.equal(false);
    expect($sideCollisionDetectLeft(b.board)).to.equal(false);
  });

=======
>>>>>>> parent of 4a8188f... Refactors to ignore collisions when parachute is deployed

  });
});




});
