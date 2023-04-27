// REQUIRED CONSTANTS
//defines a class for ship - allows to create ships of different lengths
class Ship {
  constructor(length, hitCount, isSunk, location) {
    this.length = length;
    this.hitCount = 0;
    this.isSunk = false;
    this.location = [];
  }
}
// players constant
const PLAYERS = {
  player: "player",
  computer: "computer",
};

//determines the board squares status
const BOARD_SQUARE = {
  0: null, //empty square
  2: 2, //computer square
  1: 1, //player ship location
  "-1": -1, //miss
  "-2": "hit", //hit ship
};

//defines a ships object to hold the different types of ships
const PLAYER_SHIPS = {
  dinghy: new Ship(2, 0, false),
  sloop: new Ship(3, 0, false),
  galleon: new Ship(4, 0, false),
  queenAnnesRevenge: new Ship(5, 0, false),
};
const COMPUTER_SHIPS = {
  dinghy: new Ship(2, 0, false),
  sloop: new Ship(3, 0, false),
  galleon: new Ship(4, 0, false),
  queenAnnesRevenge: new Ship(5, 0, false),
};

//defines a class for the board
//allows creation of separate boards (computer and player or eventually player1 and player2)
class Board {
  constructor() {
    this.board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
  }
}

//win condition
//eventually make this dynamic by determining the total max hits by calculating the total number of ships lengths
const MAX_HITS = 14;

//messages object to store messageEl content
const MESSAGES = {
  pTurn: "Player's Turn",
  cTurn: "Computer's Turn",
  hit: "It's a hit!",
  miss: "It's a miss",
  sunk: "The ship is sunk",
  pWin: "You sunk all the ships. Congrats you win!",
  cWin: "All your ships are sunk. The computer wins",
  playAgain: "Press the play again button to have another go!",
};

//STATE VARIABLES
let playerBoard;
let computerBoard;
let neutralBoard;

let turn;
let winner;
let computerGuesses;
let playerHits;
let computerHits;

//CACHED DOM ELEMENTS
const messageEl = document.querySelector("#message");
const playAgainButton = document.querySelector("button");
const boardEls = [...document.querySelectorAll("#board > div")];

//EVENT LISTENERS
document.getElementById("board").addEventListener("click", playerClick);
document.getElementById("play-again").addEventListener("click", init);

//FUNCTIONS
//initialize game
init();
function init() {
  initPlayerBoard();
  initComputerBoard();
  neutralBoard = new Board();
  turn = PLAYERS.player;
  let computerGuesses = [];
  let playerHits = [];
  let computerHits = [];
  winner = "";
  render();
}

//render the DOM elements
function render() {
  renderTurnOrder();
  renderCleanUp();
  renderBoard();
  renderWinner();
  renderPlayAgain();
}

//update dom board to render visual board based on turn
function renderBoard() {
  if (turn === "player") {
    renderComputerBoard();
  } else if (turn === "computer") {
    renderPlayerBoard();
  }
}
function renderWinner() {
  if (winner === "player") {
    messageEl.innerText = MESSAGES.pWin;
  } else if (winner === "computer") {
    messageEl.innerText = MESSAGES.cWin;
  }
}

//render play again button
function renderPlayAgain() {
  playAgainButton.style.visibility = winner ? "visible" : "hidden";
}
//update message with turn order
function renderTurnOrder() {
  if (turn === "player") {
    messageEl.innerText = MESSAGES.pTurn;
  } else if (turn === "computer") {
    messageEl.innerText = MESSAGES.cTurn;
  }
}

//handles player click -- getting the square index correctly
function playerClick(event) {
  const squareIndex = boardEls.indexOf(event.target);
  let rowIndex = (squareIndex - (squareIndex % 10)) / 10;
  let colIndex = squareIndex % 10;
  isHit(rowIndex, colIndex, computerBoard.board, 2, playerHits);
  document.getElementById("board").removeEventListener("click", playerClick);
  checkWinner(playerHits, PLAYERS.player);
  if (winner === "") {
    turn = PLAYERS.computer;
    setTimeout(() => {
      render();
    }, 3000);
    setTimeout(() => {
      computerMove();
    }, 5000);
  } else {
    document.getElementById("board").removeEventListener("click", playerClick);
    render();
  }
}

//computer move - working - need to add logic to not guess same square twice.
//want to add logic so computer will choose a square relative to successful hit
function computerMove() {
  if (winner === "") {
    let rowIndex = Math.floor(Math.random() * 10);
    let colIndex = Math.floor(Math.random() * 10);
    let computerGuess = rowIndex * 10 + colIndex;
    computerGuesses.push(computerGuess);
    isHit(rowIndex, colIndex, playerBoard.board, 1, computerHits);
    checkWinner(playerHits, PLAYERS.computer);
    turn = PLAYERS.player;
    setTimeout(() => {
      render();
    }, 3000);
    document.getElementById("board").addEventListener("click", playerClick);
    console.log("guesses array", computerGuesses);
    console.log("player board", playerBoard);
  } else {
    document.getElementById("board").removeEventListener("click", playerClick);
  }
}

//randomly places 4 ships in a horizontal direction
//small bug: will randomly skip placing ship if too many tries
function horizontalPlacement(board, ship, squareValue) {
  let colCoordinate = Math.floor(Math.random() * 10);
  let rowCoordinate = Math.floor(Math.random() * 10);
  let isValid = false;
  if (
    board[rowCoordinate][colCoordinate] === null &&
    colCoordinate <= board.length - ship.length
  ) {
    for (i = 0; i < ship.length; i++) {
      if (board[rowCoordinate][colCoordinate + i] === null) {
        isValid = true;
      } else {
        isValid = false;
        return;
      }
    }
    if (isValid === true) {
      for (j = 0; j < ship.length; j++) {
        board[rowCoordinate][colCoordinate + j] = BOARD_SQUARE[squareValue];
        ship.location.push(`${rowCoordinate}${colCoordinate + j}`);
      }
    }
  } else horizontalPlacement(board, ship, squareValue);
}

//ship hit
function isHit(rowIndex, colIndex, board, target, turnHits) {
  if (board[rowIndex][colIndex] === null) {
    messageEl.innerText = MESSAGES.miss;
    board[rowIndex][colIndex] = -1;
    renderBoard();
  } else if (board[rowIndex][colIndex] === target) {
    messageEl.innerText = MESSAGES.hit;
    board[rowIndex][colIndex] = -2;
    turnHits.push(1);
    console.log(turnHits);
    renderBoard();
  }
}

//init playerBoard and computer board
function initPlayerBoard() {
  playerBoard = new Board();
  horizontalPlacement(playerBoard.board, PLAYER_SHIPS.dinghy, 1);
  horizontalPlacement(playerBoard.board, PLAYER_SHIPS.sloop, 1);
  horizontalPlacement(playerBoard.board, PLAYER_SHIPS.galleon, 1);
  horizontalPlacement(playerBoard.board, PLAYER_SHIPS.queenAnnesRevenge, 1);
}
function initComputerBoard() {
  computerBoard = new Board();
  horizontalPlacement(computerBoard.board, COMPUTER_SHIPS.dinghy, 2);
  horizontalPlacement(computerBoard.board, COMPUTER_SHIPS.sloop, 2);
  horizontalPlacement(computerBoard.board, COMPUTER_SHIPS.galleon, 2);
  horizontalPlacement(computerBoard.board, COMPUTER_SHIPS.queenAnnesRevenge, 2);
}

//render playerBoard, computerBoard, and neutral board between turns
function renderPlayerBoard() {
  playerBoard.board.forEach((rowArray, squareIndex) => {
    rowArray.forEach((cellValue, colIndex) => {
      const cellId = `s${squareIndex}${colIndex}`;
      const cellEl = document.getElementById(cellId);
      if (cellValue === null) {
        cellEl.style.backgroundColor = "beige";
      } else if (cellValue === 1) {
        cellEl.style.backgroundColor = "brown";
      } else if (cellValue === -1) {
        cellEl.style.backgroundColor = "blue";
      } else if (cellValue === -2) {
        cellEl.style.backgroundColor = "red";
      }
    });
  });
}
function renderComputerBoard() {
  computerBoard.board.forEach((rowArray, squareIndex) => {
    rowArray.forEach((cellValue, colIndex) => {
      const cellId = `s${squareIndex}${colIndex}`;
      const cellEl = document.getElementById(cellId);
      if (cellValue === null) {
        cellEl.style.backgroundColor = "beige";
      } else if (cellValue === 1) {
        cellEl.style.backgroundColor = "beige";
      } else if (cellValue === -1) {
        cellEl.style.backgroundColor = "blue";
      } else if (cellValue === -2) {
        cellEl.style.backgroundColor = "red";
      }
    });
  });
}
function renderCleanUp() {
  neutralBoard.board.forEach((rowArray, squareIndex) => {
    rowArray.forEach((cellValue, colIndex) => {
      const cellId = `s${squareIndex}${colIndex}`;
      const cellEl = document.getElementById(cellId);
      if (cellValue === null) {
        cellEl.style.backgroundColor = "beige";
      }
    });
  });
}

//checks for winner
function checkWinner(turnHits, player) {
  let hits = 0;
  for (i = 0; i < turnHits.length; i++) {
    if (turnHits[i] === 1) {
      hits++;
      if (hits === MAX_HITS) {
        winner = player;
        return winner;
      }
    }
  }
}
