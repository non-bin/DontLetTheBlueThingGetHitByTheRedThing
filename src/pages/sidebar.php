<table>

<tr>
    <td><b>Name</b></td>
    <td><b>Score</b></td>
</tr>

<?php

for ($i=0; $i < 10; $i++) {
    if (isset($scoreboard[$i])) {
        echo '<tr class="leaderNo'. $i .'"><td>'. $scoreboard[$i][0] .'</td><td>'. $scoreboard[$i][1] .'</td></tr>';
    }
}

?>

</table>
