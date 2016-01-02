describe('Apple Falls', function() {

    describe('board', function() {
        it('should make a board of the proper size', function() {
            var b = new BoardMaker(11, 30);

            expect(b.board.length).to.be.equal(30);
            expect(b.board[0].length).to.be.equal(11);
        });

        it('should place the apple on the first row', function() {
            var b = new BoardMaker(11, 30);
            b.board[0][0] = 'o';

            expect(b.board[0][0]).to.equal('o');
        });

    });

    describe('movement', function() {
        it('apple should move left and right', function() {
            var b = new BoardMaker(11, 30);

            b.board[0][0] = 'o';
            expect(b.board[0][0]).to.equal('o');
            expect(b.board[0][1]).to.equal('x');

            b.moveRight(b.board);
            expect(b.board[0][0]).to.not.equal('o');
            expect(b.board[0][1]).to.equal('o');

            b.moveRight(b.board);
            b.moveRight(b.board);
            expect(b.board[0][3]).to.equal('o');

            b.moveLeft(b.board);
            expect(b.board[0][3]).to.not.equal('o');
            expect(b.board[0][2]).to.equal('o');

        });


        it('apple should not move outside of board edges', function() {
            var i;
            var b = new BoardMaker(11, 30);
            b.board[0][0] = 'o';
            expect(b.board[0][0]).to.equal('o');
            expect(b.board[0][1]).to.equal('x');

            for (i = 0; i < 100; i++) {
                b.moveLeft(b.board);
            }
            expect(b.board[0][0]).to.equal('o');
            expect(b.board[0][10]).to.equal('x');

            for (i = 0; i < 100; i++) {
                b.moveRight(b.board);
            }
            expect(b.board[0][10]).to.equal('o');
            expect(b.board[0][0]).to.equal('x');

        });
    });

    describe('collisions', function() {

        it('parchute should deploy and un-deploy', function() {
            b = new BoardMaker(5, 5);
            b.board[0][0] = 'o';
            b.board[4] = ['b', 'b', 'b', 'b', 'b'];

            // nothing around
            expect(b.$collisionDetect(b.board)).to.equal(false);

            // move obstacles to next row up
            b.$obstacleAdvance(b.board);
            b.$obstacleAdvance(b.board);
            b.$obstacleAdvance(b.board);
            expect(b.$collisionDetect(b.board)).to.equal(true);

            // add two rows of solid obstacles
            b = new BoardMaker(5, 6);
            b.board[0][0] = 'o';
            b.board[4] = ['b', 'b', 'b', 'b', 'b'];
            b.board[5] = ['b', 'b', 'b', 'b', 'b'];

            // deploy parachute
            b.deploy();
            expect(b.board[0][0]).to.equal('p');

            // advance obstacles
            expect(b.$collisionDetect(b.board)).to.equal(false);
            b.$obstacleAdvance(b.board);
            b.$obstacleAdvance(b.board);
            b.$obstacleAdvance(b.board);
            // should be invincible
            expect(b.$collisionDetect(b.board)).to.equal(false);

            // next row however should collide
            b.undeploy();
            expect(b.board[0][0]).to.equal('o');
            expect(b.board[0][1]).to.equal('x');
            expect(b.$collisionDetect(b.board)).to.equal(true);


        });

        it('collisions with non-blank spaces should be detected', function() {
            b = new BoardMaker(5, 5);
            b.board[0][0] = 'o';
            b.board[4] = ['b', 'b', 'b', 'b', 'b'];
            expect(b.$collisionDetect(b.board)).to.equal(false);
            b.$obstacleAdvance(b.board);
            b.$obstacleAdvance(b.board);
            b.$obstacleAdvance(b.board);
            expect(b.$collisionDetect(b.board)).to.equal(true);
        });

        it('side collisions with non-blank spaces should be detected', function() {
            b = new BoardMaker(5, 5);
            b.board[0][2] = 'o';
            b.board[1] = ['b', 'b', 'b', 'b', 'b'];
            expect(b.$collisionDetect(b.board)).to.equal(true);
            b.$obstacleAdvance(b.board);
            expect(b.$collisionDetect(b.board)).to.equal(false);
            expect(b.$sideCollisionDetectRight(b.board)).to.equal(true);
            expect(b.$sideCollisionDetectLeft(b.board)).to.equal(true);
        });

        it('collisions should be ignored when parachute is deployed', function() {
            b = new BoardMaker(5, 5);
            b.board[0][2] = 'o';
            b.deploy();
            b.board[1] = ['b', 'b', 'b', 'b', 'b'];
            expect(b.$collisionDetect(b.board)).to.equal(false);
            b.$obstacleAdvance(b.board);
            expect(b.$sideCollisionDetectRight(b.board)).to.equal(false);
            expect(b.$sideCollisionDetectLeft(b.board)).to.equal(false);
        });

        it('bonus parachutes should increment counter upon collision', function() {
            b = new BoardMaker(5, 5);
            b.board[0][2] = 'o';
            b.$parachuteCount = 1;
            b.board[1][2] = 'e';
            expect(b.$parachuteCount).to.equal(1);
            b.$obstacleAdvance(b.board);
            expect(b.$parachuteCount).to.equal(2);
            b.board[0][1] = 'e';
            b.$sideCollisionDetectLeft(b.board);
            expect(b.$parachuteCount).to.equal(3);
            b.board[0][1] = 'x';
            b.board[0][0] = 'e';
            b.$sideCollisionDetectLeft(b.board);
            expect(b.$parachuteCount).to.equal(3);
            b.board[0][3] = 'e';
            b.$sideCollisionDetectRight(b.board);
            expect(b.$parachuteCount).to.equal(4);
        });
    });

});
