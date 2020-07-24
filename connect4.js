/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

class Game {
	constructor(gameCount, numPlayers, player1, player2, width, height) {
		this.player2 = {};
		this.player2 = player2;
		// console.log(this.players[1])
		this.WIDTH = width; //Number(prompt('How many columns would you like? A normal game is 7'));
		this.HEIGHT = height; //Number(prompt('How many rows would you like? A normal game is 6'));
		if (!this.currPlayer) {
			this.currPlayer = player1; // active player: 1 or 2
		}
		this.board = []; // array of rows, each row is array of cells  (board[y][x])
		this.gameCount = gameCount;
		this.makeBoard();
		this.makeHtmlBoard();
		let boundHandleClick;
		const game = this;
		document.querySelector('h3').innerText = `${this.currPlayer.name}'s Turn`;
	}

	makeBoard() {
		// set "board" to empty HEIGHT x WIDTH matrix array
		this.board = [];
		for (let i = 0; i < this.HEIGHT; i++) {
			this.board.push([]);
			for (let j = 0; j < this.WIDTH; j++) {
				this.board[i][j] = 'null';
			}
		}

		return board;
	}

	createOtherRows(htmlBoard) {
		//called within makeHtmlBoard. Creates rest of the table for holding pieces
		for (var y = 0; y < this.HEIGHT; y++) {
			const row = document.createElement('tr');
			for (var x = 0; x < this.WIDTH; x++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				row.append(cell);
			}
			htmlBoard.prepend(row);
		}
	}

	createTopRow(htmlBoard) {
		// creates the top row selecting which column the player will drop their piece in
		let top = document.createElement('tr');
		top.setAttribute('id', 'column-top');
		for (var x = 0; x < this.WIDTH; x++) {
			var headCell = document.createElement('td');
			headCell.setAttribute('id', x);
			top.append(headCell);
		}
		htmlBoard.prepend(top);
	}

	makeHtmlBoard() {
		// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
		this.htmlBoard = document.querySelector('#board');
		this.htmlBoard.innerText = '';
		let boundHandleClick = this.handleClick.bind(this);
		this.htmlBoard.removeEventListener('click', boundHandleClick);
		if (this.gameCount === 0) {
			this.htmlBoard.addEventListener('click', boundHandleClick);
		}
		//creates rest of the table for holding pieces
		this.createOtherRows(this.htmlBoard);

		//creates top row for selecting column
		this.createTopRow(this.htmlBoard);
	}

	findSpotForCol(x) {
		// TODO: write the real version of this, rather than always returning 0
		let count = 0;
		for (let array of this.board) {
			if (array[x] !== 'null') {
				count++;
			}
		}
		return count;
	}

	placeInTable(y, x) {
		// TODO: make a div and insert into correct table cell
		const newPiece = document.createElement('div');
		newPiece.className = 'piece';
		newPiece.style.backgroundColor = this.currPlayer === player1 ? player1.color : this.player2.color;
		document.getElementById(`${y}-${x}`).append(newPiece);
	}

	endGame(msg) {
		// TODO: pop up alert message
		let message = alert(msg);
		this.WIDTH = 7; //Number(prompt('How many columns would you like? A normal game is 7'));
		this.HEIGHT = 6; //Number(prompt('How many rows would you like? A normal game is 6'));
		this.currPlayer = this.currPlayer === player1 ? this.player2 : player1;
		this.currPlayer = this.player2.name === 'computer' ? player1 : this.currPlayer;
		document.querySelector('h3').innerText = `${this.currPlayer.name}'s Turn`;
		this.gameCount++;
		this.makeBoard();
		this.makeHtmlBoard();
	}

	checkForTie() {
		for (let row of this.board) {
			for (let cell of row) {
				if (cell === 'null') {
					return;
				}
			}
		}
		return this.endGame(`It's a draw!`);
	}

	computerMove() {
		let x = Math.floor(Math.random() * this.WIDTH);
		let y = this.findSpotForCol(x);
		if (y >= this.HEIGHT) {
			this.computerMove();
		} else {
			this.board[y][x] = this.currPlayer;
		}
		this.placeInTable(y, x);
		// check for win
		if (this.checkForWin()) {
			return this.endGame(`${this.currPlayer.name} won!`);
		}

		// check for tie
		this.checkForTie();
	}

	handleClick(evt) {
		// get x from ID of clicked cell
		let x = +evt.target.id;
		// get next spot in column (if none, ignore click)
		let y = this.findSpotForCol(x);
		if (y === null || isNaN(x)) {
			return;
		} else if (y >= this.HEIGHT) {
			alert('Column is full');
		}

		/* place piece in board and add to HTML table
	  	TODO: add line to update in-memory board*/
		  this.placeInTable(y, x);
		  this.board[y][x] = this.currPlayer;
		// // check for win
		// if (this.checkForWin()) {
		// 	return this.endGame(`${this.currPlayer.name} won!`);
		// }
		// check for tie
		this.checkForTie();
		// switch players
		if (this.player2.name !== 'computer') {
			this.currPlayer = this.currPlayer === player1 ? this.player2 : player1;
		} else {
			this.currPlayer = computer;
			this.computerMove();
			this.currPlayer = player1;
		}

		document.querySelector('h3').innerText = `${this.currPlayer.name}'s Turn`;
	}

	gameCheck(){
		console.log("check")
		// check for win
		if (this.checkForWin()) {
			return this.endGame(`${this.currPlayer.name} won!`);
		}
		// check for tie
		this.checkForTie();
		// switch players
		if (this.player2.name !== 'computer') {
			this.currPlayer = this.currPlayer === player1 ? this.player2 : player1;
		} else {
			this.currPlayer = computer;
			this.computerMove();
			this.currPlayer = player1;
		}
	}

	checkForWin() {
		let boundWin = _win.bind(this);
		function _win(cells) {
			/* Check four cells to see if they're all color of current player
		  - cells: list of four (y, x) cells
		  - returns true if all are legal coordinates & all match currPlayer */
			return cells.every(
				
				([ y, x ]) =>
					y >= 0 && y < this.HEIGHT && x >= 0 && x < this.WIDTH && this.board[y][x] === this.currPlayer
			);
		}

		/*Checks all possible forms of wins, 
	  this takes the location of the piece just played and checks the location for every piece in a win scenario from this move
	  by running the array through the win function to see if every item in 
	  array is the same player.*/

		for (let y = 0; y < this.HEIGHT; y++) {
			for (let x = 0; x < this.WIDTH; x++) {
				//check if 4 in a row horizontally
				let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
				//check if 4 in a row vertically
				let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
				//check if 4 in a row diagonally right
				let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
				//check if 4 in a row diagonally left
				let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];
				if (boundWin(horiz) || boundWin(vert) || boundWin(diagDR) || boundWin(diagDL)) {
					return true;
				}
			}
		}
	}
}

class Player {
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}
}

let gameCount = 0;
let numPlayers;
document.getElementById('1 Player').addEventListener('click', function() {
	numPlayers = 1;
	if (document.getElementById('1 Player').innerHTML !== 'RESET') {
		new Game(
			gameCount,
			numPlayers,
			(player1 = new Player(
				(name = prompt("What's your name?")),
				prompt(`${name}, what's your favorite color?`)
			)),
			(computer = new Player('computer', 'silver')),
			Number(prompt('How many columns would you like? A normal game is 7.')),
			Number(prompt('How many rows would you like? A normal game is 6.'))
		);

		if (gameCount === 0) {
			document.getElementById('2 Player').remove();
		}
		gameCount++;
		document.getElementById('1 Player').innerHTML = 'RESET';
	} else {
		window.location.reload();
	}
});

document.getElementById('2 Player').addEventListener('click', function() {
	numPlayers = 2;
	if (document.getElementById('2 Player').innerHTML !== 'RESET') {
		new Game(
			gameCount,
			numPlayers,
			(player1 = new Player(
				(name = prompt("What's your name?")),
				prompt(`${name}, what's your favorite color?`)
			)),
			(player2 = new Player(
				(name = prompt("What's your name?")),
				prompt(`${name}, what's your favorite color?`)
			)),
			Number(prompt('How many columns would you like? A normal game is 7.')),
			Number(prompt('How many rows would you like? A normal game is 6.'))
		);

		if (gameCount === 0) {
			document.getElementById('1 Player').remove();
		}
		gameCount++;
		document.getElementById('2 Player').innerHTML = 'RESET';
	} else {
		console.log('got');
		window.location.reload();
	}
});

function newGame() {
	numPlayers = 1;
	new Game(
		gameCount,
		numPlayers,
		(player1 = new Player((name = prompt("What's your name?")), prompt(`${name}, what's your favorite color?`))),
		(computer = new Player('computer', 'silver')),
		Number(prompt('How many columns would you like? A normal game is 7.')),
		Number(prompt('How many rows would you like? A normal game is 6.'))
	);
	gameCount++;
	document.getElementById('2 Player').remove();
	document.getElementById('1 Player').innerHTML = 'RESET';
}
