<!DOCTYPE html>
<html>
	<head>
	<title>シューティング</title>
		<meta charset="utf-8">
		
        <link href="../../System/mainCSS.css" rel="stylesheet" type="text/css" />
		<link href="System/game.css" rel="stylesheet" type="text/css" />
        <link href="../forGamePage.css" rel="stylesheet" type="text/css" />
		

		<script type="text/JavaScript" src="System/Jquery.js"></script>
        <script type="text/javascript" src="System/Title-GameOver.js"></script>
		<script type="text/JavaScript" src="System/canvas1.js"></script>	
        <script type="text/JavaScript" src="System/canvas2-2.js"></script>
	</head>
	
	<body>
        <div id="page">
        <?php include("../../header.php"); ?>

        <?php include("../../sidemenu.php"); ?>

    <div id="Game">
    <div id="MainPart">
       <div class="start" id="gameStart">
            <h1 class="start">Blue Sky for Paper Plane</h1>
            <button class="start" type="button" id="Start">play</button>
            <canvas class="start" id="StartCanvas" width="500" height="500"></canvas>
       </div>

	    <div id="game">

			<canvas id="myCanvas1" width="500" height="500"></canvas>
            <canvas id="myCanvas2" width="500" height="500"></canvas>
            <canvas id="myCanvas3" width="500" height="500"></canvas>

            <p id="gameScore">Score:<span id="Score"></span></p>

            <!--<p id="playerHitpoint">Life:<span id="life"></span></p>
            <p id="enemyCount">enemyCount:<span id="Ecount"></span></p>

            <p id="shotsLength">shots:<span id="shots"></span></p>
            <p id="rectEnemys">rectEnemys:<span id="rectE"></span></p>
            <p id="waveEnemys">waveEnemys:<span id="waveE"></span></p>
            <p id="obliqueEnemys">obliEnemys:<span id="obliqueE"></span></p>
            <p id="playGame">playGame:<span id="play"></span></p>
            <p id="straightEnemys">straightEnemys:<span id="straightE"></span></p>-->

		</div>

        <div class="gameOver" id="gameEnd">
            <h1 class="gameOver">Game Over</h1>
            <p class="gameOver" id="s">Your Score : <span id="finalscore"></span></p>
            <p class="gameOver" id="r">Your Rank : <span id="playerRank"></span></p>
            <button class="gameOver" type="button">Return Title</button>
            <canvas  id="gameOverCanvas" class="gameOver" width="800" height="800"></canvas>
        </div> 
    </div>

    <div>
        <audio id="Titlebgm" loop>
            <source src="Sound/Title.mp3" />
            <source src="Sound/Title.ogg" />
        </audio>

        <audio id="shot">
            <source src="Sound/Shot.mp3" />
            <source src="Sound/Shot.ogg" />
        </audio>
        <audio id="shot2">
            <source src="Sound/Shot.mp3" />
            <source src="Sound/Shot.ogg" />
        </audio>
        <audio id="shot3">
            <source src="Sound/Shot.mp3" />
            <source src="Sound/Shot.ogg" />
        </audio>
        <audio id="shot4">
            <source src="Sound/Shot.mp3" />
            <source src="Sound/Shot.ogg" />
        </audio>
        <audio id="shot5">
            <source src="Sound/Shot.mp3" />
            <source src="Sound/Shot.ogg" />
        </audio>

        <audio id="hit">
            <source src="Sound/hit.mp3" />
            <source src="Sound/hit.ogg" />
        </audio>
        <audio id="hit2">
            <source src="Sound/hit.mp3" />
            <source src="Sound/hit.ogg" />
        </audio>
        <audio id="hit3">
            <source src="Sound/hit.mp3" />
            <source src="Sound/hit.ogg" />
        </audio>
        <audio id="hit4">
            <source src="Sound/hit.mp3" />
            <source src="Sound/hit.ogg" />
        </audio>
        <audio id="hit5">
            <source src="Sound/hit.mp3" />
            <source src="Sound/hit.ogg" />
        </audio>

        <audio id="bomb">
            <source src="Sound/Bomb.mp3" />
            <source src="Sound/Bomb.ogg" />
        </audio>
        <audio id="bomb2">
            <source src="Sound/Bomb.ogg" />
            <source src="Sound/Bomb.mp3" />
        </audio>
        <audio id="bomb3">
            <source src="Sound/Bomb.ogg" />
            <source src="Sound/Bomb.mp3" />
        </audio>
        <audio id="bomb4">
            <source src="Sound/Bomb.ogg" />
            <source src="Sound/Bomb.mp3" />
        </audio>
        <audio id="bomb5">
            <source src="Sound/Bomb.ogg" />
            <source src="Sound/Bomb.mp3" />
        </audio>

        <audio id="miss">
            <source src="Sound/Miss.mp3" />
            <source src="Sound/Miss.ogg" />
        </audio>

        <audio id="bodyattack">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack2">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack3">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack4">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack5">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack6">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack7">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack8">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack9">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack10">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack11">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack12">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>
        <audio id="bodyattack13">
            <source src="Sound/Bodyattack.mp3" />
            <source src="Sound/Bodyattack.ogg" />
        </audio>

        <audio id="lifeup">
            <source src="Sound/Lifeup.mp3" />
            <source src="Sound/Lifeup.ogg" />
        </audio>
        <audio id="lifeup2">
            <source src="Sound/Lifeup.mp3" />
            <source src="Sound/Lifeup.ogg" />
        </audio>
        <audio id="lifeup3">
            <source src="Sound/Lifeup.mp3" />
            <source src="Sound/Lifeup.ogg" />
        </audio>
        <audio id="lifeup4">
            <source src="Sound/Lifeup.mp3" />
            <source src="Sound/Lifeup.ogg" />
        </audio>
        <audio id="lifeup5">
            <source src="Sound/Lifeup.mp3" />
            <source src="Sound/Lifeup.ogg" />
        </audio>
        <audio id="lifeup6">
            <source src="Sound/Lifeup.mp3" />
            <source src="Sound/Lifeup.ogg" />
        </audio>
        </div>

    </div>

            <div id="footer">
            <footer>       
                <aside>
                    <section id="A">
                        <p>
                            Zキーでショット、Iキーで上 Kキーで下 Jキーで左 Lキーで右方向に移動できます。<br />
                            ハートをとると体力が回復します。
                        </p>
                    </section>
                    <br />
                    <section id="B">
                    <h3>ランク</h3>
                        <p>上に行くほど高いです</p>
                        <ul>
                            <li>( ﾟдﾟ )( ﾟдﾟ )( ﾟдﾟ )</li>  
                            <li>( ﾟдﾟ )( ﾟдﾟ )</li>
                            <li>( ﾟдﾟ )</li>
                            <li>(｀・ω・´)(｀・ω・´)(｀・ω・´)</li>
                            <li>(｀・ω・´)(｀・ω・´)</li>
                            <li>(｀・ω・´)</li>
                            <li>(´･ω･｀)</li>
                            <li>(´･ω･｀)(´･ω･｀)</li>
                            <li>(´･ω･｀)(´･ω･｀)(´･ω･｀)</li>
                        </ul>
                    </section>
                </aside>

                <p id="copyright"><small>Copyright &copy 2012 SCITEX. All right reserved.</small></p>
            </footer>
        </div>

    </div>
	</body>
</html>