// init variables
var moveAllowed = true;
var moveCount   = 0;
var dead        = false
var name        = '';

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
}

var player = {
    colour:  '#7192ef',
    pos:     0,
    prevPos: 0,
    move: function(key) {
        switch (key) {
            case 0: // <
            if (![0, 3, 6].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos--; // move the player
            } else {
                return 0;
            }
            break;

            case 1: // ^
            if (![0, 1, 2].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos -= 3; // move the player
            } else {
                return 0;
            }
            break;

            case 2: // >
            if (![2, 5, 8].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos++; // move the player
            } else {
                return 0;
            }
            break;

            case 3: // v
            if (![6, 7, 8].includes(player.pos)) {
                player.prevPos = player.pos; // save the previous pos
                player.pos += 3; // move the player
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

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

// listen for key presses
document.addEventListener('keydown', function(event) {
    if (moveAllowed) {
        // move the player
        player.move(event.keyCode - 37);
        moveCount++;

        checkDeath();

        // draw the board
        placeEntitys();

        if (dead) {
            name = prompt('Your score is ' + moveCount + ', enter your name to save your score', 'name');
            httpGetAsync('?page=saveScore&name='+name+'&score='+moveCount);
        }
    }
}, true);
