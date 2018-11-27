<table>

<tr>
    <td><b>Name</b></td>
    <td><b>Score</b></td>
</tr>

<?php

echo '<tr class="leaderNo0"><td>'. $scoreboard[0][0] .' is da best</td><td>'. $scoreboard[0][1] .'</td></tr>';

$j = 1;
for ($i=1; $i < 10; $i++) {
    $j++;
    if ($j > 9)
    {
        $j = 1;
    }
    if (isset($scoreboard[$i])) {
        echo '<tr class="leaderNo'. $j .'"><td>'. $scoreboard[$i][0] .'</td><td>'. $scoreboard[$i][1] .'</td></tr>';
    }
}

?>

</table>
