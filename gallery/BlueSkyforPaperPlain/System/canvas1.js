$(document).ready(function() {
    //alert("uuuu");
    var canvas1 = $("#myCanvas1");
    var context1 = canvas1.get(0).getContext("2d");

    //キャンバスの大きさ
    var canvasWidth1 = canvas1.width();
    var canvasHeight1 = canvas1.height();

    //雲の速さ
    var cloudvX = -2;

    var gameFrame = 30;

    var scrollCount = 0;
    var scrollcontrolCount = 0;
    var countForScrollBack = 0;
    var contextRotateNum = 0;

    var canRollBack = false;

    var rotateEndFlag = true;
    var contextAngle = 0;
    
    var uiTitle = $("#gameStart");
    var uiStartButton = $("button.start");
    var uiReturnButton = $("button.gameOver");


    function setUp() {
        context1.save();
        uiStartButton.click(function (e) {
            rotateEndFlag = true;
            
            scrollCount = 0;
            scrollcontrolCount = 0;
            contextRotateNum = 0;
            canRollBack = false;
            e.preventDefault();
            Animate();
        });
        return;
    }

    function Animate() {
        //画面の初期化
        context1.clearRect(0, 0, canvasWidth1, canvasHeight1);
        context1.fillStyle = "rgb(150, 150, 200)";
        context1.fillRect(-canvasWidth1, -canvasHeight1, canvasWidth1 * 3, canvasHeight1 * 3);

        context1.globalAlpha = 0.7;
        context1.fillStyle = "rgb(255, 255, 255)";
        context1.strokeStyle = "rgb(255,255,255)";

        if (scrollCount == 2000) {
            rotateEndFlag = false;
            context1.translate((canvasWidth1 / 2), (canvasHeight1 / 2));
            context1.rotate(Math.PI / 180)
            context1.translate(-(canvasWidth1 / 2), -(canvasHeight1 / 2));
            contextAngle += 1;

            if (contextAngle == 90) {
                contextAngle = 0;
                contextRotateNum++;
                if (contextRotateNum == 4) {
                    contextRotateNum = 0;
                }
                rotateEndFlag = true;
            }

            if (rotateEndFlag) {
                scrollCount = 0;

                if (contextRotateNum == 0) {
                    gameFrame -= 5;
                }
                if (gameFrame < 10) {
                    gameFrame = 10;
                }
            }
        }

        
        //雲の数
        var cloudLength = 8;

        context1.lineWidth = 5;

        //上下の雲の描画
        for (var i = -4; i < cloudLength; i++) {
            context1.beginPath();
            context1.moveTo(i*canvasWidth1/4, 0);
            context1.quadraticCurveTo((i*canvasWidth1/4)+canvasWidth1/8, canvasHeight1/4, (i+1)*canvasWidth1/4, 0);
            context1.closePath();
            context1.fill();
            context1.stroke();
        };
        for (var j = -4; j < cloudLength; j++) {
            context1.beginPath();
            context1.moveTo(j * canvasWidth1 / 4, 0);
            context1.quadraticCurveTo((j * canvasWidth1 / 4) + canvasWidth1 / 8, -(canvasHeight1 / 4), (j + 1) * canvasWidth1 / 4, 0);
            context1.closePath();
            context1.fill();
            context1.stroke();
        };

        for (var i = -4; i < cloudLength; i++) {
            context1.beginPath();
            context1.moveTo(i * canvasWidth1 / 4, canvasHeight1);
            context1.quadraticCurveTo((i * canvasWidth1 / 4) + canvasWidth1 / 8, canvasHeight1 *(5/ 4), (i + 1) * canvasWidth1 / 4, canvasHeight1);
            context1.closePath();
            context1.fill();
            context1.stroke();
        };
        for (var j = -4; j < cloudLength; j++) {
            context1.beginPath();
            context1.moveTo(j * canvasWidth1 / 4, canvasHeight1);
            context1.quadraticCurveTo((j * canvasWidth1 / 4) + canvasWidth1 / 8, canvasHeight1 * (3 / 4), (j + 1) * canvasWidth1 / 4, canvasHeight1);
            context1.closePath();
            context1.fill();
            context1.stroke();
        };
     
        context1.globalAlpha = 1.0;

        /* 雲のスクロール,100回Animate関数を実行した時点で背景を最初の位置に戻すことを繰り替えす。
          context.translateを使う事で原点が移動している*/

        //スクロール
        if (rotateEndFlag) {
            context1.translate(cloudvX, 0);
            countForScrollBack++;
            scrollcontrolCount++;
            scrollCount++;
        }

        //400回目のAnimate時の速さ
        if (scrollcontrolCount == 400) {
            context1.translate(-cloudvX * 400, 0);
            scrollcontrolCount = 0;
            countForScrollBack = 0;
        }

        uiReturnButton.click(function (e) {
            e.preventDefault();
            rotateEndFlag = false;
            canRollBack = true;
        });

        if (!rotateEndFlag && canRollBack) {
            context1.translate(-(cloudvX * countForScrollBack),0);
            context1.translate((canvasWidth1 / 2), (canvasHeight1 / 2));
            context1.rotate(-((Math.PI / 2) * contextRotateNum));
            context1.translate(-(canvasWidth1 / 2), -(canvasHeight1 / 2));
            return;
        }

        setTimeout(Animate, gameFrame);
    };

    setUp();
});