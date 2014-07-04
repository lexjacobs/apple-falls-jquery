describe('Apple Falls', function() {

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
  });

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

  it('collisions with non-blank spaces should be detected', function(){
    b = new BoardMaker(5,5);
    b.board[0][0] = 'o';
    b.board[4] = ['b','b','b','b','b'];
    expect($collisionDetect(b.board)).to.equal(false);
    $obstacleAdvance(b.board);$obstacleAdvance(b.board);$obstacleAdvance(b.board);
    expect($collisionDetect(b.board)).to.equal(true);
  });

  it('side collisions with non-blank spaces should be detected', function(){
    b = new BoardMaker(5,5);
    b.board[0][2] = 'o';
    b.board[1] = ['b','b','b','b','b'];
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
    b.board[1] = ['b','b','b','b','b'];
    expect($collisionDetect(b.board)).to.equal(false);
    $obstacleAdvance(b.board);
    expect($sideCollisionDetectRight(b.board)).to.equal(false);
    expect($sideCollisionDetectLeft(b.board)).to.equal(false);
  });

  it('bonus parachutes should increment counter upon collision', function(){
    b = new BoardMaker(5,5);
    b.board[0][2] = 'o';
    $parachuteCount = 1;
    b.board[1][2] = 'e';
    expect($parachuteCount).to.equal(1);
    $obstacleAdvance(b.board);
    expect($parachuteCount).to.equal(2);
    b.board[0][1] = 'e';
    $sideCollisionDetectLeft(b.board);
    expect($parachuteCount).to.equal(3);
    b.board[0][1] = 'x';
    b.board[0][0] = 'e';
    $sideCollisionDetectLeft(b.board);
    expect($parachuteCount).to.equal(3);
    b.board[0][3] = 'e';
    $sideCollisionDetectRight(b.board);
    expect($parachuteCount).to.equal(4);
  });
});

});