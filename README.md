## Pirate Ships

A thematic pirates version of the classic strategy game battleship. Players will play against the computer to try and sink the computers pirate ships before the computer can sink their pirate ships.
The player and computers ships are randomly placed at the beginning of the game. The player will start first and alternate turns with the computer. The player will choose a coordinate to attack by clicking on the square. The game will let the player know if the attack was a miss or a hit. If it’s the final hit on a ship, the game will let the player know that a ship was sunk. After the players turn, the computer will then take a turn. Play will alternate back and forth until a winner is determined. Once the game has ended, the player will be given the opportunity to reset the game and play it again.

## User Stories for “Pirate Ships” a Battleship style game

1. As a user, I want to see the turn order so that I know who’s turn it is.
2. As a user, I want to click on a square to make a move.
3. As a user, I want to see if my move was a hit or a miss so I know where to go next.
4. As a user, I want to know if I sunk a ship because I can keep track of who’s winning.
5. As a user, I want to know when all ships have been sunk so I know who won.
6. As a user, I want to be able to replay the game because the game is fun.
7. As a user, I want to see thematic text and visuals because it makes the game feel alive.

## Technologies Used

HTML
CSS
JavaScript

## PseudoCode

Required Constants

1. Grid object
   1.1) null for empty squares
   1.2) 2 for enemy ship – color is same as null color
   1.3) 1 for squares that have been hit – red color
   1.4) 0 for ship location – brown color
   1.5) -1 for squares that were a miss – blue color

2. Ship object
   2.1) length (different sized ships),
   2.2) hit count (number of hits the ship has. Initially set to 0.),
   2.3) sunk to determine if the ship is sunk (boolean).
3. Win condition when playerHits === maxHits
4. maxHits which indicates the total number of hits for win. (10 hits)
5. Message object to hold all the messages for message element
   5.1) “Players Turn”
   5.2) “Computers Turn”
   5.3) “You hit a ship”
   5.4) “Your ship was hit”
   5.5) “You sunk a ship”
   5.6) “Your ship was sunk”
   5.7) “You sunk all the ships. Congrats you win!”
   5.8) “All your ships are sunk. The computer wins”
   5.9) “Press the play again button to have another go?”

State Variables

1. Player board array 10x10 grid
2. Computer board array 10x10 grid
3. Turn variable to keep track of who’s turn it is – initially set to players turn
4. winner variable to determine if there is a winner.
5. Ship location variable to track the location of the ships on the board???

Element Variables

1. Elements that represent the board.
2. Message element to update turn order and win condition
3. Play again button
   Upon loading the app should…
4. Initialize the state variables
   a. Initialize the board grids to all nulls to represent empty squares.
   b. Initialize ships onto board for computer. Enemy ship squares should show as empty on initialization.
   c. Initialize player ships onto player board.
   d. Initialize turn variable to player
   e. Initialize winner to null
5. Render those values to the page
6. Wait for the user to click a square to make first move.

Functions

1. Player click
   a. Check if the square has already been clicked.
   i. If the square has a value other than null, player cannot click on it.
   b. Hit function
   c. Ship sunk function
   d. Check win condition function
   e. Update turn order variable
   f. Render board
2. Replay Button Click
   a. Run init function to reinitialize the game to beginning state
3. Render function
   a. Render the board
   b. Render the player ships
   c. Render the computer ships
   d. Render the current message
   e. Render play again button
4. Render board  
   a. renders the initial board state
   b. array of 100 elements (0-99) initially containing all nulls.
5. Render ships
   a. Only renders on first call to render.
   b. Renders both player and computer ships to the board.
   c. Uses the generate ship location’s function or renders the hard coded ship locations.
6. Render message –
   a. initializes to players turn message
   b. updates throughout the game depending on current action – see message object.
7. Computer Move – while loop (while randomly generated coordinate does not equal null generate a random coordinate until we find one that is null)
   a. Generate a random coordinate
   b. Check if random coordinate is null
   i. If it is null, then the location is legal

1) Call the hit function
2) Return to break the loop.
   c. Change turn order
   d. Render the updated game state

8. Generate ship locations –
   a. Track how many ships have been placed.
   i. horizontal ship placement – should be function?

1) generate a start coordinate for ship placement
2) check if coordinate is already occupied (does not equal null)
3) check to the right of the coordinate for legal placement. (Column coordinate plus ship length minus 1)
   a. If the coordinate is out of bounds (greater than the length of the row) or coordinate is occupied
   i. Return
   ii. Generate a new start coordinate and repeat
   b. If the coordinate is in bounds
   i. If ship length is greater than 2
4) Check one more to the right of coordinate (column coord inate plus 2, etc.)
   a. If it is out of bounds or occupied,
   i. Return
   ii. Generate a new coordinate
5) If it is a legal placement (all coordinates are in bounds and not occupied.
   a. Change value of coordinate to player (0) or computer (2) – use loop
   b. Return
   c. Repeat until all ships are placed.
   ii. Vertical ship placement – should be own function?
6) generate a start coordinate for ship placement
7) check if coordinate is already occupied (does not equal null)
8) check to the right of the coordinate for legal placement. (Row coordinate plus ship length minus 1)
   a. If the coordinate is out of bounds (greater than the length of the column) or coordinate is occupied
   i. Return
   ii. Generate a new start coordinate and repeat
   b. If the coordinate is in bounds
   i. If ship length is greater than 2
9) Check one more to the right of coordinate (row coordinate plus 2, etc.)
   a. If it is out of bounds or occupied,
   i. Return
   ii. Generate a new coordinate
   ii. If it is a legal placement (all coordinates are in bounds and not occupied.
10) Change value of coordinates for ships values to player(0) or computer(2)
11) Return

9. Check win condition.
   a. Are all ships sunk?
   b. If yes, there is a winner
   i. Message updates to “Winners message”

1) Winner variable is true
2) Play again button displays
   ii. else
3) return
   c. Render play again button

10. Hit function:
    a. Check if square has a ship value in it.
    b. If square does have ship value
    i. Message updates to “Hit”
    ii. Board square updates to red color
    iii. hit tracker updates with new hit
    iv. check win condition
    c. else
    i. message updates to “miss”
    ii. board square updates to missed color – blue
11. Ship sunk function
    a. Take coordinate of last hit
    b. Determine which ship the hit belongs to
    c. Start at the beginning of the ship coordinates
    d. Cycle through each coordinate of the ship
    i. If ship has any null then the ship is not sunk
    ii. Else if the ship has all 1’s for a value then the ship is sunk.

IceBox Features

1. Ability for players to place battleships
2. Ability to play against another player
3. Updated visuals to make the game more visually appealing
4. Find treasure feature to heal one kit on battleship
