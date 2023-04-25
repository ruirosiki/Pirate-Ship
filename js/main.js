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
  1: "yes", //player ship location
  "-1": -1, //miss
  "-2": -2, //hit ship
};
//defines a class for ship - allows to create ships of different lengths
class Ship {
  constructor(length, hitCount, isSunk, direction) {
    this.length = length;
    this.hitCount = hitCount;
    this.isSunk = false;
    this.direction = direction;
  }
}
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
//
const dinghy = new Ship(2, 0, false, 1);
const sloop = new Ship(3, 0, false, 0);
const galleon = new Ship(4, 0, false, 1);
const queenAnnesRevenge = new Ship(5, 0, false, 0);

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
  turn = PLAYERS.player;
  winner = null;
  render();
}
//render
function render() {
  renderTurnOrder();
  renderBoard();
}
//map the player board to the boardEls
//javascript hide/toggle element element.style.display = none.
function renderBoard() {
  // if (turn === "player") {
  //   for (i = 0; i < computerBoard.board.length; i++) {
  //     for (j = 0; j < computerBoard.board[i].length; j++) {
  //       boardEls[i][j] = computerBoard.board[i][j];
  //     }
  //   }
  // } else if (turn === "computer") {
  //   for (i = 0; i < playerBoard.board.length; i++) {
  //     for (j = 0; j < playerBoard.board[i].length; j++) {
  //       boardEls[i][j] = playerBoard.board[i][j];
  //     }
  //   }
  // }
}
// function renderBoard() {
//   playerBoard.board.forEach((cellValue, squareIndex) => {
//     const cellId = `s${squareIndex}`;
//     const cellEl = document.getElementById(cellId);
//   });
// }

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
  } else if (computerBoard.board[rowIndex][colIndex] === 2) {
    messageEl.innerText = MESSAGES.hit;
    computerBoard.board[rowIndex][colIndex] = -2;
  }
  console.log(computerBoard.board);
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
      }
    }
  } else horizontalPlacement(board, ship, squareValue);
}
horizontalPlacement(playerBoard.board, dinghy, 1);
horizontalPlacement(playerBoard.board, sloop, 1);
horizontalPlacement(playerBoard.board, galleon, 1);
horizontalPlacement(playerBoard.board, queenAnnesRevenge, 1);
horizontalPlacement(computerBoard.board, dinghy, 2);
console.log("pboard", playerBoard);
console.log("cboard", computerBoard);

//ship hit
function hit() {
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
