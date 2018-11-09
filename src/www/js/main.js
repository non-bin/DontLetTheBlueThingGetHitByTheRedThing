// init variables
var moveAllowed = true;
var moveCount   = 0;
var dead        = false;

// entity init
const colours = {
    enemy:  '#f07777',
    player: '#7192ef',
    board:  '#b9b9b9',
    death:  '#f3da51',
}

var enemy = {
    pos:     8,
    prevPos: 8,
    move: function(dir) {
        switch (dir) {
            case 0: // <
            if (![0, 3, 6].includes(enemy.pos)) {
                enemy.prevPos = enemy.pos; // save the previous pos
                enemy.pos--; // move the enemy
                return 1;
            } else {
                return 0;
            }
            break;

            case 1: // ^
            if (![0, 1, 2].includes(enemy.pos)) {
                enemy.prevPos = enemy.pos; // save the previous pos
                enemy.pos -= 3; // move the enemy
                return 1;
            } else {
                return 0;
            }
            break;

            case 2: // >
            if (![2, 5, 8].includes(enemy.pos)) {
                enemy.prevPos = enemy.pos; // save the previous pos
                enemy.pos++; // move the enemy
                return 1;
            } else {
                return 0;
            }
            break;

            case 3: // v
            if (![6, 7, 8].includes(enemy.pos)) {
                enemy.prevPos = enemy.pos; // save the previous pos
                enemy.pos += 3; // move the enemy
                return 1;
            } else {
                return 0;
            }
            break;

            default:
            return false;
            break;
        }
    }
}

var player = {
    pos:     0,
    prevPos: 0,
    move: function(dir) {
        switch (dir) {
            case 0: // <
            if (![0, 3, 6].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos--; // move the player
                return 1;
            } else {
                return 0;
            }
            break;

            case 1: // ^
            if (![0, 1, 2].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos -= 3; // move the player
                return 1;
            } else {
                return 0;
            }
            break;

            case 2: // >
            if (![2, 5, 8].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos++; // move the player
                return 1;
            } else {
                return 0;
            }
            break;

            case 3: // v
            if (![6, 7, 8].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos += 3; // move the player
                return 1;
            } else {
                return 0;
            }
            break;

            default:
            return false;
            break;
        }
    }
}

// game init
var scoreDisplay = document.getElementById('currentScore');

var board = [];
for (var i = 0; i < 9; i++) {
    board.push(document.getElementById('GS' + i));
}

placeEntitys();

// functions
function placeEntitys() {
    // clear the previous positions
    board[enemy.prevPos].style  = 'background-color: ' + colours.board;
    board[player.prevPos].style = 'background-color: ' + colours.board;

    // place enemy
    board[enemy.pos].style      = 'background-color: ' + colours.enemy;

    // place player
    board[player.pos].style     = 'background-color: ' + colours.player;

    if (dead) {
        board[enemy.pos].style = 'background-color: ' + colours.death;
    }
}

function checkDeath() {
    if (player.pos === enemy.pos) {
        dead             = true;
        moveAllowed      = false;
    }
}

function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // true for asynchronous
    xmlHttp.send(null);
}

// listen for key presses
document.addEventListener('keydown', function(event) {
    if (moveAllowed) {
        // move the player
        if (player.move(event.keyCode - 37)) {
            moveAllowed = false;

            // draw the board
            placeEntitys();

            setTimeout(() => {
                while (true) {
                    if (enemy.move(Math.floor((Math.random() * 4) + 0))) {
                        break
                    }
                }

                moveCount++;

                scoreDisplay.innerHTML = moveCount;

                checkDeath();

                // draw the board
                placeEntitys();

                if (dead) {
                    var name = prompt('Your score is ' + moveCount + ', enter your name to save your score (cancel to not save)', '');
                    if (name != null && name != '') {
                        httpGetAsync('?page=saveScore&name='+name+'&score='+moveCount);
                    } else {
                        httpGetAsync('?page=saveScore&score='+moveCount);
                    }

                    window.location.reload(true);

                    moveAllowed = true;
                    moveCount   = 0;
                    dead        = false;
                    enemy.pos   = 8;
                    player.pos  = 0;

                    for (let i = 0; i < 9; i++) {
                        board[i].style = 'background-color: ' + colours.board;
                    }

                    placeEntitys();
                }

                moveAllowed = true;
            }, 100);
        }
    }
}, true);
