$(document).ready(function () {
    var canvas2 = $("#myCanvas2");
    var context2 = canvas2.get(0).getContext("2d");

    var canvasWidth2 = canvas2.width();
    var canvasHeight2 = canvas2.height();

    var canvas3 = $("#myCanvas3");
    var context3 = canvas3.get(0).getContext("2d");

    //////////////////////////////////////////////////////////////////////////
    //大域変数
    //////////////////////////////////////////////////////////////////////////
    //ゲームスタート
    var playGame = false;
    //ライフアップがでる確率
    var lifeRate = 3;  ///*10%
    //コンテクストの回転角度
    var contextAngle = 0;
    var contextRotateNum = 0;
    var rotateEndFlag = true;
    //矢印キーを列挙
    var arrowLeft = 74;
    var arrowUp = 73;
    var arrowDown = 75;
    var arrowRight = 76;
    //Zでショット
    var shotKeyZ = 90;
    //各配列と(あれば)その要素数の限界
    var players = new Array();
    var rectEnemys = new Array();
    var rectEnemyNums = 5;
    var waveEnemys = new Array();
    var waveEnemyNums = 5;
    var waveEnemyShots = new Array();
    var obliqueEnemys = new Array();
    var obliqueEnemyNums = 5;
    var straightEnemys = new Array();
    var straightEnemyShots = new Array();
    var shots = new Array();
    var shotNums = 10;
    var lifeUps = new Array();
    var bombs = new Array();
    //フレームレート
    var gameFrame = 30;
    ////タイムアウト
    //var repeat;
    //連射防止フラグ
    var shotBulletFlag = false;
    //敵を召喚する為のカウンター
    var enemyCount = 1;
    //前のフレームでZは押されていたか？ 0=NO 1=Yes
    var beforePushZ = 0;
    //回復アイテム存在フラグ
    var existLifeUpFlag = false;
    //死んだときフラグ
    var DeathFlag = false;
    //スコア
    var score;
    var uiScore = $("#Score");
    //ライフ
    //var hitPoint;
    //var uiHitpoint = $("#life");
    ////enemyCountを表示
    //var uiEnemyCount = $("#Ecount")
    ////配列の要素数を表示
    //var uiShots = $("#shots");
    //var uiRectE = $("#rectE");
    //var uiWaveE = $("#waveE");
    //var uiObliE = $("#obliqueE");
    //var uiStraightE = $("#straightE");

    //var uiplayStatus = $("#play");

    //サウンド
    var Titlebgm = $("#Titlebgm").get(0);
    var gameShot1 = $("#shot").get(0);
    var gameShot2 = $("#shot2").get(0);
    var gameShot3 = $("#shot3").get(0);
    var gameShot4 = $("#shot4").get(0);
    var gameShot5 = $("#shot5").get(0);
    var gameHit1 = $("#hit").get(0);
    var gameHit2 = $("#hit2").get(0);
    var gameHit3 = $("#hit3").get(0);
    var gameHit4 = $("#hit4").get(0);
    var gameHit5 = $("#hit5").get(0);
    var bodyattack1 = $("#bodyattack").get(0);
    var bodyattack2 = $("#bodyattack2").get(0);
    var bodyattack3 = $("#bodyattack3").get(0);
    var bodyattack4 = $("#bodyattack4").get(0);
    var bodyattack5 = $("#bodyattack5").get(0);
    var bodyattack6 = $("#bodyattack6").get(0);
    var bodyattack7 = $("#bodyattack7").get(0);
    var bodyattack8 = $("#bodyattack8").get(0);
    var bodyattack9 = $("#bodyattack9").get(0);
    var bodyattack10 = $("#bodyattack10").get(0);
    var bodyattack11 = $("#bodyattack11").get(0);
    var bodyattack12 = $("#bodyattack12").get(0);
    var bodyattack13 = $("#bodyattack13").get(0);
    var gameBomb1 = $("#bomb").get(0);
    var gameBomb2 = $("#bomb2").get(0);
    var gameBomb3 = $("#bomb3").get(0);
    var gameBomb4 = $("#bomb4").get(0);
    var gameBomb5 = $("#bomb5").get(0);
    var lifeup1 = $("#lifeup").get(0);
    var lifeup2 = $("#lifeup2").get(0);
    var lifeup3 = $("#lifeup3").get(0);
    var lifeup4 = $("#lifeup4").get(0);
    var lifeup5 = $("#lifeup5").get(0);
    var lifeup6 = $("#lifeup6").get(0);
    var gameMiss = $("#miss").get(0);

    var audio_shot = new ShotSound();
    var audio_hit = new HitSound();
    var audio_bomb = new BombSound();
    var audio_bodyattack = new BodyAttackSound();
    var audio_lifeup = new LifeUpSound();

    //UI
    var uiTitle = $("#gameStart");
    var uiStartButton = $("button.start");
    var uiPlay = $("#game");
    var uiGameOver = $("#gameEnd");
    var uiFinalScore = $("#finalscore");
    var uiPlayerRank = $("#playerRank");
    var uiReturnButton = $("button.gameOver");
    ///////////////////////////////////////////////////////////////////////////
    //プレイヤークラス
    ///////////////////////////////////////////////////////////////////////////
    var Player = function (x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 20;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
        this.vX = 0;
        this.vY = 0;

        this.setUpHitPoint = 600;
        this.hitPoint = this.setUpHitPoint;

        //trueの時動く falseの時止まる
        this.MoveL = false;
        this.MoveU = false;
        this.MoveD = false;
        this.MoveR = false;

        //位置更新
        this.update = function () {
            switch (contextRotateNum) {
                case 0:
                    //キーを押している時
                    if (this.MoveL) {
                        this.vX = -5;
                    }

                    if (this.MoveU) {
                        this.vY = -5;
                    }

                    if (this.MoveD) {
                        this.vY = 5;
                    }

                    if (this.MoveR) {
                        this.vX = 5;
                    }

                    if (!this.MoveL && !this.MoveR) {
                        this.vX = 0;
                    }
                    if (!this.MoveU && !this.MoveD) {
                        this.vY = 0;
                    }
                    break;

                case 1:
                    //キーを押している時
                    if (this.MoveL) {
                        this.vY = 5;
                    }

                    if (this.MoveU) {
                        this.vX = -5;
                    }

                    if (this.MoveD) {
                        this.vX = 5;
                    }

                    if (this.MoveR) {
                        this.vY = -5;
                    }

                    if (!this.MoveL && !this.MoveR) {
                        this.vY = 0;
                    }
                    if (!this.MoveU && !this.MoveD) {
                        this.vX = 0;
                    }
                    break;

                case 2:
                    //キーを押している時
                    if (this.MoveL) {
                        this.vX = 5;
                    }

                    if (this.MoveU) {
                        this.vY = 5;
                    }

                    if (this.MoveD) {
                        this.vY = -5;
                    }

                    if (this.MoveR) {
                        this.vX = -5;
                    }

                    if (!this.MoveL && !this.MoveR) {
                        this.vX = 0;
                    }
                    if (!this.MoveU && !this.MoveD) {
                        this.vY = 0;
                    }
                    break;

                case 3:
                    //キーを押している時
                    if (this.MoveL) {
                        this.vY = -5;
                    }

                    if (this.MoveU) {
                        this.vX = 5;
                    }

                    if (this.MoveD) {
                        this.vX = -5;
                    }

                    if (this.MoveR) {
                        this.vY = 5;
                    }

                    if (!this.MoveL && !this.MoveR) {
                        this.vY = 0;
                    }
                    if (!this.MoveU && !this.MoveD) {
                        this.vX = 0;
                    }
                    break;
            }



            if (player.x - player.halfWidth < 0) {
                player.x = player.halfWidth;
            } else if (player.x + player.halfWidth > canvasWidth2) {
                player.x = canvasWidth2 - player.halfWidth;
            }

            if (player.y - player.halfHeight < 0) {
                player.y = player.halfHeight;
            } else if (player.y + player.halfHeight > canvasHeight2) {
                player.y = canvasHeight2 - player.halfHeight;
            }
            
            this.x += this.vX;
            this.y += this.vY;
        }

        //プレイヤー描画メソッド
        this.draw = function () {
            context2.fillStyle = "rgb(255, 255, 255)";
            context2.beginPath();
            context2.moveTo(this.x + this.halfWidth, this.y);
            context2.lineTo(this.x - this.halfWidth, this.y + this.halfHeight);
            context2.lineTo(this.x - this.halfWidth, this.y - this.halfWidth);
            context2.closePath();
            context2.fill();
        };
    };

    //////////////////////////////////////////////////////////////////////////////
    //弾クラス
    //////////////////////////////////////////////////////////////////////////////
    var Shot = function (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.vX = 10;
        this.vY = 0;

        this.speed = 0;

        this.attack = 5;

        this.aliveFlag = true;

        //敵弾方向決定用プロパティ
        this.distance = 0;

        //描画メソッド
        this.draw = function (r,g,b) {
            context2.fillStyle = "rgb("+r+","+g+","+b+")";
            context2.beginPath();
            context2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context2.closePath();
            context2.fill();
        }

        //位置の更新
        this.update = function () {
            //Z押したら弾を飛ばす
            this.x += this.vX;
        }
    }

    //////////////////////////////////////////////////////////////////////////////
    //敵クラス
    //////////////////////////////////////////////////////////////////////////////
    var RectEnemy = function (x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.vX = -10;
        this.vY = 5;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;

        //体力
        this.hitPoint = 10;
        this.attack = 5;

        //角度
        this.angle = 0;

        //対角線の半分の長さ
        this.halfDiagonal = (Math.sqrt(2) * this.width);

        this.aliveFlag = true;

        this.score = 10;

        //位置を更新する
        this.updateX = function () {
            this.x += this.vX;
            this.centerX = this.x + this.width / 2;
        }

        this.updateYD = function () {
            this.y += this.vY;
            this.centerY = this.y + this.height / 2;
        }

        this.updateYU = function () {
            this.y -= this.vY;
            this.centerY = this.y + this.height / 2;
        }
        

        //角度の更新
        this.update = function () {
            this.angle += 5
            if (this.angle == 360) {
                this.angle = 0;
            }
        }

        //描画
        this.draw = function () {
            context2.fillStyle = "rgba(50,50,60,0.5)";
            context2.beginPath();
            context2.moveTo((this.halfDiagonal * Math.cos((Math.PI / 4) + ((Math.PI / 180) * this.angle))) + this.x, this.halfDiagonal * Math.sin((Math.PI / 4) + ((Math.PI / 180) * this.angle)) + this.y);
            context2.lineTo((this.halfDiagonal * Math.cos((Math.PI / 4) * 3 + ((Math.PI / 180) * this.angle))) + this.x, this.halfDiagonal * Math.sin((Math.PI / 4) * 3 + ((Math.PI / 180) * this.angle)) + this.y);
            context2.lineTo((this.halfDiagonal * Math.cos((Math.PI / 4) * 5 + ((Math.PI / 180) * this.angle))) + this.x, this.halfDiagonal * Math.sin((Math.PI / 4) * 5 + ((Math.PI / 180) * this.angle)) + this.y);
            context2.lineTo((this.halfDiagonal * Math.cos((Math.PI / 4) * 7 + ((Math.PI / 180) * this.angle))) + this.x, this.halfDiagonal * Math.sin((Math.PI / 4) * 7 + ((Math.PI / 180) * this.angle)) + this.y);
            context2.closePath();
            context2.fill();
        }
    }
    
    //////////////////////////////////////////////////////////////////////////////
    //波状移動敵クラス
    //////////////////////////////////////////////////////////////////////////////
    var waveEnemy = function (x, y) {
        this.x = x;
        this.y = y;
        this.aside = 30;

        this.waveTmp = 0;

        this.aliveFlag = true;

        this.score = 20;

        this.hitPoint = 15;
        this.attack = 5;

        //中心から頂点
        this.dCenterToApex = this.aside / (2*Math.sin(Math.PI / 3));
        //中心と底辺の高さ
        this.heightToBottomside = this.aside * Math.sin(Math.PI / 3) - this.dCenterToApex;
        this.vX = -10;
        this.vY = 10;

        this.shotRadius = 5;

        //位置更新メソッド
        this.update = function (tmp) {

            this.x -= 75 * (Math.PI / 180);
            this.y += 3 * Math.cos((Math.PI / 180) * tmp);

            if (tmp == 360)
                tmp = 0;

            //this.x += this.vX;
        }

        //弾発射メソッド
        this.shot = function (playerTmpX, playerTmpY) {
            var waveEshot = new Shot(this.x, this.y);
            waveEshot.attack = this.attack;
            waveEshot.speed = 20;
            var distance = Math.sqrt((waveEshot.x - player.x) * (waveEshot.x - player.x) + (waveEshot.y - player.y) * (waveEshot.y - player.y));
            waveEshot.vX = -(waveEshot.x - playerTmpX) / (distance / waveEshot.speed);
            waveEshot.vY = -(waveEshot.y - playerTmpY) / (distance / waveEshot.speed);
            waveEnemyShots.push(waveEshot);
        }

        //敵描画メソッド
        this.draw = function () {
            //alert("Hello,World!");
            context2.fillStyle = "rgb(250,200,250)";
            context2.beginPath();
            context2.moveTo(this.x + this.dCenterToApex, this.y);
            context2.lineTo(this.x - this.heightToBottomside, this.y + this.aside / 2);
            context2.lineTo(this.x - this.heightToBottomside, this.y - this.aside / 2);
            context2.moveTo(0, 0);
            context2.closePath();
            context2.fill();
        }
    }

    /////////////////////////////////////////////////////////////////////////
    ///斜め移動敵クラス
    /////////////////////////////////////////////////////////////////////////
    var obliqueEnemy = function (x, y) {
        this.x = x;
        this.y = y;
        this.vX = 0;
        this.vY = 0;
        this.speed = 800;
        this.radius = 20;
        this.score = 15;

        this.aliveFlag = true;

        this.hitPoint = 5;
        this.attack = 10;

        this.straightFlag = true;
        this.rockOnFlag = false;

        this.tmpVx = 0;
        this.tmpVy = 0;
        this.rockOn = function (playerX, playerY) {
            this.vX = 0;
            this.vY = 0;
            var dX = playerX - this.x;
            var dY = playerY - this.y;
            var distance = Math.sqrt((dX * dX) + (dY * dY));
            var angle = Math.asin(dY / distance);

            this.tmpVx = (distance * Math.cos(angle))/this.speed;
            this.tmpVy = (distance * Math.sin(angle)) / this.speed;
            this.rockOnFlag = true;
        }


        //位置移動メソッド
        this.update = function () {
            if (this.straightFlag) {
                this.vX++;
                this.x -= this.vX;
            }

            if (this.rockOnFlag) {
                this.vX += this.tmpVx;
                this.vY += this.tmpVy;
                this.x -= this.vX;
                this.y += this.vY;
            }
            
        }

        //描画メソッド
        this.draw = function () {
            context2.fillStyle = "rgb(100,50,100)";
            context2.beginPath();
            context2.moveTo(this.x, this.y + this.radius);
            context2.lineTo(this.x + this.radius, this.y);
            context2.lineTo(this.x, this.y - this.radius);
            context2.lineTo(this.x - this.radius, this.y);
            context2.closePath();
            context2.fill();

            context2.fillStyle = "rgb(100,100,150)";
            context2.beginPath();
            context2.moveTo(this.x, this.y + 10);
            context2.lineTo(this.x + 30, this.y + 20);
            context2.lineTo(this.x + 50, this.y + 40);
            context2.lineTo(this.x + 15, this.y + 30);
            context2.closePath();
            context2.fill();

            context2.fillStyle = "rgb(100,100,150)";
            context2.beginPath();
            context2.moveTo(this.x, this.y - 10);
            context2.lineTo(this.x + 30, this.y - 20);
            context2.lineTo(this.x + 50, this.y - 40);
            context2.lineTo(this.x + 15, this.y - 30);
            context2.closePath();
            context2.fill();
        }
    }

    /////////////////////////////////////////////////////////////////////////
    ///直進移動敵クラス
    /////////////////////////////////////////////////////////////////////////
    var straightEnemy = function (x, y) {
        this.x = x;
        this.y = y;
        this.vX = 5;
        this.vY = 0;
        this.attack = 3;
        this.radius = 25;

        this.aliveFlag = true;
        this.hitPoint = 5;

        this.score = 5;

        this.update = function () {
            this.x -= this.vX;
        }

        this.shot = function (playerTmpX, playerTmpY) {
            var straightEshot = new Shot(this.x, this.y);
            straightEshot.attack = this.attack;
            straightEshot.speed = 20;
            var distance = Math.sqrt((straightEshot.x - player.x) * (straightEshot.x - player.x) + (straightEshot.y - player.y) * (straightEshot.y - player.y));
            straightEshot.vX = -(straightEshot.x - playerTmpX) / (distance / straightEshot.speed);
            straightEshot.vY = -(straightEshot.y - playerTmpY) / (distance / straightEshot.speed);
            straightEnemyShots.push(straightEshot);
        }

        this.draw = function() {
            context2.fillStyle = "rgb(200, 150, 200)";
            context2.beginPath();
            context2.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            //context2.arc(100, 100, 25, 0, Math.PI * 2, false);
            context2.closePath();
            context2.fill();
        }
    }

    /////////////////////////////////////////////////////////////////////////
    ////回復アイテムクラス
    /////////////////////////////////////////////////////////////////////////
    var LifeUp = function (x, y) {
        this.radius = 10;
        this.x = x;
        this.y = y;

        this.vX = 1;
        this.vY = 1;

        this.lifeUp = 100;
        this.score = 3;

        this.update = function () {
            switch (contextRotateNum) {
                case 0:
                    this.y += this.vY;
                    break;

                case 1:
                    this.x += this.vX;
                    break;

                case 2:
                    this.y -= this.vY;
                    break;

                case 3:
                    this.x -= this.vX;
                    break;
            }
        }

        this.draw = function () {
            switch (contextRotateNum) {
                case 0:
                    context2.fillStyle = "rgb(255, 200, 200)";
                    context2.beginPath();
                    context2.arc(this.x + this.radius, this.y, this.radius, 0, Math.PI, true);
                    context2.arc(this.x - this.radius, this.y, this.radius, 0, Math.PI, true);
                    context2.moveTo(this.x - (this.radius * 2), this.y);
                    context2.lineTo(this.x, this.y + (this.radius * 3));
                    context2.lineTo(this.x + (this.radius * 2), this.y);
                    context2.closePath();
                    context2.fill();
                    break;

                case 1:
                    context2.fillStyle = "rgb(255, 200, 200)";
                    context2.beginPath();
                    context2.arc(this.x, this.y + this.radius, this.radius, Math.PI/2, Math.PI*(3/2), false);
                    context2.arc(this.x, this.y - this.radius, this.radius, Math.PI / 2, Math.PI * (3 / 2), false);
                    context2.moveTo(this.x, this.y - (this.radius * 2));
                    context2.lineTo(this.x + (this.radius * 3), this.y);
                    context2.lineTo(this.x, this.y + (this.radius * 2));
                    context2.closePath();
                    context2.fill();
                    break;

                case 2:
                    context2.fillStyle = "rgb(255, 200, 200)";
                    context2.beginPath();
                    context2.arc(this.x - this.radius, this.y, this.radius, 0, Math.PI, false);
                    context2.arc(this.x + this.radius, this.y, this.radius, 0, Math.PI, false);
                    context2.moveTo(this.x + (this.radius * 2), this.y);
                    context2.lineTo(this.x, this.y - (this.radius * 3));
                    context2.lineTo(this.x - (this.radius * 2), this.y);
                    context2.closePath();
                    context2.fill();
                    break;

                case 3:
                    context2.fillStyle = "rgb(255, 200, 200)";
                    context2.beginPath();
                    context2.arc(this.x, this.y - this.radius, this.radius, Math.PI / 2, Math.PI * (3 / 2), true);
                    context2.arc(this.x, this.y + this.radius, this.radius, Math.PI / 2, Math.PI * (3 / 2), true);
                    context2.moveTo(this.x, this.y + (this.radius * 2));
                    context2.lineTo(this.x - (this.radius * 3), this.y);
                    context2.lineTo(this.x, this.y - (this.radius * 2));
                    context2.closePath();
                    context2.fill();
                    break;
            }

        }
    }

    /////////////////////////////////////////////////////////////////////////
    ////爆発クラス
    /////////////////////////////////////////////////////////////////////////
    var Bomb = function (x, y, longRadius, shortRadius) {
        this.x = x;
        this.y = y;
        this.longRadius = longRadius;
        this.shortRadius = shortRadius;
        this.alpha = 1.00;

        //HITフラグ
        this.hitFlag = false;
        //撃墜フラグ
        this.shootDownFlag = false;

        //トゲとトゲの間の角度は60°
        this.draw = function (lR, sR) {
            this.longRadius += lR;
            this.shortRadius += sR;

            context2.fillStyle = "rgba(255,150,100,"+this.alpha.toString()+")";
            context2.beginPath();
            context2.moveTo(this.x + this.longRadius, this.y);
            context2.lineTo(this.x + (Math.cos(Math.PI / 6) * this.shortRadius), this.y + (Math.sin(Math.PI / 6) * this.shortRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 2) * this.longRadius), this.y + (Math.sin((Math.PI / 6) * 2) * this.longRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 3) * this.shortRadius), this.y + (Math.sin((Math.PI / 6) * 3) * this.shortRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 4) * this.longRadius), this.y + (Math.sin((Math.PI / 6) * 4) * this.longRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 5) * this.shortRadius), this.y + (Math.sin((Math.PI / 6) * 5) * this.shortRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 6) * this.longRadius), this.y + (Math.sin((Math.PI / 6) * 6) * this.longRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 7) * this.shortRadius), this.y + (Math.sin((Math.PI / 6) * 7) * this.shortRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 8) * this.longRadius), this.y + (Math.sin((Math.PI / 6) * 8) * this.longRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 9) * this.shortRadius), this.y + (Math.sin((Math.PI / 6) * 9) * this.shortRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 10) * this.longRadius), this.y + (Math.sin((Math.PI / 6) * 10) * this.longRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 11) * this.shortRadius), this.y + (Math.sin((Math.PI / 6) * 11) * this.shortRadius));
            context2.lineTo(this.x + (Math.cos((Math.PI / 6) * 12) * this.longRadius), this.y + (Math.sin((Math.PI / 6) * 12) * this.longRadius));
            context2.closePath();
            context2.fill();
        }
    }

    
    function setUp() {
        
        uiTitle.show();
        uiPlay.hide();
        uiGameOver.hide();

        uiStartButton.click(function (e) {
            e.preventDefault();
            uiTitle.hide();
            playGame = true;
            
            startMove();
        });
    }
        

    function startMove() {
        context2.clearRect(0, 0, canvasWidth2, canvasHeight2);

        context2.translate((canvasWidth2 / 2), (canvasHeight2 / 2));
        context2.rotate(-((Math.PI / 2)*contextRotateNum));
        context2.translate(-(canvasWidth2 / 2), -(canvasHeight2 / 2));
        contextRotateNum = 0;

        Titlebgm.currentTime = 0;
        Titlebgm.play();

        players = new Array();
        rectEnemys = new Array();
        rectEnemyNums = 5;
        waveEnemys = new Array();
        waveEnemyNums = 5;
        waveEnemyShots = new Array();
        obliqueEnemys = new Array();
        obliqueEnemyNums = 5;
        straightEnemys = new Array();
        straightEnemyShots = new Array();
        shots = new Array();
        shotNums = 10;
        lifeUps = new Array();
        bombs = new Array();
        lifeRate = 4;
        gameFrame = 30;
        
        enemyCount = 0;

        DeathFlag = false;

        uiPlay.show();
        //スコアリセット
        score = 0;
        uiScore.html(score);
        //プレイヤー作成
        player = new Player(canvasWidth2 / 2, canvasHeight2 / 2);
        players.push(player);

        $(window).keydown(function (e) {
            var keyCode = e.keyCode;

            //移動フラグon
            if (keyCode == arrowRight) {
                player.MoveR = true;
            }
            if (keyCode == arrowUp) {
                player.MoveU = true;
            }
            if (keyCode == arrowDown) {
                player.MoveD = true;
            }
            if (keyCode == arrowLeft) {
                player.MoveL = true;
            }

            //ショットイベント
            if (keyCode == shotKeyZ) {
                shotBulletFlag = true;
            }
        });

        $(window).keyup(function (e) {
            var keyCode = e.keyCode;

            //移動フラグoff
            if (keyCode == arrowRight) {
                player.MoveR = false;
            }
            if (keyCode == arrowUp) {
                player.MoveU = false;
            }
            if (keyCode == arrowDown) {
                player.MoveD = false;
            }
            if (keyCode == arrowLeft) {
                player.MoveL = false;
            }

            //ショットイベント
            if (keyCode == shotKeyZ) {
                shotBulletFlag = false;
                beforePushZ = 0;
            }

        });

        gameMove();
    }

    function gameMove() {
        context2.clearRect(0, 0, canvasWidth2, canvasHeight2);
        context3.clearRect(0, 0, canvas3.width(), canvas3.height());

        if (lifeUps.length == 0) {
            existLifeUpFlag = false;
        }
        if (player.hitPoint > player.setUpHitPoint) {
            player.hitPoint = player.setUpHitPoint;
        }

        //体力ゲージを表示
        var text = "LIFE :";
        context3.fillStyle = "black";
        context3.font = "20px Comic Sans MS";
        context3.fillText(text, 10, canvasHeight2 - 20);

        var LifeGageRate = player.hitPoint / player.setUpHitPoint;
        var LifeLength = canvasWidth2/2;
        if (player.hitPoint <= (player.setUpHitPoint / 2)) {
            context3.fillStyle = "rgb(200, 200, 100)";
            LifeLength *= LifeGageRate;
        } if (player.hitPoint <= (player.setUpHitPoint / 4)) {
            context3.fillStyle = "rgb(255, 100, 100)";
            LifeLength *= LifeGageRate;
        } if (player.hitPoint > (player.setUpHitPoint/2)) {
            context3.fillStyle = "rgb(100, 200, 100)";
            LifeLength *= LifeGageRate;
        }
        context3.fillRect(80, canvasHeight2 - 35, LifeLength, 20);

        //残りライフ
        //uiHitpoint.html(player.hitPoint);

        ////enemyCountを表示
        //uiEnemyCount.html(enemyCount);

        //uiShots.html(shots.length);
        //uiRectE.html(rectEnemys.length);
        //uiWaveE.html(waveEnemys.length);
        //uiObliE.html(obliqueEnemys.length);
        //uiplayStatus.html(gameFrame);
        //uiStraightE.html(straightEnemys.length);

        //プレイヤー位置の更新
        player.update();
        
        ///////////////////////////////敵発生ルーチン////////////////////////////////////////////////////////////////////////////////////////////
        //フレーム数リセットと画面の回転
        if (enemyCount == 2000) {
            rotateEndFlag = false;
            context2.translate((canvasWidth2/2), (canvasHeight2/2));
            context2.rotate(Math.PI / 180)
            context2.translate(-(canvasWidth2/2), -(canvasHeight2/2));
            contextAngle += 1;

            if (contextAngle == 90) {
                contextAngle = 0;
                contextRotateNum++
                if (contextRotateNum == 4) {
                    contextRotateNum = 0;
                }
                rotateEndFlag = true;
            }

            if (rotateEndFlag) {
                enemyCount = 1;
                if (contextRotateNum == 0) {
                    gameFrame -= 5;
                }
                if (gameFrame < 10) {
                    gameFrame = 10;
                }

                if (lifeRate > 1) {
                    --lifeRate;
                } else if (lifeRate <= 1) {
                    lifeRate -= 0.5;
                } else if (lifeRate == 0) {
                    lifeRate = 0.05;
                }
            }
        }

        //直進敵の作成
        if (enemyCount == 100 || enemyCount == 120 || enemyCount == 140) {
            var X = canvasWidth2 + 60;
            var Y = canvasHeight2 * (7 / 8);

           
            var enemy = new straightEnemy(X, Y);
            straightEnemys.push(enemy);
            
        }

        if (enemyCount == 200 || enemyCount == 220 || enemyCount == 240) {
            var X = canvasWidth2 + 60;
            var Y = canvasHeight2 * (1 / 8);

           
            var enemy = new straightEnemy(X, Y);
            straightEnemys.push(enemy);
            
        }

        //四角敵の作成
        if (enemyCount == 150) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 / 8;

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        if (enemyCount == 250) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 * (7/8);

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        //波状敵の作成
        if (enemyCount == 300 || enemyCount == 350) {
            var plmiCheck = Math.random() * 2;
            var WenemyX = canvasWidth2 + 50;
            if (plmiCheck <= 1) {
                var WenemyY = (canvasHeight2 / 2) - (100 * Math.random());
            } else if (plmiCheck > 1) {
                var WenemyY = (canvasHeight2 / 2) + (100 * Math.random());
            }
            var wave = new waveEnemy(WenemyX, WenemyY);
            waveEnemys.push(wave);
        }

        //直進的の作成
        if (enemyCount == 400 || enemyCount == 420 || enemyCount == 440) {
            var X = canvasWidth2 + 60;
            var Y = canvasHeight2 / 2;

            var enemy = new straightEnemy(X, Y);
            straightEnemys.push(enemy);
        }

        //斜め敵の作成
        if (enemyCount == 450 || enemyCount == 470 || enemyCount == 490 || enemyCount % 100 == 510 || enemyCount % 100 == 530) {
            var obque = new obliqueEnemy(canvas2.width() + 50, 0);
            obliqueEnemys.push(obque);
        }

        if (enemyCount == 460 || enemyCount == 480 || enemyCount == 500 || enemyCount % 100 == 520 || enemyCount % 100 == 540) {
            var obque = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 - 40);
            obliqueEnemys.push(obque);
        }

        //四角敵の作成
        if (enemyCount == 560 || enemyCount == 580 || enemyCount == 630 || enemyCount == 650) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 / 8;

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        if (enemyCount == 550 || enemyCount == 570 || enemyCount == 620 || enemyCount == 640) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 * (7 / 8);

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        //直進敵
        if (enemyCount == 540 || enemyCount == 545 || enemyCount == 550 || enemyCount == 555 || enemyCount == 560 || enemyCount == 565 || enemyCount == 570 || enemyCount == 615 || enemyCount == 620 || enemyCount == 625 || enemyCount == 630 || enemyCount == 635 || enemyCount == 640 || enemyCount == 645 || enemyCount == 650) {

            var X = canvasWidth2 + 60;
            var Y = canvasHeight2 / 2;


            var enemy = new straightEnemy(X, Y);
            straightEnemys.push(enemy);
        }


        //斜め敵
        if (enemyCount <= 750 && enemyCount >= 650 && (enemyCount / 10) % 2 == 0) {
            for (var i = 0; i < 5; i++) {
                var obque = new obliqueEnemy(canvas2.width() + 50, 0);
                obliqueEnemys.push(obque);
            }

        }

        if (enemyCount <= 750 && enemyCount >= 650 && (enemyCount / 10) % 2 == 1) {
            for (var i = 0; i < 5; i++) {
                var obque = new obliqueEnemy(canvas2.width() + 50, canvasHeight2-40);
                obliqueEnemys.push(obque);
            }

        }

        //波状敵の作成
        if (enemyCount == 660 || enemyCount == 680 || enemyCount == 700) {
            var plmiCheck = Math.random() * 2;
            var WenemyX = canvasWidth2 + 50;
            if (plmiCheck <= 1) {
                var WenemyY = (canvasHeight2 / 2) - 100;
            } else if (plmiCheck > 1) {
                var WenemyY = (canvasHeight2 / 2) + 100;
            }
            var wave = new waveEnemy(WenemyX, WenemyY);
            waveEnemys.push(wave);
        }
        
        //四角敵の作成
        if (enemyCount == 800 || enemyCount == 900 || enemyCount == 1000) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 / 8;

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        if (enemyCount == 800 || enemyCount == 900 || enemyCount == 1000) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 * (7 / 8);

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        //斜め敵
        if (enemyCount == 850) {
            var obque = new obliqueEnemy(canvas2.width() + 50, 0);
            obliqueEnemys.push(obque);
            var obqueB = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 - 40);
            obliqueEnemys.push(obque);
            obliqueEnemys.push(obqueB);
        }

        if (enemyCount == 950) {
            var obque = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 / 8);
            obliqueEnemys.push(obque);
            var obqueB = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 * (6 / 8));
            obliqueEnemys.push(obque);
            obliqueEnemys.push(obqueB);
        }

        if (enemyCount == 1050) {
            var obque = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 * (2 / 8));
            obliqueEnemys.push(obque);
            var obqueB = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 * (5 / 8));
            obliqueEnemys.push(obque);
            obliqueEnemys.push(obqueB);
        }

        //波状敵の作成
        if (enemyCount <= 1300 && enemyCount >=1100 && enemyCount % 20 == 0) {
            var plmiCheck = Math.random() * 2;
            var WenemyX = canvasWidth2 + 50;
            
            var WenemyY1 = (canvasHeight2 / 2) - 100;
            var WenemyY2 = (canvasHeight2 / 2) + 100;
            
            var wave1 = new waveEnemy(WenemyX, WenemyY1);
            waveEnemys.push(wave1);
            var wave2 = new waveEnemy(WenemyX, WenemyY2);
            waveEnemys.push(wave2);
        }

        //直進敵
        if (enemyCount <=1350 && enemyCount>=1500 && enemyCount%30 == 0) {
            var X = canvasWidth2 + 60;
            var Y1 = canvasHeight2 * (2 / 5);
            var Y2 = canvasHeight2 * (4 / 5);

            var enemy1 = new straightEnemy(X, Y1);
            straightEnemys.push(enemy1);
            var enemy2 = new straightEnemy(X, Y2);
            straightEnemys.push(enemy2);
        }

        //四角敵の作成
        if (enemyCount == 1350 || enemyCount == 1450 || enemyCount == 1550) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 / 8;

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        if (enemyCount == 1350 || enemyCount == 1450 || enemyCount == 1550) {
            var enemyX = canvasWidth2 + 50;
            var enemyY = canvasHeight2 * (7 / 8);

            var enemy = new RectEnemy(enemyX, enemyY);
            rectEnemys.push(enemy);
        }

        //斜め敵の作成
        if (enemyCount <= 1800 && enemyCount >= 1550 && (enemyCount/10) % 2 == 0) {
            var obque = new obliqueEnemy(canvas2.width() + 50, 0);
            obliqueEnemys.push(obque);
        }

        if (enemyCount <= 1800 && enemyCount >= 1550 && (enemyCount / 10) % 2 == 1) {
            var obque = new obliqueEnemy(canvas2.width() + 50, canvasHeight2 - 40);
            obliqueEnemys.push(obque);
        }

        //直進敵
        if (enemyCount <= 1800 && enemyCount >= 1550 && (enemyCount/10) % 2 == 0) {
            var X = canvasWidth2 + 60;
            var Y1 = canvasHeight2 * (1 / 5);
            var Y2 = canvasHeight2 * (3 / 5);
            var Y3 = canvasHeight2 * (2 / 5);

            var enemy1 = new straightEnemy(X, Y1);
            straightEnemys.push(enemy1);
            var enemy2 = new straightEnemy(X, Y2);
            straightEnemys.push(enemy2);
            var enemy3 = new straightEnemy(X, Y3);
            straightEnemys.push(enemy3);
        }

        //弾を撃つ
        if (shotBulletFlag == true && beforePushZ == 0 && shots.length < shotNums) {
            audio_shot.play();
            var shot = new Shot(player.x, player.y);
            shots.push(shot);
            beforePushZ = 1;
        }

        //敵弾作成
        if (enemyCount % 50 == 0 && waveEnemys.length > 0) {
            playerTmpX = player.x;
            playerTmpY = player.y;
            for (var i = 0; i < waveEnemys.length; i++) {
                audio_shot.play();
                waveEnemys[i].shot(playerTmpX, playerTmpY);
            }
        }

        if (enemyCount % 50 == 0 && straightEnemys.length > 0) {
            playerTmpX = player.x;
            playerTmpY = player.y;
            for (var i = 0; i < straightEnemys.length; i++) {
                audio_shot.play();
                straightEnemys[i].shot(playerTmpX, playerTmpY);
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //四角敵の移動
        for (var k = 0; k < rectEnemys.length; k++) {
            rectEnemys[k].updateX();
            rectEnemys[k].update();
            if ((rectEnemys[k].y + rectEnemys[k].height / 2) < player.y) {
                rectEnemys[k].updateYD();
            } else if ((rectEnemys[k].y + rectEnemys[k].height / 2) > player.y + 10) {
                rectEnemys[k].updateYU();
            }

            //画面外の敵を消す
            if ((rectEnemys[k].x + rectEnemys[k].width) < 0) {
                rectEnemys.splice(k, 1);
                --k;
                continue;
            }

            //プレイヤーとの衝突判定
            var playerdX = player.x - (rectEnemys[k].x + rectEnemys[k].width / 2);
            var playerdY = player.y - (rectEnemys[k].y + rectEnemys[k].height / 2);
            var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

            //あたったらおわり
            if (playerDistance < player.halfWidth + ((player.halfHeight * Math.sqrt(2)) / 2)) {
                player.hitPoint -= rectEnemys[k].attack;

                audio_bodyattack.play();
                
                if (!DeathFlag) {
                    DeathCheck();
                }
            }
        }

        //波状敵の移動
        for (var k = 0; k < waveEnemys.length; k++) {
            waveEnemys[k].update(waveEnemys[k].waveTmp);
            waveEnemys[k].waveTmp++;

            //画面外の敵を消す
            if ((waveEnemys[k].x + waveEnemys[k].dCenterToApex) < 0) {
                waveEnemys.splice(k, 1);
                --k;
                continue;
            }

            //プレイヤーとの衝突判定
            var playerdX = player.x - waveEnemys[k].x;
            var playerdY = player.y - waveEnemys[k].y;
            var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

            //あたったらおわり
            if (playerDistance < player.halfWidth + waveEnemys[k].dCenterToApex) {
                player.hitPoint -= waveEnemys[k].attack;
                
                audio_bodyattack.play();

                if (!DeathFlag) {
                    DeathCheck();
                }
            }
        }

        //波状移動敵弾の移動と衝突判定
        for (var k = 0; k < waveEnemyShots.length; k++) {
            waveEnemyShots[k].x += waveEnemyShots[k].vX;
            waveEnemyShots[k].y += waveEnemyShots[k].vY;

            //画面外の弾を消す
            if (waveEnemyShots[k].x + waveEnemyShots[k].radius < 0) {
                waveEnemyShots.shift();
                --k;
                continue;
            }

            //プレイヤーとの衝突判定
            var playerdX = player.x - waveEnemyShots[k].x;
            var playerdY = player.y - waveEnemyShots[k].y;
            var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

            if (playerDistance < player.halfWidth + waveEnemyShots[k].radius) {
                player.hitPoint -= waveEnemyShots[k].attack;
                var lR = 5;
                var sR = 3;

                //爆発を作成
                var bomb = new Bomb(waveEnemyShots[k].x, waveEnemyShots[k].y, lR, sR);
                bomb.hitFlag = true;
                bombs.push(bomb);

                waveEnemyShots[k].aliveFlag = false;

                //音の再生
                audio_hit.play();

                if (!DeathFlag) {
                    DeathCheck();
                }
            }

            //あたった弾を消す
            if (!waveEnemyShots[k].aliveFlag) {
                waveEnemyShots.splice(k, 1);
                --k;
                continue;
            }
        }

        //斜め移動敵の移動
        for (var k = 0; k < obliqueEnemys.length; k++) {
            obliqueEnemys[k].update();
            if (obliqueEnemys[k].x < (canvas2.width() * (7 / 8)) && !obliqueEnemys[k].rockOnFlag) {
                obliqueEnemys[k].straightFlag = false;
                obliqueEnemys[k].rockOn(player.x, player.y);
            }

            //画面外の敵を消す
            if ((obliqueEnemys[k].x + obliqueEnemys[k].radius) < 0) {
                obliqueEnemys.splice(k, 1);
                --k;
                continue;
            }

            //プレイヤーとの衝突判定
            var playerdX = player.x - obliqueEnemys[k].x;
            var playerdY = player.y - obliqueEnemys[k].y;
            var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

            //当たったらおわり
            if (playerDistance < (obliqueEnemys[k].radius + player.halfWidth)) {
                player.hitPoint -= obliqueEnemys[k].attack;
                
                audio_bodyattack.play();
               
                if (!DeathFlag) {
                    DeathCheck();
                }
            }

        }

        //直進敵の移動
        for (var k = 0; k < straightEnemys.length; k++) {
            straightEnemys[k].update();

            //画面外の敵を消す
            if ((straightEnemys[k].x + straightEnemys[k].radius) < 0) {
                straightEnemys.splice(k, 1);
                --k;
                continue;
            }

            //プレイヤーとの衝突判定
            var playerdX = player.x - straightEnemys[k].x;
            var playerdY = player.y - straightEnemys[k].y;
            var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

            //当たったらおわり
            if (playerDistance < (straightEnemys[k].radius + player.halfWidth)) {
                player.hitPoint -= straightEnemys[k].attack;
                
                audio_bodyattack.play();
                
                if (!DeathFlag) {
                    DeathCheck();
                }
            }
        }

        //直進敵弾の移動
        for (var k = 0; k < straightEnemyShots.length; k++) {
            straightEnemyShots[k].x += straightEnemyShots[k].vX;
            straightEnemyShots[k].y += straightEnemyShots[k].vY;

            //画面外の弾を消す
            if (straightEnemyShots[k].x + straightEnemyShots[k].radius < 0) {
                straightEnemyShots.shift();
                --k;
                continue;
            }

            //プレイヤーとの衝突判定
            var playerdX = player.x - straightEnemyShots[k].x;
            var playerdY = player.y - straightEnemyShots[k].y;
            var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

            if (playerDistance < player.halfWidth + straightEnemyShots[k].radius) {
                player.hitPoint -= straightEnemyShots[k].attack;
                var lR = 5;
                var sR = 3;

                //爆発を作成
                var bomb = new Bomb(straightEnemyShots[k].x, straightEnemyShots[k].y, lR, sR);
                bomb.hitFlag = true;
                bombs.push(bomb);

                straightEnemyShots[k].aliveFlag = false;

                //音の再生
                audio_hit.play();

                if (!DeathFlag) {
                    DeathCheck();
                }
            }

            //あたった弾を消す
            if (!straightEnemyShots[k].aliveFlag) {
                straightEnemyShots.splice(k, 1);
                --k;
                continue;
            }
        }

        //回復アイテムの移動
        if (existLifeUpFlag) {
            for (var i = 0; i < lifeUps.length; i++) {
                lifeUps[i].update();

                //画面外のライフアップを消す
                if (lifeUps[i].y - lifeUps[i].radius > canvasHeight2) {
                    lifeUps.splice(i, 1);
                    --i;
                    continue;
                }

                if (lifeUps[i].y + lifeUps[i].radius < 0) {
                    lifeUps.splice(i, 1);
                    --i;
                    continue;
                }

                if (lifeUps[i].x - lifeUps[i].radius > canvasWidth2) {
                    lifeUps.splice(i, 1);
                    --i;
                    continue;
                }

                if (lifeUps[i].x + lifeUps[i].radius < 0) {
                    lifeUps.splice(i, 1);
                    --i;
                    continue;
                }

                //プレイヤーとの衝突判定
                var playerdX = player.x - lifeUps[i].x;
                var playerdY = player.y - lifeUps[i].y;
                var playerDistance = Math.sqrt((playerdX * playerdX) + (playerdY * playerdY));

                if (playerDistance < player.halfWidth + ((lifeUps[i].radius) * 2)) {
                    player.hitPoint += lifeUps[i].lifeUp;
                    uiScore.html(score += lifeUps[i].score);
                    audio_lifeup.play();
                    lifeUps.splice(i, 1);
                    --i;
                    continue;
                }
            }
        }

        //弾の移動と衝突判定
        for (var i = 0; i < shots.length; i++) {
            shots[i].update();

            //画面外の弾を消す
            if (shots[i].x + shots[i].radius > canvasWidth2) {
                shots.shift();
                --i;
                continue;
            }

            //四角敵あたり判定
            for (var r = 0; r < rectEnemys.length; r++) {
                var dX = shots[i].x - rectEnemys[r].centerX;
                var dY = shots[i].y - rectEnemys[r].centerY;
                var distance = Math.sqrt((dX * dX) + (dY * dY));

                if (distance < (rectEnemys[r].width + shots[i].radius)) {
                    rectEnemys[r].hitPoint -= shots[i].attack;

                    if (rectEnemys[r].hitPoint > 0) {

                        var lR = 5;
                        var sR = 3;

                        //爆発を作成
                        var bomb = new Bomb(shots[i].x, shots[i].y, lR, sR);
                        bomb.hitFlag = true;
                        bombs.push(bomb);

                        shots[i].aliveFlag = false;

                        //音の再生
                        audio_hit.play();

                        break;
                    }

                    if (rectEnemys[r].hitPoint <= 0) {
                        var lR = 30;
                        var sR = 5;

                        //爆発を作成
                        var bomb = new Bomb(rectEnemys[r].x, rectEnemys[r].y, lR, sR);
                        bomb.shootDownFlag = true;
                        bombs.push(bomb);

                        ToBeOrNotToBe(rectEnemys[r].x,rectEnemys[r].y);

                        audio_bomb.play();

                        shots[i].aliveFlag = false;
                        rectEnemys[r].aliveFlag = false;

                        //スコアプラス
                        uiScore.html(score += rectEnemys[r].score);
                        //配列から削除
                        rectEnemys.splice(r, 1);
                        break;        //配列から敵を削除してfor文を抜ける
                    }
                }
            }

            //波状敵あたり判定
            for (var r = 0; r < waveEnemys.length; r++) {
                var dX = shots[i].x - waveEnemys[r].x;
                var dY = shots[i].y - waveEnemys[r].y;
                var distance = Math.sqrt((dX * dX) + (dY * dY));

                if (distance < (waveEnemys[r].heightToBottomside + shots[i].radius)) {
                    waveEnemys[r].hitPoint -= shots[i].attack;

                    if (waveEnemys[r].hitPoint > 0) {

                        var wlR = 5;
                        var wsR = 3;

                        //爆発を作成
                        var bomb = new Bomb(shots[i].x, shots[i].y, wlR, wsR);
                        bomb.hitFlag = true;
                        bombs.push(bomb);

                        shots[i].aliveFlag = false;

                        //音の再生
                        audio_hit.play();

                        break;
                    }

                    if (waveEnemys[r].hitPoint <= 0) {

                        var lR = 30;
                        var sR = 5;

                        //爆発を作成
                        var bomb = new Bomb(waveEnemys[r].x, waveEnemys[r].y, lR, sR);
                        bomb.shootDownFlag = true;
                        bombs.push(bomb);

                        ToBeOrNotToBe(waveEnemys[r].x, waveEnemys[r].y);

                        audio_bomb.play();

                        shots[i].aliveFlag = false;
                        waveEnemys[r].aliveFlag = false;

                        //スコアプラス
                        uiScore.html(score += waveEnemys[r].score);
                        //配列から削除
                        waveEnemys.splice(r, 1);
                        break;        //配列から敵を削除してfor文を抜ける
                    }
                }
            }

            //斜め敵あたり判定
            for (var r = 0; r < obliqueEnemys.length; r++) {
                var dX = shots[i].x - obliqueEnemys[r].x;
                var dY = shots[i].y - obliqueEnemys[r].y;
                var distance = Math.sqrt((dX * dX) + (dY * dY));

                if (distance < (obliqueEnemys[r].radius + shots[i].radius)) {
                    obliqueEnemys[r].hitPoint -= shots[i].attack;

                    if (obliqueEnemys[r].hitPoint > 0) {

                        var olR = 5;
                        var osR = 3;

                        //爆発を作成
                        var bomb = new Bomb(shots[i].x, shots[i].y, olR, osR);
                        bomb.hitFlag = true;
                        bombs.push(bomb);

                        shots[i].aliveFlag = false;

                        //音の再生
                        audio_hit.play();

                        break;
                    }

                    if (obliqueEnemys[r].hitPoint <= 0) {

                        var lR = 30;
                        var sR = 5;

                        //爆発を作成
                        var bomb = new Bomb(obliqueEnemys[r].x, obliqueEnemys[r].y, lR, sR);
                        bomb.shootDownFlag = true;
                        bombs.push(bomb);

                        ToBeOrNotToBe(obliqueEnemys[r].x, obliqueEnemys[r].y);

                        audio_bomb.play();

                        shots[i].aliveFlag = false;
                        obliqueEnemys[r].aliveFlag = false;

                        //スコアプラス
                        uiScore.html(score += obliqueEnemys[r].score);
                        //配列から削除
                        obliqueEnemys.splice(r, 1);
                        break;        //配列から敵を削除してfor文を抜ける
                    }
                }
            }

            //直進敵あたり判定
            for (var r = 0; r < straightEnemys.length; r++) {
                var dX = shots[i].x - straightEnemys[r].x;
                var dY = shots[i].y - straightEnemys[r].y;
                var distance = Math.sqrt((dX * dX) + (dY * dY));

                if (distance < (straightEnemys[r].radius + shots[i].radius)) {
                    straightEnemys[r].hitPoint -= shots[i].attack;

                    if (straightEnemys[r].hitPoint > 0) {

                        var olR = 5;
                        var osR = 3;

                        //爆発を作成
                        var bomb = new Bomb(shots[i].x, shots[i].y, olR, osR);
                        bomb.hitFlag = true;
                        bombs.push(bomb);

                        shots[i].aliveFlag = false;

                        //音の再生
                        audio_hit.play();

                        break;
                    }

                    if (straightEnemys[r].hitPoint <= 0) {

                        var lR = 30;
                        var sR = 5;

                        //爆発を作成
                        var bomb = new Bomb(straightEnemys[r].x, straightEnemys[r].y, lR, sR);
                        bomb.shootDownFlag = true;
                        bombs.push(bomb);

                        ToBeOrNotToBe(straightEnemys[r].x, straightEnemys[r].y);

                        audio_bomb.play();

                        shots[i].aliveFlag = false;
                        straightEnemys[r].aliveFlag = false;

                        //スコアプラス
                        uiScore.html(score += straightEnemys[r].score);
                        //配列から削除
                        straightEnemys.splice(r, 1);
                        break;        //配列から敵を削除してfor文を抜ける
                    }
                }
            }

            //敵にあたらなかった弾を描く、あたった弾を配列から削除してその分iをずらす
            if (shots[i].aliveFlag) {
                shots[i].draw(255, 0, 0);
            } else {
                shots.splice(i, 1);
                --i;
                continue;
            }
        }



        //四角敵の描画
        for (var k = 0; k < rectEnemys.length; k++) {
            if (rectEnemys[k].aliveFlag)
                rectEnemys[k].draw();
        }

        //波状敵の描画
        for (var k = 0; k < waveEnemys.length; k++) {
            if (waveEnemys[k].aliveFlag)
                waveEnemys[k].draw();
            //alert("かいたお(´・ω・｀)");
        }

        //波状敵弾の描画
        for (var k = 0; k < waveEnemyShots.length; k++) {
            waveEnemyShots[k].draw(0, 0, 255);
        }

        //斜め移動敵の描画
        for (var k = 0; k < obliqueEnemys.length; k++) {
            if (obliqueEnemys[k].aliveFlag)
                obliqueEnemys[k].draw();
        }

        //直進敵弾の描画
        for (var k = 0; k < straightEnemyShots.length; k++) {
            straightEnemyShots[k].draw(0, 0, 255);
        }

        //直進敵の描画
        for (var k = 0; k < straightEnemys.length; k++) {
            if (straightEnemys[k].aliveFlag) {
                //alert("書いたお(´・ω・｀)");
                straightEnemys[k].draw();
            }
        }

        //回復アイテムの描画
        if (existLifeUpFlag) {
            for (var k = 0; k < lifeUps.length; k++) {
                lifeUps[k].draw();
            }
        }

        //爆発の描画
        for (var b = 0; b < bombs.length; b++) {
            if (bombs[b].hitFlag) {
                bombs[b].draw(3, 1);
                bombs[b].alpha -= 0.05;

                if (bombs[b].longRadius > 30) {
                    bombs.splice(b, 1);
                    --b;
                    continue;
                }
            }

            if (bombs[b].shootDownFlag) {
                bombs[b].longRadius += 5;
                bombs[b].shortRadius += 5;
                bombs[b].draw(5, 5);
                bombs[b].alpha -= 0.05;

                if (bombs[b].longRadius > 100) {
                    bombs.splice(b, 1);
                    --b;
                    continue;
                }
            }
        }

        player.draw();
        
        if (rotateEndFlag) {
            enemyCount++;
        }
        if (DeathFlag) {
            playerDeath();
        }

        if (playGame) {
            //タイムアウト設定
            repeat = setTimeout(gameMove, gameFrame);
        }   
    }

    //////////ループの為の関数/////////////////////////////////////////////////////////////////
    function timer() {
        if (playGame) {
            //タイムアウト設定
            repeat = setTimeout(gameMove, gameFrame);
        }
    }

    //////////プレイヤー死亡処理///////////////////////////////////////////////////////////////
    function playerDeath() {
        //alert("死んだお(´・ω・｀)");
        //clearTimeout(repeat);
        //サウンド切り替え
        Titlebgm.pause();
        gameMiss.currentTime = 0;
        gameMiss.play();

        playGame = false;
        uiPlay.hide();
        uiGameOver.show();
        uiFinalScore.html(score);
        if (score < 300) {
            uiPlayerRank.html("(´・ω・｀)(´・ω・｀)(´・ω・｀)");
        } else if (score < 500) {
            uiPlayerRank.html("(´・ω・｀)(´・ω・｀)");
        } else if (score < 800) {
            uiPlayerRank.html("(´・ω・｀)");
        } else if (score > 3500) {
            uiPlayerRank.html("(｀・ω・´)＜Thank you for your playing！");
        } else if (score > 3000) {
            uiPlayerRank.html("(゜д゜)(゜д゜)(゜д゜)");
        } else if (score > 2500) {
            uiPlayerRank.html("(゜д゜)(゜д゜)");
        } else if (score > 2000) {
            uiPlayerRank.html("(゜д゜)");
        } else if (score > 1500) {
            uiPlayerRank.html("(｀・ω・´)(｀・ω・´)(｀・ω・´)");
        } else if (score > 1000) {
            uiPlayerRank.html("(｀・ω・´)(｀・ω・´)");
        } else if (score >= 800) {
            uiPlayerRank.html("(｀・ω・´)");
        }

        uiReturnButton.click(function (e) {
            e.preventDefault();
            uiGameOver.hide();
            //setUp();
            uiTitle.show();
        });
    } 

    //////////死んだかチェック/////////////////////////////////////////////////////////////////
    function DeathCheck() {
        if (player.hitPoint <= 0) {
            DeathFlag = true;
            
            playGame = false;
            //alert("チェックしたお(´・ω・｀)");
            //playerDeath();
        } 
    }

    //////////回復アイテム出現関数/////////////////////////////////////////////////////////////
    function ToBeOrNotToBe(x, y) {
        
        var tmp = Math.random() *10;
        if (tmp <= lifeRate) {
            //alert("(｀・ω・´)");
            var lifeup = new LifeUp(x,y);
            lifeUps.push(lifeup);
            existLifeUpFlag = true;
        }
    }

    //////////Audio再生用関数/////////////////////////////////////////////////////////////////
    function playAudio(name) {
        name.currentTime = 0;
        name.play();
    }

    //hit音
    function HitSound() {
        this.no = 0;
        this.play = function () {
            if (this.no == 0) {
                playAudio(gameHit1);
                this.no = 1;
            } else if (this.no == 1) {
                playAudio(gameHit2);
                this.no = 2;
            } else if (this.no == 2) {
                playAudio(gameHit3);
                this.no = 3;
            } else if (this.no == 3) {
                playAudio(gameHit4);
                this.no = 4;
            } else if (this.no == 4) {
                playAudio(gameHit5);
                this.no = 0;
            }
        }
    }
    //爆発音
    function BombSound() {
        this.no = 0;
        this.play = function () {
            if (this.no == 0) {
                playAudio(gameBomb1);
                this.no = 1;
            } else if (this.no = 1) {
                playAudio(gameBomb2);
                this.no = 2;
            } else if (this.no = 2) {
                playAudio(gameBomb3);
                this.no = 3;
            } else if (this.no = 3) {
                playAudio(gameBomb4);
                this.no = 4;
            } else if (this.no = 4) {
                playAudio(gameBomb5);
                this.no = 0;
            }
        }
    }
    //BodyAttack音
    function BodyAttackSound() {
        this.no = 0;
        this.play = function () {
            if (this.no == 0) {
                playAudio(bodyattack1);
                this.no = 1;
            } else if (this.no == 1) {
                playAudio(bodyattack2);
                this.no = 2;
            } else if (this.no == 2) {
                playAudio(bodyattack3);
                this.no = 3;
            } else if (this.no == 3) {
                playAudio(bodyattack4);
                this.no = 4;
            } else if (this.no == 4) {
                playAudio(bodyattack5)
                this.no = 5;
            } else if (this.no == 5) {
                playAudio(bodyattack6)
                this.no = 6;
            } else if (this.no == 6) {
                playAudio(bodyattack7)
                this.no = 7;
            } else if (this.no == 7) {
                playAudio(bodyattack8)
                this.no = 8;
            } else if (this.no == 8) {
                playAudio(bodyattack9)
                this.no = 9;
            } else if (this.no == 9) {
                playAudio(bodyattack10)
                this.no = 10;
            } else if (this.no == 10) {
                playAudio(bodyattack11)
                this.no = 11;
            } else if (this.no == 11) {
                playAudio(bodyattack12)
                this.no = 12;
            } else if (this.no == 12) {
                playAudio(bodyattack13)
                this.no = 0;
            }
        }
    }
    //lifeUp音
    function LifeUpSound() {
        this.no = 0;
        this.play = function () {
            if (this.no == 0) {
                playAudio(lifeup1);
                this.no = 1;
            } else if (this.no == 1) {
                playAudio(lifeup2);
                this.no = 2;
            } else if (this.no == 2) {
                playAudio(lifeup3);
                this.no = 3;
            } else if (this.no == 3) {
                playAudio(lifeup4);
                this.no = 4;
            } else if (this.no == 4) {
                playAudio(lifeup5);
                this.no = 5;
            } else if (this.no == 5) {
                playAudio(lifeup6);
                this.no = 0;
            }
        }
    }
    //shot音
    function ShotSound() {
        this.no = 0;
        this.play = function () {
            if (this.no == 0) {
                playAudio(gameShot1);
                this.no = 1;
            } else if (this.no == 1) {
                playAudio(gameShot2);
                this.no = 2;
            } else if (this.no == 2) {
                playAudio(gameShot3);
                this.no = 3;
            } else if (this.no == 3) {
                playAudio(gameShot4);
                this.no = 4;
            } else if (this.no == 4) {
                playAudio(gameShot5);
                this.no = 0;
            }
        }
    }

    setUp();
});