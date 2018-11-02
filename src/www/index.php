<?php

$file = fopen('../scoreboard', 'r');
$scoreboard = unserialize(fgets($file));
fclose($file);

if (isset($_GET['page'])) {
    switch ($_GET['page']) {
        case 'sidebar':
            require '../pages/sidebar.php';
            break;

        case 'saveScore':
            if (isset($_GET['name'], $_GET['score'])) {
                $scoreboard[] = [$_GET['name'], $_GET['score']];
                usort($scoreboard, "cmp");
                // array_pop($scoreboard);
                $file = fopen('../scoreboard', 'w');
                fwrite($file, serialize($scoreboard));
                fclose($file);
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

    // return $a[1] <=> $b[1];
}

?>
