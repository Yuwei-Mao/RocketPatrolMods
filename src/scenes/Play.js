class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket','assets/rocket.png');
        this.load.image('starfield','assets/starfield.png');
        this.load.image('starfield2','assets/starfield2.png');
        this.load.image('board','assets/board.png');
        //load spritesheet
        this.load.spritesheet('explosion','assets/explosion.png',{
            frameWidth: 64,
            frameHeigh: 64,
            startFrame: 0,
            endFrame: 9
        });
        this.load.spritesheet('spaceship','assets/sun.png',{
            frameWidth: 64,
            frameHeigh: 64,
            startFrame: 0,
            endFrame: 5
        });
        this.load.spritesheet('spaceship2','assets/sun2.png',{
            frameWidth: 32,
            frameHeigh: 32,
            startFrame: 0,
            endFrame: 5
        });
        this.load.audio('bgm','assets/Elusive Perch.wav');
    }

    create() {

        //Add your own (copyright-free) background music to the Play scene (5)
        this.bgm = game.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'sun',
            frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 5, first: 0}),
            frameRate: 10,
            repeat:-1
        });

        //place starfield
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);

        // greem UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);
        // white borders
        // this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(0,0,borderUISize, game.config.width, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(game.config.width-borderUISize,0, borderUISize, game.config.height,0xFFFFFF).setOrigin(0,0);
        //add rocket
        this.p1Rocket = new Rocket(this,game.config.width/2,game.config.height - borderUISize -borderPadding, 'rocket').setOrigin(0.5,0);

        //add spaceship*3
        this.ship01 = new Spaceship(this,game.config.width + borderUISize*6, borderUISize *4, 'spaceship',0,30).setOrigin(0,0);
        this.ship01.anims.play('sun');
        this.ship02 = new Spaceship(this,game.config.width + borderUISize*3, borderUISize *5 + borderPadding*2, 'spaceship',0,20).setOrigin(0,0);
        this.ship02.anims.play('sun');
        this.ship03 = new Spaceship(this,game.config.width, borderUISize *6 +borderPadding*4, 'spaceship',0,10).setOrigin(0,0);
        this.ship03.anims.play('sun');

        //add new spaceship 
        //Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
        this.ship04 = Spaceship2(this,game.config.width + borderUISize*9, borderUISize *7 +borderPadding*8, 'spaceship2',0,50).setOrigin(0,0);
        this.ship04.anims.play('sun2');

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        

        //display score
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '25px',
            color: '#212F3D',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        
        // GAME OVER flag
        this.gameOver = false;

        // 60/45-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > highscore) {highscore = this.p1Score;}
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64*2, 'High Score:'+highscore, scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);

        // Display the time remaining (in seconds) on the screen (10)
        this.board1 = this.add.sprite(borderUISize + borderPadding, borderPadding*2,'board').setOrigin(0,0);
        this.board2 = this.add.sprite(borderUISize*4 + borderPadding, borderPadding*2,'board').setOrigin(0,0);
        //Initalize SCORE
        this.p1Score = 0;
        // add score to the scene
        this.scoreLeft = this.add.text(borderUISize + borderPadding*2, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        //Initalize TIMER
        this.timer1 = game.settings.gameTimer/1000;
        // add timer to the scene
        this.timeRight = this.add.text(borderUISize*4 + borderPadding*2, borderUISize + borderPadding*2, this.timer1, scoreConfig);

        //place starfield2
        //Implement parallax scrolling (10)
        this.starfield2 = this.add.tileSprite(0,0,640,480,'starfield2').setOrigin(0,0);
        
    
    }

    update() {

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        this.starfield.tilePositionX -= starSpeed;
        this.starfield2.tilePositionX -= starSpeed*0.8;
        if (!this.gameOver){
            //update the rocket
            this.p1Rocket.update();
            //update the spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            // change the text of time remaining
            this.timer1 = game.settings.gameTimer/1000 - this.clock.getElapsed()/1000;
            this.timeRight.setText(this.timer1.toFixed(1));
        }

        // chech collisions
        if(this.checkCollision(this.p1Rocket,this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);  
        }
    
        if(this.checkCollision(this.p1Rocket,this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
    
        if(this.checkCollision(this.p1Rocket,this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });  
        
        //score add ad repaint
        this.p1Score+=ship.points;
        this.scoreLeft.text = this.p1Score;

        //this.sound.play('sfx_explosion');
        //Create 4 new explosion SFX and randomize which one plays on impact (10)
        let a = Math.ceil( Math.random( )*4 );
        if (a==1){ this.sound.play('sfx_explosion1');}
        else if (a==2) {this.sound.play('sfx_explosion2');}
        else if (a==3) {this.sound.play('sfx_explosion3');}
        else if (a==4) {this.sound.play('sfx_explosion4');}
      }


}
