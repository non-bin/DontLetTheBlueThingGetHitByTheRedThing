<?php

$actualySaveScores = true;

$file = fopen('../scoreboard.json', 'r');
$scoreboard = json_decode(fgets($file));
fclose($file);

if (isset($_GET['page'])) {
    switch ($_GET['page']) {
        case 'sidebar':
            require '../pages/sidebar.php';
            break;

        case 'instructions':
            require '../pages/instructions.php';
            break;

        case 'saveScore':
            if (isset($_GET['score'])) {
                $score = (int)$_GET['score'];

                if (isset($_GET['name'])) {
                    $scoreboard[] = [$_GET['name'], $score];
                    usort($scoreboard, "cmp");

                    if (count($scoreboard) > 10) {
                        array_pop($scoreboard);
                    }

                    $file = fopen('../scoreboard.json', 'w');
                    fwrite($file, json_encode($scoreboard));
                    fclose($file);
                }

                if ($actualySaveScores) {
                    $file = fopen('../scores.json', 'r+');
                    fseek($file, -2, SEEK_END);
                    fwrite($file, ','.$score."]\n");
                    fclose($file);
                }
            }
            break;

        default:
            require '../pages/game.php';
            break;
    }
} else {
    require '../pages/game.php';
}

function cmp($a, $b)
{
    if ($a[1] == $b[1]) {
        return 0;
    }
    return ($a[1] > $b[1]) ? -1 : 1;
}

?>
