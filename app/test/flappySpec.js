describe("flappyThings", function() {

  // var flappy;
  // var timeBetweenSteps = 100;
  // var clock;

  // beforeEach(function() {
  //   clock = sinon.useFakeTimers();
  //   blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  // });

describe('board', function(){
  it('should make a board of the proper size', function(){
    var b = new boardMaker(11,30);

    expect(b.board.length).to.be.equal(30);
    expect(b.board[0].length).to.be.equal(11);
  });

  it('should place the apple on the first row', function(){
    var b = new boardMaker(11,30);
    b.board[0][0] = 'o';

    expect(b.board[0][0]).to.equal('o');
  })

});

describe('movement', function(){
  it('apple should move left and right', function(){
    var b = new boardMaker(11,30);
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
    var b = new boardMaker(11,30);
    b.board[0][0] = 'o';
    expect(b.board[0][0]).to.equal('o');
    expect(b.board[0][1]).to.equal('x');

    b.moveLeft();
    b.moveLeft();
    b.moveLeft();
    expect(b.board[0][0]).to.equal('o');

    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    b.moveRight();
    expect(b.board[0][10]).to.equal('o');
    expect(b.board[0][0]).to.equal('x');
    
  });


});

  // describe("dance", function(){
  //   it("should call step at least once per second", function(){
  //     sinon.spy(blinkyDancer, "step");
  //     expect(blinkyDancer.step.callCount).to.be.equal(0);
  //     clock.tick(timeBetweenSteps);
  //     clock.tick(timeBetweenSteps); // Why do we have a 2nd call?

  //     expect(blinkyDancer.step.callCount).to.be.equal(1);

  //     clock.tick(timeBetweenSteps);
  //     expect(blinkyDancer.step.callCount).to.be.equal(2);
  //   });
  // });


});
