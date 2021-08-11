let Game = function() {
	this.n = 9;
	this.m = 8;
	this.map = [];
	this.x = 0;
	this.y = 0;
	this.cellSize = 0;
	this.cellSized2 = 0;
	this.colorMap = new Array(256);
	this.rotationMap = new Array(256);
	this.finish = false;
	this.questions = [
		'Qual a diferença entre os dois tipos de percepção?',
		'Ops, você se dispersou e precisa voltar a se envolver com a nossa tarefa. Para continuar, supere esse obstáculo',
		'Quais são os cinco fatores de satisfação no trabalho em uma abordagem multidimensional?\nA)Trabalho, chefia, colegas, promoções e salário.\nB)Atividade, chefe, colaboradores, promoções e salário\nC) Trabalho, chefia, colaboradores, promoções e recompensas\nD)Trabalho, chefe, colaboradores, promoções e dinheiro',
		'O que são necessidades de alocação de recompensas?',
		'Quase lá! Ultrapasse mais esse obstáculo para continuar seu percurso',
		'Quais são as três principais concepções de comprometimento organizacional?\nA)Comprometimento organizacional de vínculos, comprometimento organizacional afetivo e comprometimento organizacional calculativo.\nB) Comprometimento organizacional afetivo, comprometimento organizacional calculativo e comprometimento organizacional normativo.\nC) Comprometimento organizacional afetivo, comprometimento organizacional de controle e comprometimento organizacional calculativo.\nD)Comprometimento organizacional normativo, comprometimento organizacional calculativo e comprometimento organizacional de desenvolvimento.',
		'Pensando no envolvimento com o trabalho, quais são os quatro fatores imbricados nas variáveis da personalidade?\na) adoção da ética protestante, lócus de controle, reciprocidade e necessidade de crescimento.\nb) reciprocidade, autoestima, adoção da ética protestante e necessidade de crescimento.\nc) adoção da ética protestante, lócus de controle, autoestima e necessidade de crescimento.\nd) autoestima, lócus de controle, reciprocidade e necessidade de crescimento.',
		'Vixe! Um probleminha com reciprocidade. Mas não se preocupe, chama um colega para lhe ajudar a superar este obstáculo.'
	];
	this.answers = ['','','','','','','','','']
	this.question = [false, false, false, false, false, false, false, false, false, false, false]
	this.messageType = [1, 0, 1, 1, 0, 1, 1, 0];
	
	this.stop_left = loadImage('./images/stop_left.png');
	this.stop_right = loadImage('./images/stop_right.png');
	this.grass = loadImage('./images/grass.jpg');
	this.stop = loadImage('./images/stop.png');
	this.stone = loadImage('./images/stone.png');
	this.coming = loadImage('./images/coming.png');
	this.earth = loadImage('./images/earth.png');
	this.concreteup = loadImage('./images/concrete-up.png');
	this.concreteside = loadImage('./images/concrete-side.png');
}

Game.prototype.setup = function() {
	createCanvas(800, 650).parent('visualization');
	angleMode(DEGREES);
	textSize(22);

	this.gameMap = [
	['0', '1', '0', '2', '0', '0', '0', '3'],
	['#', '#', '#', '#', '#', '#', '#', '0'],
	['#', '#', '0', '0', '0', '0', '0', '0'],
	['#', '#', '0', '#', '#', '#', '#', '#'],
	['#', '#', '4', '0', '0', '0', '5', '0'],
	['#', '#', '#', '#', '#', '#', '#', '0'],
	['0', '0', '0', '6', '0', '0', '0', '0'],
	['0', '#', '#', '#', '#', '#', '#', '#'],
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

Game.prototype.isArrow = function(ch) { return ch == '>' || ch == '<' || ch == '^' || ch == 'v' };

Game.prototype.sleep = async function(ms) {
  if (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(function() { resolve(); }, ms);
    });
  }
}

Game.prototype.drawCell = async function(i, j) {
	fill(255, 255, 255);
	rect(100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
	if(this.isArrow(this.gameMap[i][j])){
		switch (this.gameMap[i][j]) {
			case '<':
			case '>':
				image(this.concreteside, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
				this.concreteside.resize(this.cellSize, this.cellSize);
				break;
			case '^':
			case 'v':
				image(this.concreteup,100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
				this.concreteup.resize(this.cellSize, this.cellSize);
				break;
		}
	}
	if(this.gameMap[i][j] == '#'){
		fill(50, 50, 50);
		image(this.grass, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
	} else if (this.gameMap[i][j] >= '0' && this.gameMap[i][j] <= '9') {
		fill(255, 255, 255);
		if(this.gameMap[i][j] == '9'){
			image(this.concreteside, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
				this.concreteside.resize(this.cellSize, this.cellSize);
		} else {
			image(this.earth, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
			this.earth.resize(this.cellSize, this.cellSize);	
		}
		switch(this.gameMap[i][j]) {
			case '2':
			case '5':
			case '8':
				image(this.stone, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
				break;
			case '9':
				image(this.coming, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
				break;
			case '1':
			case '3':
			case '4':
			case '6':
			case '7':
				image(this.stop, 100 + j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
				this.stop.resize(100, 100);
				break;
			}
		} 
	
	const pos = parseInt(this.gameMap[this.x][this.y]) - 1;
	if(i == this.x && j == this.y) {
		fill(50, 50, 50);
		image(this.stop_left, (j * this.cellSize + this.cellSized2) + 50, (i * this.cellSize + this.cellSized2) - 40);
		this.stop_left.resize(80, 80);
		if(this.gameMap[this.x][this.y] == '9' && !this.finish) {
			this.finish = true;
			await this.sleep(100);
			alert('Parabens! Objetivo alcançado.');
		} else if(this.gameMap[this.x][this.y] >= '1' && this.gameMap[this.x][this.y] < '9' && !this.question[pos]) {
				this.question[pos] = true;
				await this.sleep(100);
				if(this.messageType[pos]) {
					this.answers[pos] = prompt(this.questions[pos]);
				} else {
					this.answers = 'ans';
					alert(this.questions[pos]);
				}
		}
	}
};

Game.prototype.drawMap = async function() {
	clear();
	for (let i = 0; i < this.n; i ++) {
		for (let j = 0; j < this.m; j ++) {
			await this.drawCell(i, j);
		}
	}
};


Game.prototype.valid = function (dx, dy) { return this.gameMap[this.x + dx][this.y + dy] != '#';}

Game.prototype.update = function(dx, dy, arrow) {
	if(!this.finish && this.valid(dx, dy)) {
		if(dx) arrow = '^';
		if(dy) arrow = '<';
		this.gameMap[this.x][this.y] = arrow;
		this.x += dx;
		this.y += dy;
	}
}
