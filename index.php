﻿<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="System/mainCSS.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="System/Jquery.js"></script>
    <script type="text/javascript" src="System/titleCanvas.js"></script>
</head>
<body>
    <div id="page">
        <!--<div id="header">
            <header>
                <h1 id="title">YNU PC Circle SCITEX<br />GameDev</h1>
                <canvas id="titleCanvas" width="900" height="150"></canvas>
               <div id="title"></div>
            </header>
        </div>-->

        <?php include("header.php"); ?>

        <div id="side"></div>
        <div id="sidemenu">
            <nav>
                <ul>
                    <li class="top" id="current"><a href="#">ホーム</a></li>
                    <li><a href="#">活動紹介</a></li>
                    <li><a href="#">お知らせ</a></li>
                    
                    <li id="gallery"><a href="gallery/index.php">ギャラリー</a></li>
                    <li class="childGallery"><a href="gallery/BlueSkyforPaperPlain/index.php">BlueSkyfor PaperPlain</a></li>
                       
                    <li class="last"><a href="#">リンク</a></li>
                </ul>
            </nav>
        </div>

        <div id="main">
           <section>
                <h2>このサイトについて</h2>
                <hr />
                <p>
                    横浜国立大学PCサークルSCITEX,GameDev1のサイトへようこそ！<br />
                    ここでは私たちがプログラミングの勉強のためにつくったゲームを置いてあります。<br />
                </p>
            </section>
            <section>
                <h2>常盤祭2012</h2>
                <p>11/2,3,4日の常盤祭で自作ミニゲーム集CDの販売を行いました。</p>
            </section>
        </div>

        <div id="footer">
            <footer>       
                <aside>
                    <p>ご意見感想などあればうんたらかんたら</p>
                </aside>

                <p id="copyright"><small>Copyright &copy 2012 SCITEX. All right reserved.</small></p>
            </footer>
        </div>

    </div>

            <!--<canvas id="backCanvas" width="900" height="1000"></canvas>
            <script type="text/javascript">
                var canvas = $("#backCanvas");
                var context = canvas.get(0).getContext("2d");

                function resizeCanvas() {
                    originWidth = $("#backCanvas").parent().width();
                    originHeight = $("#backCanvas").parent().height();
                    $("#backCanvas").attr("width", originWidth);
                    $("#backCanvas").attr("height", originHeight);
                }

                function Circle() {
                    this.x = canvas.width() / 2;
                    this.y = canvas.height() / 2;

                    this.vX = 3;
                    this.vY = 3;

                    this.radius = 50;

                    this.update = function () {
                        this.x += this.vX;
                        this.y += this.vY;
                    }

                    this.draw = function () {
                        context.fillStyle = "rgba(255, 200, 200, 0.7)";
                        context.beginPath();
                        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                        context.closePath();
                        context.fill();
                    }
                }

                function Set() {
                    alert("gada");
                    var circle = new Circle();
                    Animation();
                }

                function Animation() {
                    context.clearRect(0, 0, canvas.width(), canvas.height());
                    circle.update();

                    if (canvas.width() < (circle.x + circle.radius) || (circle.x - circle.radius) < 0) {
                        circle.vX *= -1;
                    } if (canvas.height() < (circle.y + circle.radius) || (circle.y - circle.radius) < 0) {
                        circle.vY *= -1;
                    }

                    circle.draw();

                    setTimeout(Animation, 33);
                }

                $(document).ready(Set);
                $(window).bind("resize",resizeCanvas);
            </script>-->

</body>
</html>