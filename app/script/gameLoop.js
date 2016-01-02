$firstRun = true;

$init = function() {

    $gameOn = true;
    $parachuteCount = 3;
    $lifeCount = 3;
    $scoreCount = 0;
    $bonusChuteMultiple = 5000;

    $board = new BoardMaker(5, 8);

    // place apple
    $board.board[0][Math.floor($board.board[0].length / 2)] = 'o';

    $(function() {

        $('.chuteMultiple').text($bonusChuteMultiple);
        $postHighScore();

        $render = function() {

            // iterate through board and cache each item found in arrays
            var freshBoard = '';

            for (var i = 0; i < $board.board.length; i++) {
                freshBoard += '<span class = "boardRow">';

                for (var j = 0; j < $board.board[i].length; j++) {
                    if ($board.board[i][j] === 'o') {
                        freshBoard += '<span class = "apple">o</span>';
                    }
                    if ($board.board[i][j] === 'p') {
                        freshBoard += '<span class = "parachute">p</span>';
                    }
                    if ($board.board[i][j] === 'x') {
                        freshBoard += '<span class = "spot">|</span>';
                    }
                    if ($board.board[i][j] === 'b') {
                        freshBoard += '<span class = "brick">+</span>';
                    }
                    if ($board.board[i][j] === 'e') {
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

    $postHighScore = function() {

        var hsText = localStorage.getItem('highScore');

        if (!hsText) {
            hsText = '0';
        }
        $('.highScore').text(hsText);
    };

    $deploy = function(board) {
        board.deploy();
    };

    $bonusChuteAdder = function() {
        $parachuteCount++;
    };

    $endOfGame = function() {
        clearInterval($advancer);
        clearInterval($generator);
        $gameOn = false;
        localStorage.setItem('date', new Date());
        localStorage.setItem('lastScore', $scoreCount);
        if (localStorage.getItem('highScore') === null) {
            localStorage.setItem('highScore', 0);
        }
        if (localStorage.getItem('highScore') < $scoreCount) {
            localStorage.setItem('highScore', $scoreCount);
        }
        $postHighScore();

        if ($firstRun) {
            $('.instructions').prepend('GAME OVER!<br><br>');
            $firstRun = false;
        }
        $('.instructions').toggle(700);
    };

    $startOfGame = function() {
        clearInterval($advancer);
        clearInterval($generator);
        $gameOn = false;
    };

    // set up gravity simulation
    $timeDecreaser = {
        cache: [750, 700, 680, 650, 600, 550, 500, 450, 400, 350, 300, 275, 250, 200, 200, 200, 150],
        current: 4,
        span: function() {
            if (this.current < this.cache.length - 1) {
                this.current++;
            }
            return this.cache[this.current];
        }
    };

    // set interval of advancement
    $advanceIt = function() {

        if (!$gameOn) {
            return null;
        }
        $advancer = setTimeout(function() {
            $obstacleAdvance($board.board);
            $obstacleGen($board.board);
            $advanceIt();
        }, $timeDecreaser.span());

    };
    $advanceIt();

    // set interval of obstacle generation
    $generator = setInterval(function() {
        $obstacleGen($board.board);
        $render();
    }, 300);

    $('.status').text('');
};
$init();
