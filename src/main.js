//CMPM 120
//UC Santa Cruz
//Creater Name: Yuwei Mao
//Project Title: Rocket Patrol Mods
//Points Breakdown:
//Allow the player to control the Rocket after it's fired (5)
//Display the time remaining (in seconds) on the screen (10)
//Create a new scrolling tile sprite for the background (5)
//Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
//Implement parallax scrolling (10)
//reate a new title screen (e.g., new artwork, typography, layout) (10)
//Track a high score that persists across scenes and display it in the UI (5)
//Add your own (copyright-free) background music to the Play scene (5)
//Create 4 new explosion SFX and randomize which one plays on impact (10)


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

let keyF, keyR, keyLEFT, keyRIGHT, keyENTER, keyM;

//Track a high score that persists across scenes and display it in the UI (5)
let highscore = 0;