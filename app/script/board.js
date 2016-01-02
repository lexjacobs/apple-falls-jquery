var BoardMaker = function(nX, nY) {
    this.row = nX;
    this.col = nY;
    this.board = [];
    this.primeBoard(this.board, this.row, this.col);

    this.$gameOn = true;
    this.$parachuteCount = 3;
    this.$lifeCount = 3;
    this.$scoreCount = 0;
    this.$bonusChuteMultiple = 1000;

};

BoardMaker.prototype.$bonusChuteAdder = function() {
    this.$parachuteCount++;
};

BoardMaker.prototype.placeApple = function() {
    this.board[0][Math.floor(this.board[0].length / 2)] = 'o';

};

BoardMaker.prototype.primeBoard = function(board, row, col) {
    for (var i = 0; i < col; i++) {
        board.push([]);
    }
    for (var j = 0; j < this.board.length; j++) {
        for (var k = 0; k < row; k++) {
            board[j].push('x');
        }
    }
    return;
};

BoardMaker.prototype.moveRight = function(board) {
    for (var i = 0; i < board[0].length; i++) {

        if (board[0][i] === 'o' && i < board[0].length - 1) {
            board[0][i] = 'x';
            board[0][i + 1] = 'o';
            break;
        }
        if (board[0][i] === 'p' && i < board[0].length - 1) {
            board[0][i] = 'x';
            board[0][i + 1] = 'p';
            break;
        }
    }
    return;
};

BoardMaker.prototype.moveLeft = function(board) {
    for (var i = 0; i < board[0].length; i++) {
        if (board[0][i] === 'o' && i !== 0) {
            board[0][i] = 'x';
            board[0][i - 1] = 'o';
            break;
        }
        if (board[0][i] === 'p' && i !== 0) {
            board[0][i] = 'x';
            board[0][i - 1] = 'p';
            break;
        }
    }
    return;
};

BoardMaker.prototype.deploy = function() {
    var timeoutFlag = false;
    if (this.$parachuteCount === 0) {
        return false;
    }
    for (var i = 0; i < this.board[0].length; i++) {
        if (this.board[0][i] === 'o') {
            this.board[0][i] = 'p';
            this.$parachuteCount--;
            timeoutFlag = true;
            break;
        }
    }
    if (timeoutFlag) {
        var self = this;
        setTimeout(function() {
            self.undeploy();
        }, 3000);
    }
    return false;
};

BoardMaker.prototype.undeploy = function() {
    for (var i = 0; i < this.board[0].length; i++) {
        if (this.board[0][i] === 'p') {
            this.board[0][i] = 'o';
            break;
        }
    }
    return true;
};

BoardMaker.prototype.$render = function(board) {

    // iterate through board and cache each item found in arrays
    var freshBoard = '';

    for (var i = 0; i < this.board.length; i++) {
        freshBoard += '<span class = "boardRow">';

        for (var j = 0; j < this.board[i].length; j++) {
            if (this.board[i][j] === 'o') {
                freshBoard += '<span class = "apple">o</span>';
            }
            if (this.board[i][j] === 'p') {
                freshBoard += '<span class = "parachute">p</span>';
            }
            if (this.board[i][j] === 'x') {
                freshBoard += '<span class = "spot">|</span>';
            }
            if (this.board[i][j] === 'b') {
                freshBoard += '<span class = "brick">+</span>';
            }
            if (this.board[i][j] === 'e') {
                freshBoard += '<span class = "bonusParachute">p</span>';
            }
        }
        freshBoard += '</span><br>';
    }

    // append cached board element to DOM
    $('.board').html(freshBoard);
    this.updateCounters();
};

BoardMaker.prototype.updateCounters = function() {
    // update dashboard with parachute/life/score count
    $('.parachutes').text(this.$parachuteCount);
    $('.lives').text(this.$lifeCount);
    $('.score').text(this.$scoreCount);
};


// generates bricks
BoardMaker.prototype.$obstacleGen = function(board) {
    var randomNumber = Math.random();
    // generates obstacles in the first row
    if (randomNumber < 0.5) {
        var rows = board.length;
        var cols = board[0].length;
        var positionOfObstacle = Math.floor(Math.random() * cols);
        board[rows - 1][positionOfObstacle] = 'b';
    }
};

// advances obstacles
BoardMaker.prototype.$obstacleAdvance = function(board) {
    if (this.$collisionDetect(board)) {
        this.$collisionHappened();
    }
    for (var i = 0; i < board.length - 1; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 'o' && board[i][j] !== 'p') {
                board[i][j] = board[i + 1][j];
                board[i + 1][j] = 'x';
            }
        }
    }
    this.$render();
    this.$scoreCount += 100;
    if (this.$scoreCount % this.$bonusChuteMultiple === 0) {
        this.board[this.board.length - 2][Math.floor(Math.random() * this.board[0].length)] = 'e';
    }
};


// detects non-empty squares below apple before advancing row
BoardMaker.prototype.$collisionDetect = function(board) {
    for (var i = 0; i < board[0].length; i++) {
        if (board[0][i] === 'p' || board[0][i] === 'o') {
            if (board[1][i] === 'e') {
                this.$bonusChuteAdder();
                return false;
            }
        }
        if (board[0][i] === 'o' && board[0][i] !== 'p') {
            if (board[1][i] !== 'x') {
                return true;
            }
        }
    }
    return false;
};

BoardMaker.prototype.$sideCollisionDetectRight = function(board) {
    for (var i = 0; i < board[0].length; i++) {
        if (board[0][i] === 'p' || board[0][i] === 'o') {
            if (board[0][i + 1] === 'e') {
                this.$bonusChuteAdder();
                return false;
            }
        }
        if (board[0][i] === 'o' && board[0][i] !== 'p') {
            if (board[0][i + 1] === 'b') {
                this.$collisionHappened();
                return true;
            }
        }
    }
    return false;
};

BoardMaker.prototype.$sideCollisionDetectLeft = function(board) {
    for (var i = 0; i < board[0].length; i++) {
        if (board[0][i] === 'p' || board[0][i] === 'o') {
            if (board[0][i - 1] === 'e') {
                this.$bonusChuteAdder();
                return false;
            }
        }
        if (board[0][i] === 'o' && board[0][i] !== 'p') {
            if (board[0][i - 1] === 'b') {
                this.$collisionHappened();
                return true;
            }
        }
    }
    return false;
};

BoardMaker.prototype.$collisionHappened = function() {
    $('.container').addClass('crashFlash');
    setTimeout(function() {
        $('.container').removeClass('crashFlash');
    }, 50);

    if (this.$lifeCount === 0) {
        $(this).trigger('endOfGame');
    } else {
        this.$lifeCount--;
    }
};
