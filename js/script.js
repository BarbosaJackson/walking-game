let movementDelay = 100, pauseDelay = 1000, maxDelay = 2000, minDelay = 100;
let game = null;
let stop, walk;
function preload() {
	this.game = new Game();
}

function setup() {
	this.game.setup();
}


async function draw() {
	await this.game.drawMap();
}


function keyReleased() {
   const keyName = event.key;
   let dx = 0, dy = 0, arrow = '0';
   if(keyName == 'ArrowUp') {
   	if(this.game.x) {
   		dx = -1;
   	}
   } else if(keyName == 'ArrowDown') {
   	if(this.game.x + 1 < this.game.n) {
   		dx = 1;
   	}
   } else if(keyName == 'ArrowRight'){
   	if(this.game.y + 1 < this.game.m) {
   		dy = 1;
   	}
   } else if(keyName == 'ArrowLeft') {
   	if(this.game.y) {
   		dy = -1;
   	}
   }
   if(dx || dy) {
   	this.game.update(dx, dy);
   }
}

// document.addEventListener('keydown', (event) => {
//   const keyName = event.key;
//   let dx = 0, dy = 0;
//   if(keyName == 'ArrowUp') {
//   	if(this.game.x) {
// 		dx = -1;
//   	}
//   } else if(keyName == 'ArrowDown') {
//   	if(this.game.x + 1 < this.game.n) {
//   		dx = 1;
//   	}
//   } else if(keyName == 'ArrowRight'){
//   	if(this.game.y + 1 < this.game.m) {
//   		dy = 1;
//   	}
//   } else if(keyName == 'ArrowLeft') {
//   	if(this.game.y) {
//   		dy = -1;
//   	}
//   }
//   if(dx || dy) {
// 		this.game.update(dx, dy);
//   }
// });
