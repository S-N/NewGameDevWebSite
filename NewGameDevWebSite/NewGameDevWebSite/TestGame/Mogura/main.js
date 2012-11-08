enchant();
rand = function(n){
    return Math.floor(Math.random()*n);
}
//�h���C�h�o����
    maxDroid  = 30;
//���N���X�̒�`
//Sprite�N���X���p������
Pit = Class.create(Sprite,{
    initialize:function(x,y) {
	//Sprite�N���X�̃R���X�g���N�^�[�̌Ăяo��
	enchant.Sprite.call(this,48,48);
	this.image = game.assets['mogura.png'];
	this.x = x;
	this.y = y;
	//�C�x���g���X�i�[���`
	this.addEventListener('enterframe',this.tick);
	//�@�����ꍇ�̃C�x���g���X�i�[
	this.addEventListener('touchstart',this.hit);
	//�h���C�h�N�̏o�����[�h2(�҂�)����ɐݒ�
	this.mode = 2;
	this.nextMode = 0;
	this.waitFor = game.frame+rand(100);
    },
    //�h���C�h�N���o��A�j���[�V�������J��Ԃ�
    tick:function() {
	//2�t���[�����ƂɎ��s����
	if (game.frame%2!=0) {
	    return;
		}
	switch(this.mode){
	   //������h���C�h
	   case 0:
	      this.frame++;
		if (this.frame >= 4) {
		    //�Ő؂����烂�[�h�Q��
		    this.mode = 2;
		    //�҂������1(�B���)
		    this.nextMode = 1;
		    //�O�`�X�X�t���[���܂Ń����_���ɑ҂����Ԃ�ݒ�
		    this.waitFor = game.frame+rand(30);
		}
		break;
	   //�B���
	   case 1:
		this.frame --;
		if (this.frame <= 0) {
		    //�B�ꂽ�烂�[�h�Q�i�҂j
		    this.mode = 2;
		    //�҂�����Ɉړ�0(�o��)
		    this.nextMode = 0;
		    //�����_���Ɂi����
		    this.waitFor = game.frame+rand(200);
		    //�h���C�h�N�̍ő吔�����炷
		    maxDroid--;
		    //��������ȏ�h���C�h���o�����Ȃ��Ȃ猊���ǂ�
		    if (maxDroid<=0)this.mode = 3;
		    }
		break;
	   //�҂�
	    case 2:
                //�w�肳�ꂽ�t���[���ɒB������
		if (game.frame>this.waitFor) {
		    //���̃��[�h�ֈړ�
		    this.mode = this.nextMode;
		}
		break;
	   //�������Ȃ��i�����h���C�h�͏o�Ȃ��j
	    case 3:
		    break;
    }
    },
    //�h���C�h�N������
    hit:function() {
	//���łɉ���ꂽ��͉������Ȃ��i�A���q�b�g���Ȃ��j
	if (this.frame === 5) return;
    	//�h���C�h�N�������ȏ�łĂ����ꍇ
       if (this.frame >= 2){
          //����ꂽ�h���C�h�N
          this.frame = 5;
          //�҂��[�h�ɓ���
          this.mode = 2;
          this.nextMode = 1;
          //�҂t���[���͂P�O�ŌŒ�
          this.waitFor = game.frame+10;
	  //�X�R�A�ɒǉ�
	   scoreLabel.add(1);
       }
		   }
});
//�X�R�A���x���N���X�̒�`
//Label�N���X���p������
ScoreLabel = Class.create(Label,{
    initialize:function(x,y){
	//Label�N���X�̃R���X�g���N�^�[�̌Ăяo��
	enchant.Label.call(this,"SCORE:0");
	this.x = x;
	this.y = y;
	this.score = 0;
    },
    //�X�R�A�����Z
    add:function(pts) {
	this.score += pts;
	//�\�����C��
	this.text="SCORE:"+this.score;
    }
});
//������
window.onload = function() {
    game = new Game(320,320);
    //�h���C�h�N�ǂݍ���
    game.preload('mogura.png');
    game.onload = function() {
	//�X�R�A���x����\��
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