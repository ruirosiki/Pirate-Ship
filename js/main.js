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
const SHIPS = {
  dinghy: new Ship(2, 0, false),
  sloop: new Ship(3, 0, false),
  galleon: new Ship(4, 0, false),
  queenAnnesRevenge: new Ship(5, 0, false),
};
//defines a class for the board - allows creation of separate boards (computer and player or eventually player1 and player2)
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

console.log(SHIPS.dinghy);
console.log(SHIPS.sloop);
console.log(SHIPS.galleon);
console.log(SHIPS.queenAnnesRevenge);
//win condition
//eventually make this dynamic by determining the total max hits by calculating the total number of ships lengths
const MAX_HITS = 17;
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
// console.log(MESSAGES.cTurn);

//STATE VARIABLES
let playerBoard;
let computerBoard;
let turn;
let winner;
let shipLocation;

//CACHED DOM ELEMENTS

const messageEl = document.querySelector("#message");
// console.log(messageEl);
const playAgainButton = document.querySelector("button");
// console.log(playAgainButton);
const boardEls = [...document.querySelectorAll("#board > div")];
// console.log(boardEls);

//Event listeners
document.getElementById("board").addEventListener("click", playerClick);
document.getElementById("play-again").addEventListener("click", init);

//functions
init();

function init() {
  playerBoard = new Board();
  computerBoard = new Board();
  initPlayerBoard();
  initComputerBoard();
  turn = PLAYERS.player;
  winner = false;
  render();
}
//render
function render() {
  renderTurnOrder();
  renderPlayAgain();
  renderBoard();
}
//map the player board to the boardEls
// console.log(cellValue);
// console.log(colIndex);
// console.log(squareIndex);
// console.log(cellEl);
// console.log(cellId);

function renderBoard() {
  if (turn === "player") {
    computerBoard.board.forEach((rowArray, squareIndex) => {
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
  } else if (turn === "computer") {
    playerBoard.board.forEach((rowArray, squareIndex) => {
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
  console.log(computerBoard.board);
  // isSunk(squareIndex);
  turn = PLAYERS.computer;
  setTimeout(() => {
    render();
  }, 3000);
}

//computer move

// function computerMove() {
//   let hitRow = Math.floor(Math.random() * 10);
//   let hitCol = Math.floor(Math.random() * 10);
//   while (playerBoard.board[hitRow][hitCol] !=== null) {

//   }
// }

//if it is legal, add into boardArray

function horizontalPlacement(board, ship, squareValue) {
  //generate two random start coordinates
  let colCoordinate = Math.floor(Math.random() * 10);
  let rowCoordinate = Math.floor(Math.random() * 10);
  let isValid = false;
  console.log(rowCoordinate, colCoordinate);
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
// horizontalPlacement(playerBoard.board, SHIPS.dinghy, 1);
// horizontalPlacement(playerBoard.board, SHIPS.sloop, 1);
// horizontalPlacement(playerBoard.board, SHIPS.galleon, 1);
// horizontalPlacement(playerBoard.board, SHIPS.queenAnnesRevenge, 1);
// horizontalPlacement(computerBoard.board, dinghy, 2);
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

//render playerBoard and computer board
function initPlayerBoard() {
  horizontalPlacement(playerBoard.board, SHIPS.dinghy, 1);
  horizontalPlacement(playerBoard.board, SHIPS.sloop, 1);
  horizontalPlacement(playerBoard.board, SHIPS.galleon, 1);
  horizontalPlacement(playerBoard.board, SHIPS.queenAnnesRevenge, 1);
}
function initComputerBoard() {
  horizontalPlacement(computerBoard.board, SHIPS.dinghy, 2);
  horizontalPlacement(computerBoard.board, SHIPS.sloop, 2);
  horizontalPlacement(computerBoard.board, SHIPS.galleon, 2);
  horizontalPlacement(computerBoard.board, SHIPS.queenAnnesRevenge, 2);
}
