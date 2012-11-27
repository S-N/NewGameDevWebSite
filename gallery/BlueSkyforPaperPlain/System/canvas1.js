$(document).ready(function() {
    //alert("uuuu");
    var canvas1 = $("#myCanvas1");
    var context1 = canvas1.get(0).getContext("2d");

    //�L�����o�X�̑傫��
    var canvasWidth1 = canvas1.width();
    var canvasHeight1 = canvas1.height();

    //�_�̑���
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
        //��ʂ̏�����
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

        
        //�_�̐�
        var cloudLength = 8;

        context1.lineWidth = 5;

        //�㉺�̉_�̕`��
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

        /* �_�̃X�N���[��,100��Animate�֐������s�������_�Ŕw�i���ŏ��̈ʒu�ɖ߂����Ƃ��J��ւ����B
          context.translate���g�����Ō��_���ړ����Ă���*/

        //�X�N���[��
        if (rotateEndFlag) {
            context1.translate(cloudvX, 0);
            countForScrollBack++;
            scrollcontrolCount++;
            scrollCount++;
        }

        //400��ڂ�Animate���̑���
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