class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.image('begin','assets/begin.png');
        this.load.image('story','assets/story.png');

        //load 4 different explosion sound
        this.load.audio('sfx_explosion1','assets/explosion1.wav');
        this.load.audio('sfx_explosion2','assets/explosion2.wav');
        this.load.audio('sfx_explosion3','assets/explosion3.wav');
        this.load.audio('sfx_explosion4','assets/explosion4.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top:5,
                buttom: 5,
            },
            fixedWidth: 0
        }
        //show menu text
        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        // borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2
        // , 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2+borderUISize+borderPadding
        // , 'Press ← for Novice or → for Export', menuConfig).setOrigin(0.5);

        //show new title
        //Create a new title screen (e.g., new artwork, typography, layout) (10)
        this.title = this.add.tileSprite(0,0,640,480,'begin').setOrigin(0,0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.pressed = false;
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && this.pressed==true) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.pressed==true) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.pressed = true;
            // easy mode
            this.sound.play('sfx_select');
            this.title2 = this.add.tileSprite(0,0,640,480,'story').setOrigin(0,0);    
        }

        

    }

}