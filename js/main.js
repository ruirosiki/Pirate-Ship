// REQUIRED CONSTANTS

//players constant
const PLAYERS = {
  player: "player",
  computer: "computer",
};

//determines the board squares status
const BOARD_SQUARE = {
  null: "transparent",
  2: "transparent",
  1: "red",
  0: "brown",
  "-1": "blue",
};
//defines a class for ship - allows to create ships of different lengths
class Ship {
  constructor(length, hitCount, isSunk) {
    this.length = length;
    this.hitCount = hitCount;
    this.isSunk = false;
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
const dinghy = new Ship(2, 0, false);
const sloop = new Ship(3, 0, false);
const galleon = new Ship(4, 0, false);
const queenAnnesRevenge = new Ship(5, 0, false);
// console.log(dinghy);
// console.log(sloop);
// console.log(galleon);
// console.log(queenAnnesRevenge);

//win condition
//eventually make this dynamic by determining the total max hits by calculating the total number of ships lengths
const MAX_HITS = 17;
const MESSAGES = {
  pTurn: "Player's Turn",
  cTurn: "Computer's Turn",
  pHit: "You hit a ship",
  cHit: "Your ship was hit",
  pSunk: "You sunk a ship",
  cSunk: "Your ship was sunk",
  pWin: "You sunk all the ships. Congrats you win!",
  cWin: "All your ships are sunk. The computer wins",
  playAgain: "Press the play again button to have another go!",
};
// console.log(MESSAGES.cTurn);

//STATE VARIABLES
let playerBoard;
let computerBoard;
// console.log(playerBoard);
// console.log(computerBoard);
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
  // render();
}

// console.log(winner);
// console.log(playerBoard);
// console.log(computerBoard);

//map the player board to the boardEls
renderBoard() {

}

function playerClick(event) {
  console.log(event.target);
}
