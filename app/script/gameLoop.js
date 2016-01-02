var GameLoop = function() {
    this.firstRun = true;
    this.timeDecreaser = {
        chuteStart: 6,
        defaultStart: 4,
        cache: [750, 700, 680, 650, 600, 550, 500, 450, 400, 350, 300, 275, 250, 200, 200, 200, 150],
        current: this.defaultStart,
        parachuteDeployed: function() {
            this.current = this.chuteStart;
        },
        span: function() {
            if (this.current < this.cache.length - 1) {
                this.current++;
            }
            return this.cache[this.current];
        },
        reset: function() {
            this.current = this.defaultStart;
        }
    };
};

GameLoop.prototype.postHighScore = function() {
    var hsText = localStorage.getItem('highScore');

    if (!hsText) {
        hsText = '0';
    }
    $('.highScore').text(hsText);
};

GameLoop.prototype.endOfGame = function() {
    clearInterval(advancer);
    clearInterval(generator);
    this.board.gameOn = false;
    localStorage.setItem('date', new Date());
    localStorage.setItem('lastScore', this.board.$scoreCount);
    if (localStorage.getItem('highScore') === null) {
        localStorage.setItem('highScore', 0);
    }
    if (localStorage.getItem('highScore') < this.board.$scoreCount) {
        localStorage.setItem('highScore', this.board.$scoreCount);
    }
    this.postHighScore();

    if (this.firstRun) {
        $('.instructions').prepend('GAME OVER!<br><br>');
        this.firstRun = false;
    }
    $('.instructions').toggle(400);
};

GameLoop.prototype.advanceIt = function() {
    var self = this;
    if (!this.board.gameOn) {
        return null;
    }
    advancer = setTimeout(function() {
        self.board.obstacleAdvance(self.board.board);
        self.board.obstacleGen(self.board.board);
        self.advanceIt();
    }, self.timeDecreaser.span());
};

GameLoop.prototype.init = function() {
    var self = this;

    this.board = new BoardMaker(5, 8);
    $(this.board).on('endOfGame', function() {
        self.endOfGame();
    });

    // place apple
    this.board.placeApple();

    // reset gravity to starting amount
    this.timeDecreaser.reset();
    this.advanceIt();

    // set interval of obstacle generation
    generator = setInterval(function() {
        self.board.obstacleGen(self.board.board);
        self.board.render();
    }, 300);

    $('.status').text('');
};

GameLoop.prototype.clearTurnGenerators = function() {
    clearInterval(advancer);
    clearInterval(generator);
    this.board.gameOn = false;
};

var game = new GameLoop();
game.init();

var keyRight = function() {
    game.board.sideCollisionDetectRight(game.board.board);
    game.board.moveRight(game.board.board);
    game.board.render();
};

var keyLeft = function() {
    game.board.sideCollisionDetectLeft(game.board.board);
    game.board.moveLeft(game.board.board);
    game.board.render();
};
