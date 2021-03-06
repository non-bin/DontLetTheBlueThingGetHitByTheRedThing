<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <title>Don't Let The Blue Thing Touch The Red Thing</title>
</head>
<body>
    <?php
    if (isset($_GET['style']) && $_GET['style'] == 'round') {
        ?>
        <style>
            .gameSquare {
                border-radius: 50%;
            }
        </style>
        <?php
    }
    ?>
    <a class="navLink" href="?page=instructions">[How To Play]</a>
    <a class="navLink" href="?">[Reset]</a>
    <a class="navLink" href="?style=round">[Round]</a>
    <a class="navLink" href="?style=wah">[Wah]</a>
    <div class="game">
        <table>
            <tr>
                <td>
                    <table class="gameBoard">
                        <tr>
                            <td class="gameSquare" id="GS0"></td>
                            <td class="gameSquare" id="GS1"></td>
                            <td class="gameSquare" id="GS2"></td>
                        </tr>
                        <tr>
                            <td class="gameSquare" id="GS3"></td>
                            <td class="gameSquare" id="GS4"></td>
                            <td class="gameSquare" id="GS5"></td>
                        </tr>
                        <tr>
                            <td class="gameSquare" id="GS6"></td>
                            <td class="gameSquare" id="GS7"></td>
                            <td class="gameSquare" id="GS8"></td>
                        </tr>
                    </table>
                </td>
                <td>
                    <div class="sidebar">
                        <div class="scoreDisplay">Current Score: <span id="currentScore">0</span></div><br>
                        <?php require '../pages/sidebar.php'; ?>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <?php

    if (isset($_GET['style']) && $_GET['style'] == 'wah') {
        echo '<div style="background-image: url(\'/img/death.gif\'); display: none;"></div>';
    }

    ?>

    <script src="js/main.js"></script>
</body>
</html>
