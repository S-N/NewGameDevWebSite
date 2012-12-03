<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>

    <link href="galleryCSS.css" rel="stylesheet" type="text/css" />
    <link href="../System/mainCSS.css" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="../System/Jquery.js"></script>
    <script type="text/javascript" src="../System/titleCanvas.js"></script>
</head>
<body>
    <div id="page">
        <?php include("../header.html"); ?>

        <?php include("../sidemenu.html"); ?>

        <div id="main">
            <header id="galleryHeader">
                <h2 id="gallery">ギャラリー</h2>
                <p>今までに制作したゲームが置いてあります。</p>
            </header>
             <section>
                <h2><a href="BlueSkyforPaperPlain/index.php">Blue Sky for Paper Plain</a></h2>
                <p><img src="images/BSPP.png" /></p>
                <p>
                    東京工科大主催の<a href="http://sgf2012.hp2.jp/">Student Game Fes 2012</a>に出品させていただいたゲームです。
                    ブラウザ上でプレイできます。（IE7, Firefox16以上, Chrome推奨です。）
                </p>
                
            </section>
            
            <section>
                <h2></h2>
                <p></p>
            </section>
        </div>

        <div id="footer">
            <footer>       
                <aside>
                    <p>ご意見感想などあればうんたらかんたら</p>
                </aside>

                <?php include("../copyright.html"); ?>
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
