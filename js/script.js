let movementDelay = 100, pauseDelay = 1000, maxDelay = 2000, minDelay = 100;
let game = null;
let stop, walk;
function preload() {
	this.game = new Game();
}

function setup() {
	this.game.setup();
}


function draw() {
	background(89, 182, 91);
	this.game.drawMap();
}