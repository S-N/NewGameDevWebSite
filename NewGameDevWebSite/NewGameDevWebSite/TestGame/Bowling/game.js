$(document).ready(function() {
//alert("uuuu");
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	//キャンバスの大きさ
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	//フィールドの変数
	var playGame;
	var platformX;
	var platformY;
	var platformOuterRadius;
	var platformInnerRadius;
	var playerSelected;
	var playerMaxAbsVelocity;
	var playerVelocityDampener;
	var powerX;
	var powerY;

	var score = 0;
	
	//アステロイド格納配列
	var asteroids;
	
	//プレイヤーの初期位置
	var player;
	var playerOriginalX;
	var playerOriginalY;
	
	//ＵＩ
	var ui = $("#gameUI");
	var uiIntro = $("#gameIntro");
	var uiStats = $("#gameStats");
	var uiComplete = $("#gameComplete");
	var uiPlay = $("#gamePlay");
	var uiReset = $(".gameReset");
	var uiRemaining = $("#gameRemaining");
	var uiScore = $(".gameScore");
	
    //アステロイドクラス
	var Asteroid = function(x, y, radius, mass, friction) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.mass = mass;
		this.friction = friction;
		
		this.vX = 0;
		this.vY = 0;
		
		this.player = false;
	};

	//プレイヤーの位置を初期化
	function resetPlayer() {
		player.x = playerOriginalX;
		player.y = playerOriginalY;
		player.vX = 0;
		player.vY = 0;
	};
	
	//ゲームのセットアップ
	function startGame() {
		uiScore.html("0");
		uiStats.show();
		
		//初期設定
		playGame = false;
		//playGame = true;
		platformX = canvasWidth/2;
		platformY = 150;

		platformOuterRadius = 100;
		platformInnerRadius = 75;
		
		asteroids = new Array();
		
		playerSelected = false;
		playerMaxAbsVelocity = 30;
		playerVelocityDampener = 0.3;
		powerX = -1;
		powerY = -1;

		score = 0;
		
		playerOriginalX = canvasWidth/2;													//////////////////////////////////////////////////			
		playerOriginalY = canvasHeight-150;
		
		
		
		var pRadius = 15;																					//Player//
		var pMass = 10;
		var pFriction = 0.97;
		
		player = new Asteroid(playerOriginalX, playerOriginalY, pRadius, pMass, pFriction); 	
		//player.vY = -25;
		player.player = true;
		asteroids.push(player);																//////////////////////////////////////////////////
		
		
		var outerRing = 8; //1番外側のリングのアステロイドの個数
		var ringCount = 3; //リングの数
		var ringSpacing = (platformInnerRadius/(ringCount-1)); //リングとリングの間のスペース
		
		for(var r=0; r<ringCount; r++) {
			var currentRing = 0;
			var angle = 0;
			var ringRadius = 0;
			
			//最も内側のリングかどうか判定
			if (r == ringCount-1) {
				currentRing = 1;
			}else {
				currentRing = outerRing-(r*3);
				angle = 360/currentRing;
				ringRadius = platformInnerRadius-(ringSpacing*r);
			};
		
		
			for (var a=0; a<currentRing; a++) {
				var x = 0;
				var y = 0;
			
				//最も内側のリングかどうか判定
				if (r == ringCount-1) {
					x = platformX;
					y = platformY;
				}else {
					x = platformX+(ringRadius*Math.cos((angle*a)*(Math.PI/180)));
					y = platformY+(ringRadius*Math.sin((angle*a)*(Math.PI/180)));
				};
			
				var radius = 10;
				var mass = 5;
				var friction = 0.95;
			
				asteroids.push(new Asteroid(x, y, radius, mass, friction));
			};
		};
		
		uiRemaining.html(asteroids.length-1);
		
        //クリック時のイベントリスナー
		$(window).mousedown(function(e) {
			if (!playerSelected && player.x == playerOriginalX && player.y == playerOriginalY) {
				var canvasOffset = canvas.offset();
				var canvasX = Math.floor(e.pageX-canvasOffset.left);
				var canvasY = Math.floor(e.pageY-canvasOffset.top);
				
				if(!playGame) {
					playGame = true;
					animate();
				};
				
				var dX = player.x-canvasX;
				var dY = player.y-canvasY;
				var distance = Math.sqrt((dX*dX) + (dY*dY));
				var padding = 5;
				
				if (distance<player.radius+padding) {
					powerX = player.x;
					powerY = player.y;
					playerSelected = true;
				};
			};
		});
        //ドラッグ時のイベントリスナー
		$(window).mousemove(function(e) {
		    if (playerSelected) {
				var canvasOffset = canvas.offset();
				var canvasX = Math.floor(e.pageX-canvasOffset.left);
				var canvasY = Math.floor(e.pageY-canvasOffset.top);
				
				var dX = canvasX - player.x;
				var dY = canvasY - player.y;
				var distance = Math.sqrt((dX*dX)+(dY*dY));
				
				if (distance*playerVelocityDampener < playerMaxAbsVelocity) {
					powerX = canvasX;
					powerY = canvasY;
				}else {
					var ratio = playerMaxAbsVelocity / (distance*playerVelocityDampener);
					powerX = player.x + (dX*ratio);
					powerY = player.y + (dY*ratio);
				};
			};
		});
	    //クリック終了時のイベントリスナー
		$(window).mouseup(function(e) {
			if (playerSelected) {
				var dX = powerX - player.x;
				var dY = powerY - player.y;
				
				player.vX = -(dX * playerVelocityDampener);
				player.vY = -(dY * playerVelocityDampener);

				uiScore.html(++score);
			};
			
			playerSelected = false;
			powerX = -1;
			powerY = -1;
			
		});
		
		//Start Animation
		animate();
	};
	
	//Format
	function init() {
		uiStats.hide();
		uiComplete.hide();
		
		uiPlay.click(function(e) {
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});
		
		uiReset.click(function(e) {
			e.preventDefault();
			uiComplete.hide();
			startGame();
		});
	};
	
	//Animation loop
	function animate() {
		//キャンバスを初期化
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.fillStyle = "rgb(100, 100, 100)";
		context.beginPath();
		context.arc(platformX, platformY, platformOuterRadius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		
		if (playerSelected) {
			context.strokeStyle = "rgb(150, 150, 150)";
			context.lineWidth = 3;
			context.beginPath();
			context.moveTo(player.x, player.y);
			context.lineTo(powerX, powerY);
			context.closePath();
			context.stroke();
		};
		
		context.fillStyle = "rgb(255, 255, 255)";
		var deadAsteroids = new Array();
		var asteroidsLength = asteroids.length;
		for (var i=0; i<asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];
			
			for(var j=i+1; j<asteroidsLength; j++) {
				var tmpAsteroidB = asteroids[j];
				var dX = tmpAsteroidB.x - tmpAsteroid.x;
				var dY = tmpAsteroidB.y - tmpAsteroid.y;
				var distance = Math.sqrt((dX*dX)+(dY*dY));
				
				if(distance<tmpAsteroid.radius + tmpAsteroidB.radius) {
					var angle = Math.atan2(dY, dX);
					var sine = Math.sin(angle);
					var cosine = Math.cos(angle);
					
					//Asteroid no iti wo kakuninnn suru
					var x = 0;
					var y = 0;
					
					//tmpAsteroidB no iti wo kaitenn suru 
					var xB = dX * cosine + dY * sine;
					var yB = dY * cosine - dX * sine;
					
					//Spin Speed of Asteroid
					var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
					var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine;
					
					//Spin Speed of AsteroidB
					var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
					var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine;
					
					//Undoryo wo hozon suru
					var vTotal = vX - vXb;
					vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass);
					vXb = vTotal + vX;
					
					//2tu no awteroid wo hanekaeraseru
					xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius);
					
					
					//Return Asteroid position by Spining
					tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine);
					tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine);
					
					tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine);
					tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine);
					
					//Return Speed by Spining
					tmpAsteroid.vX = vX * cosine - vY * sine;
					tmpAsteroid.vY = vY * cosine + vX * sine;
					
					tmpAsteroidB.vX = vXb * cosine - vYb * sine;
					tmpAsteroidB.vY = vYb * cosine + vXb * sine;
				};
			};
			
			//new Position 
			tmpAsteroid.x += tmpAsteroid.vX;
			tmpAsteroid.y += tmpAsteroid.vY;
			
			//摩擦
			if (Math.abs(tmpAsteroid.vX)>0.1) {
				tmpAsteroid.vX *= tmpAsteroid.friction;
			}else {
				tmpAsteroid.vX = 0;
			};
			
			if (Math.abs(tmpAsteroid.vY)>0.1) {
				tmpAsteroid.vY *= tmpAsteroid.friction;
			}else {
				tmpAsteroid.vY = 0;
			};

		    //アステロイドがはじき出されている数を調べる
			if (!tmpAsteroid.player) {
			    var dXp = tmpAsteroid.x - platformX;
			    var dYp = tmpAsteroid.y - platformY;
			    var distanceP = Math.sqrt((dXp * dXp) + (dYp * dYp));
			    if (distanceP > platformOuterRadius) {
			        if (tmpAsteroid.radius > 0) {
			            tmpAsteroid.radius -= 2;
			        } else {
			            deadAsteroids.push(tmpAsteroid);
			        };
			    };
			};


			//プレイヤーの位置を初期化する条件
			if (player.x != playerOriginalX && player.y != playerOriginalY) {  //アステロイドの動きが止まった時
				if (player.vX == 0 && player.vY == 0) {                        
					resetPlayer();
				}else if (player.x + player.radius < 0) {                      //
					resetPlayer();                                             //
				}else if (player.y + player.radius < 0) {                      //
					resetPlayer();                                             //  キャンバスからアステロイドがはみ出たとき
				}else if (player.x - player.radius > canvasWidth) {            //
					resetPlayer();                                             //
				}else if (player.y - player.radius > canvasHeight) {           //
					resetPlayer();
				};
			};
			
			context.beginPath();
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		};

		var deadAsteroidsLength = deadAsteroids.length;
		if (deadAsteroidsLength > 0) {
		    for (di = 0; di < deadAsteroidsLength; di++) {
		        var tmpDeadAsteroid = deadAsteroids[di];
		        asteroids.splice(asteroids.indexOf(tmpDeadAsteroid), 1);
		    };

		    var remaining = asteroids.length - 1; //アステロイドの数-プレイヤー
		    uiRemaining.html(remaining);

		    if (remaining == 0) {
		        //Winner!
		        playGame = false;
		        uiStats.hide();
		        uiComplete.show();

		        $(window).upbind("mousedown");
		        $(window).upbind("mouseup");
		        $(window).upbind("mousemove");
		    };
		};
		
		if(playGame) {
			//After 33milli seconds, animate again.
			setTimeout(animate, 33);
		};
	};
	
	init();
});