var GameLoop = function() {
    this.board = null;
    this.$firstRun = true;
    this.$timeDecreaser = {
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

GameLoop.prototype.$postHighScore = function() {
    var hsText = localStorage.getItem('highScore');

    if (!hsText) {
        hsText = '0';
    }
    $('.highScore').text(hsText);
};

GameLoop.prototype.$endOfGame = function() {
    clearInterval($advancer);
    clearInterval($generator);
    this.board.$gameOn = false;
    localStorage.setItem('date', new Date());
    localStorage.setItem('lastScore', this.board.$scoreCount);
    if (localStorage.getItem('highScore') === null) {
        localStorage.setItem('highScore', 0);
    }
    if (localStorage.getItem('highScore') < this.board.$scoreCount) {
        localStorage.setItem('highScore', this.board.$scoreCount);
    }
    this.$postHighScore();

    if (this.$firstRun) {
        $('.instructions').prepend('GAME OVER!<br><br>');
        this.$firstRun = false;
    }
    $('.instructions').toggle(400);
};

GameLoop.prototype.$advanceIt = function() {
    var self = this;
    if (!this.board.$gameOn) {
        return null;
    }
    $advancer = setTimeout(function() {
        self.board.$obstacleAdvance(self.board.board);
        self.board.$obstacleGen(self.board.board);
        self.$advanceIt();
    }, self.$timeDecreaser.span());
};

GameLoop.prototype.$init = function() {
    var self = this;

    this.board = new BoardMaker(5, 8);
    $(this.board).on('endOfGame', function() {
        self.$endOfGame();
    });

    // place apple
    this.board.placeApple();

    // reset gravity to starting amount
    this.$timeDecreaser.reset();

    $(function() {
        $('.chuteMultiple').text(self.board.$bonusChuteMultiple);
        self.$postHighScore();

        // initial rendering
        self.board.$render();
    });

    this.$advanceIt();

    // set interval of obstacle generation
    $generator = setInterval(function() {
        self.board.$obstacleGen(self.board.board);
        self.board.$render();
    }, 300);

    $('.status').text('');
};

var game = new GameLoop();
game.$init();

var keyRight = function() {
    game.board.$sideCollisionDetectRight(game.board.board);
    game.board.moveRight(game.board.board);
    game.board.$render();
};

var keyLeft = function() {
    game.board.$sideCollisionDetectLeft(game.board.board);
    game.board.moveLeft(game.board.board);
    game.board.$render();
};

$clearTurnGenerators = function() {
    clearInterval($advancer);
    clearInterval($generator);
    game.board.$gameOn = false;
};


$(function() {

    // sets initial state so that user must initiate game with 's' or click
    $clearTurnGenerators();

    $('body').on('keydown', function(e) {
        if (game.board.$gameOn) {
            if (e.keyCode === 39) { // right arrow
                keyRight();
            }
            if (e.keyCode === 37) { // left arrow
                keyLeft();
            }
            if (e.keyCode === 32) { // space bar
                game.board.deploy();
                game.$timeDecreaser.parachuteDeployed();
                game.board.$render();
            }
        }
        if (!game.board.$gameOn) {
            if (e.keyCode === 32) { // space bar
                $('.instructions').toggle(200);
                game.$init();
            }
        }
    });
});
