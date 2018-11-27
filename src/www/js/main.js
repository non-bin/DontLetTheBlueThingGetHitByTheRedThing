const ENEMY_MOVE_DELAY = 25;

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
    switch (findGetParameter('style')) {
        case 'wah':
            // clear the previous positions
            board[enemy.prevPos].style  = '';
            board[player.prevPos].style = '';

            // place enemy
            board[enemy.pos].style      = 'background-image: url("/img/wah.gif")';

            // place player
            board[player.pos].style     = 'background-image: url("/img/sanic.gif")';

            if (dead) {
                board[enemy.pos].style = 'background-image: url("/img/death.gif")';
            }
            break;

        default:
            // clear the previous positions
            board[enemy.prevPos].style  = '';
            board[player.prevPos].style = '';

            // place enemy
            board[enemy.pos].style      = 'background-color: ' + colours.enemy;

            // place player
            board[player.pos].style     = 'background-color: ' + colours.player;

            if (dead) {
                board[enemy.pos].style = 'background-color: ' + colours.death;
            }
            break;
    }
}

function checkDeath() {
    if (player.pos === enemy.pos) {
        dead             = true;
        moveAllowed      = false;
    }
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function httpGet(theUrl)
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

                if (findGetParameter('style') == 'wah') {
                    delay = 1200;
                } else {
                    delay = 50;
                }

                if (dead) {
                    setTimeout(() => {
                        var name = prompt('Your score is ' + moveCount + ', enter your name to save your score (cancel to not save)', '');
                        if (name != null && name != '' && findGetParameter('style') != 'wah') {
                            httpGet('?page=saveScore&name='+name+'&score='+moveCount);
                        } else if (findGetParameter('style') == 'wah') {
                            httpGet('?page=saveScore&name=WAAAAHHHH&score='+moveCount);
                        } else {
                            httpGet('?page=saveScore&name=noOne&score='+moveCount);
                        }

                        window.location.reload(true)
                    }, delay);
                } else {
                    moveAllowed = true;
                }
            }, ENEMY_MOVE_DELAY);
        }
    }
}, true);
