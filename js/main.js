// REQUIRED CONSTANTS
//players constant
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
  "-2": -2, //hit ship
};

//defines a class for ship - allows to create ships of different lengths
class Ship {
  constructor(length, hitCount, isSunk, location) {
    this.length = length;
    this.hitCount = 0;
    this.isSunk = false;
    this.location = [];
  }
}

//defines a ships object to hold the different types of ships
const SHIPS = {
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
// console.log(SHIPS.dinghy);
// console.log(SHIPS.sloop);
// console.log(SHIPS.galleon);
// console.log(SHIPS.queenAnnesRevenge);

//win condition
//eventually make this dynamic by determining the total max hits by calculating the total number of ships lengths
const MAX_HITS = 17;

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
let turn;
let winner;
let shipLocation;

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
  turn = PLAYERS.player;
  winner = false;
  render();
}

//render the DOM elements
function render() {
  renderTurnOrder();
  renderPlayAgain();
  renderBoard();
}

//update dom board to render visual board based on turn
function renderBoard() {
  if (turn === "player") {
    renderComputerBoard();
  } else if (turn === "computer") {
    renderPlayerBoard();
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
  } else {
    messageEl.innerText = MESSAGES.cTurn;
  }
}

//handles player click -- getting the square index correctly
function playerClick(event) {
  const squareIndex = boardEls.indexOf(event.target);
  let rowIndex = (squareIndex - (squareIndex % 10)) / 10;
  let colIndex = squareIndex % 10;
  if (computerBoard.board[rowIndex][colIndex] === null) {
    messageEl.innerText = MESSAGES.miss;
    computerBoard.board[rowIndex][colIndex] = -1;
    renderBoard();
  } else if (computerBoard.board[rowIndex][colIndex] === 2) {
    messageEl.innerText = MESSAGES.hit;
    computerBoard.board[rowIndex][colIndex] = -2;
    // isSunk(computerBoard.board, squareIndex);
    renderBoard();
  }
  document.getElementById("board").removeEventListener("click", playerClick);
  console.log(computerBoard.board);
  // isSunk(squareIndex);
  turn = PLAYERS.computer;
  setTimeout(() => {
    render();
  }, 3000);
  setTimeout(() => {
    computerMove();
  }, 3000);
}

//computer move
function computerMove() {
  let computerGuesses = [];
  let colCoordinate = Math.floor(Math.random() * 10);
  let rowCoordinate = Math.floor(Math.random() * 100);
  let computerGuess = rowCoordinate + colCoordinate;
  for (guess of computerGuesses) {
    if (computerGuess === guess) {
      return;
    } else if (computerGuess !== guess) {
      computerGuesses.push(computerGuess);
      if (playerBoard.board[rowIndex][colIndex] === null) {
        messageEl.innerText = MESSAGES.miss;
        playerBoard.board[rowIndex][colIndex] = -1;
        renderBoard();
      } else if (playerBoard.board[rowIndex][colIndex] === 1) {
        messageEl.innerText = MESSAGES.hit;
        computerBoard.board[rowIndex][colIndex] = -2;
        // isSunk(computerBoard.board, squareIndex);
        renderBoard();
      }
    }
  }
  turn = PLAYERS.player;
  setTimeout(() => {
    render();
  }, 3000);
  document.getElementById("board").addEventListener("click", playerClick);
  console.log("computer Guess", computerGuess);
}
//randomly places 4 ships in a horizontal direction
//small bug: will randomly skip placing ship if too many tries
function horizontalPlacement(board, ship, squareValue) {
  //generate two random start coordinates
  let colCoordinate = Math.floor(Math.random() * 10);
  let rowCoordinate = Math.floor(Math.random() * 10);
  let isValid = false;
  // console.log(rowCoordinate, colCoordinate);
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

console.log("pboard", playerBoard);
console.log("cboard", computerBoard);

//ship hit
function isHit(clickedSquare) {
  //does square have a value === to a ship?
  //if it does, update messageEl t0 hit
  //change the color of the clicked board square to red
  //update the hit tracker
  //check the win condition
  //otherwise
  // else {
  //   messageEl.innerText = MESSAGES.miss;
  // }
  //update messageEl to miss
  //change the color of the square to blue
}

//sunk function
// function isSunk(board, clickedSquare) {
//   let start = clickedSquare;
//   let rowIndex = (start - (start % 10)) / 10;
//   let colIndex = start % 10;
//   checkLeft(board, clickedSquare);
//   checkRight(board, clickedSquare);
//if the click is a hit
//check immediately to the left
//if is null, 1 or -1 check to the right
//else if is -2
//repeat left check
//check to right of click
//if is null, 1, or -1 check to the left
//else if it is -2,
//repeat right check
// }

// function checkLeft(board, clickedSquare) {
//   let start = clickedSquare;
//   let rowIndex = (start - (start % 10)) / 10;
//   let colIndex = start % 10;
//   if (
//     board[rowIndex][colIndex - 1] === null ||
//     board[rowIndex][colIndex - 1] === 1 ||
//     board[rowIndex][colIndex - 1] === -1
//   ) {
//     checkRight(clickedSquare);
//     return;
//   } else if (board[rowIndex][colIndex - 1] === -2) {
//     checkLeft();
//   }
// }
// function checkRight(board, clickedSquare) {
//   let start = clickedSquare;
//   let rowIndex = (start - (start % 10)) / 10;
//   let colIndex = start % 10;
//   if (
//     board[rowIndex][colIndex + 1] === null ||
//     board[rowIndex][colIndex + 1] === 1 ||
//     board[rowIndex][colIndex + 1] === -1
//   ) {
//     return;
//   } else if (board[rowIndex][colIndex + 1] === -2) {
//     checkRight();
//   }
// }

//init playerBoard and computer board
function initPlayerBoard() {
  playerBoard = new Board();
  horizontalPlacement(playerBoard.board, SHIPS.dinghy, 1);
  horizontalPlacement(playerBoard.board, SHIPS.sloop, 1);
  horizontalPlacement(playerBoard.board, SHIPS.galleon, 1);
  horizontalPlacement(playerBoard.board, SHIPS.queenAnnesRevenge, 1);
}
function initComputerBoard() {
  computerBoard = new Board();
  horizontalPlacement(computerBoard.board, SHIPS.dinghy, 2);
  horizontalPlacement(computerBoard.board, SHIPS.sloop, 2);
  horizontalPlacement(computerBoard.board, SHIPS.galleon, 2);
  horizontalPlacement(computerBoard.board, SHIPS.queenAnnesRevenge, 2);
}

//render playerBoard and computerBoard
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
