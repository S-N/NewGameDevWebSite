enchant();
rand = function(n){
    return Math.floor(Math.random()*n);
}
//ドロイド出現数
    maxDroid  = 30;
//穴クラスの定義
//Spriteクラスを継承する
Pit = Class.create(Sprite,{
    initialize:function(x,y) {
	//Spriteクラスのコンストラクターの呼び出し
	enchant.Sprite.call(this,48,48);
	this.image = game.assets['mogura.png'];
	this.x = x;
	this.y = y;
	//イベントリスナーを定義
	this.addEventListener('enterframe',this.tick);
	//叩いた場合のイベントリスナー
	this.addEventListener('touchstart',this.hit);
	//ドロイド君の出現モード2(待つ)からに設定
	this.mode = 2;
	this.nextMode = 0;
	this.waitFor = game.frame+rand(100);
    },
    //ドロイド君が出るアニメーションを繰り返す
    tick:function() {
	//2フレームごとに実行する
	if (game.frame%2!=0) {
	    return;
		}
	switch(this.mode){
	   //穴からドロイド
	   case 0:
	      this.frame++;
		if (this.frame >= 4) {
		    //で切ったらモード２へ
		    this.mode = 2;
		    //待った後は1(隠れる)
		    this.nextMode = 1;
		    //０～９９フレームまでランダムに待ち時間を設定
		    this.waitFor = game.frame+rand(30);
		}
		break;
	   //隠れる
	   case 1:
		this.frame --;
		if (this.frame <= 0) {
		    //隠れたらモード２（待つ）
		    this.mode = 2;
		    //待った後に移動0(出現)
		    this.nextMode = 0;
		    //ランダムに（ｒｙ
		    this.waitFor = game.frame+rand(200);
		    //ドロイド君の最大数を減らす
		    maxDroid--;
		    //もしこれ以上ドロイドが出現しないなら穴を塞ぐ
		    if (maxDroid<=0)this.mode = 3;
		    }
		break;
	   //待つ
	    case 2:
                //指定されたフレームに達したら
		if (game.frame>this.waitFor) {
		    //次のモードへ移動
		    this.mode = this.nextMode;
		}
		break;
	   //何もしない（もうドロイドは出ない）
	    case 3:
		    break;
    }
    },
    //ドロイド君を殴る
    hit:function() {
	//すでに殴られた後は何もしない（連続ヒットしない）
	if (this.frame === 5) return;
    	//ドロイド君が半分以上でていた場合
       if (this.frame >= 2){
          //殴られたドロイド君
          this.frame = 5;
          //待つモードに入る
          this.mode = 2;
          this.nextMode = 1;
          //待つフレームは１０で固定
          this.waitFor = game.frame+10;
	  //スコアに追加
	   scoreLabel.add(1);
       }
		   }
});
//スコアラベルクラスの定義
//Labelクラスを継承する
ScoreLabel = Class.create(Label,{
    initialize:function(x,y){
	//Labelクラスのコンストラクターの呼び出し
	enchant.Label.call(this,"SCORE:0");
	this.x = x;
	this.y = y;
	this.score = 0;
    },
    //スコアを加算
    add:function(pts) {
	this.score += pts;
	//表示を修正
	this.text="SCORE:"+this.score;
    }
});
//初期化
window.onload = function() {
    game = new Game(320,320);
    //ドロイド君読み込み
    game.preload('mogura.png');
    game.onload = function() {
	//スコアラベルを表示
	scoreLabel=new ScoreLabel(5,5);
	game.rootScene.addChild(scoreLabel);
	
    for(y=0;y<=3;y++) {
	for(x=0;x<=3;x++) {
		var pit = new Pit(x*48+20,y*48+20);
		game.rootScene.addChild(pit);
		var pit = new Pit(x*48+20,y*48+20);
		game.rootScene.addChild(pit);
	
    }
    }
    }
	game.start();
}