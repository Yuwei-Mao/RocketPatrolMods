//CMPM 120
//UC Santa Cruz
//Creater Name: Yuwei Mao
//Project Title: Rocket Patrol Mods
//Points Breakdown:
//Allow the player to control the Rocket after it's fired (5)

//game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}


let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings

let keyF, keyR, keyLEFT, keyRIGHT;