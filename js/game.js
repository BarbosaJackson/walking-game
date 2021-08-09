let Game = function() {
	this.n = 7;
	this.m = 8;
	this.map = [];
	this.x = 0;
	this.y = 0;
	this.cellSize = 0;
	this.cellSized2 = 0;
	this.colorMap = new Array(256);
	this.rotationMap = new Array(256);

	this.stop = loadImage('https://postimg.cc/GBLbfWhz');
	// this.walk = loadImage('./images/walk.png')
	// this.stop = loadImage('./images/stop.png')
}

Game.prototype.setup = function() {
	createCanvas(1280, 650).parent('visualization');
	angleMode(DEGREES);
	textSize(22);

	this.gameMap = [
	['0', '1', '0', '2', '0', '0', '0', '3'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '4', '0', '0', '0', '5', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['0', '0', '0', '6', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0'],
	['7', '0', '0', '8', '0', '0', '0', '9'],
	];

	this.colorMap['1'] = color(205, 127, 50);
	this.colorMap['2'] = color(192, 192, 192);
	this.colorMap['3'] = color(255, 215, 0);
	this.colorMap['4'] = color(0, 255, 255);
	this.colorMap['5'] = color(0, 0, 255);
	this.colorMap['6'] = color(0, 0, 255);
	this.colorMap['7'] = color(0, 0, 255);
	this.colorMap['8'] = color(0, 0, 255);
	this.colorMap['9'] = color(0, 0, 255);

	this.rotationMap['^'] = 180;
	this.rotationMap['v'] = 0;
	this.rotationMap['>'] = 270;
	this.rotationMap['<'] = 90;

	this.cellSize = (min(width, height) / max(this.n, this.m));
	this.cellSized2 = this.cellSize / 2.0;
};

Game.prototype.drawArrow = function (i, j) {
  push();
  translate(j * this.cellSize + this.cellSized2, i * this.cellSize + this.cellSized2);
  rotate(this.rotationMap[this.gameMap[i][j]]);
  rect(-this.cellSized2 / 8.0, -this.cellSized2 / 2.0, this.cellSized2 / 4.0, this.cellSized2 / 2.0);
  triangle(-this.cellSized2 / 4.0, 0, this.cellSized2 / 4.0, 0, 0, this.cellSized2 / 2.0);
  pop();
};

Game.prototype.drawCell = function(i, j) {
	fill(255, 255, 255);
	rect(100 + j * this.cellSize, 50 + i * this.cellSize, this.cellSize, this.cellSize);

	if (this.gameMap[i][j] == '^' || this.gameMap[i][j] == 'v' || this.gameMap[i][j] == '>' || this.gameMap[i][j] == '<') {
		fill(255, 0, 255);
		drawArrow(i, j);
	} else if (this.gameMap[i][j] >= '1' && this.gameMap[i][j] <= '9') {
		fill(255, 255, 255);
		ellipse(j * this.cellSize + this.cellSized2 + 100, 50 + i * this.cellSize + this.cellSized2, this.cellSized2);
		fill(this.colorMap[this.gameMap[i][j]]);
		text(this.gameMap[i][j] ,100 + (j * this.cellSize + this.cellSized2)-5, 50 + (i * this.cellSize + this.cellSized2) - 10, this.cellSized2);
	}
	if(i == this.x && j == this.y) {
		fill(50, 50, 50)
		image(this.stop, 0, 0)
	}
};

Game.prototype.drawMap = function() {
	for (let i = 0; i < this.n; i ++) {
		for (let j = 0; j < this.m; j ++) {
			this.drawCell(i, j);
		}
	}
};