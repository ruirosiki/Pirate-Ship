# Pirate Ships

A thematic pirates version of the classic strategy game battleship. Players will play against the computer to try and sink the computers pirate ships before the computer can sink their pirate ships.
The player and computers ships are randomly placed at the beginning of the game. The player will start first and alternate turns with the computer. The player will choose a coordinate to attack by clicking on the square. The game will let the player know if the attack was a miss or a hit. If it’s the final hit on a ship, the game will let the player know that a ship was sunk. After the players turn, the computer will then take a turn. Play will alternate back and forth until a winner is determined. Once the game has ended, the player will be given the opportunity to reset the game and play it again.

# User Stories for “Pirate Ships” a Battleship style game

1. As a user, I want to see the turn order so that I know who’s turn it is.
2. As a user, I want to click on a square to make a move.
3. As a user, I want to see if my move was a hit or a miss so I know where to go next.
4. As a user, I want to know if I sunk a ship because I can keep track of who’s winning.
5. As a user, I want to know when all ships have been sunk so I know who won.
6. As a user, I want to be able to replay the game because the game is fun.
7. As a user, I want to see thematic text and visuals because it makes the game feel alive.

# Technologies Used

1. HTML
2. CSS
3. JavaScript

# Project Wireframe

![HTML Elements](Pirate-Ship/assets/Project 1\_ Pirate Ships-1-5.jpg)
![Main Screen](Pirate-Ship/assets/Project 1\_ Pirate Ship-2-2.jpg)
![Play Screen](Pirate-Ship/assets/Project 1\_ Pirate Ships-3-3.jpg)
![Final Screen](Pirate-Ship/assets/Project 1\_ Pirate Ships-4-4.jpg)

# PseudoCode

## Required Constants

1. Grid object

   - 1.1) null for empty squares
   - 1.2) 2 for enemy ship – color is same as null color
   - 1.3) 1 for squares that have been hit – red color
   - 1.4) 0 for ship location – brown color
   - 1.5) -1 for squares that were a miss – blue color

2. Ship object
   - 2.1) length (different sized ships),
   - 2.2) hit count (number of hits the ship has. Initially set to 0.),
   - 2.3) sunk to determine if the ship is sunk (boolean).
3. Win condition when playerHits === maxHits
4. maxHits which indicates the total number of hits for win. (10 hits)
5. Message object to hold all the messages for message element
   - 5.1) “Players Turn”
   - 5.2) “Computers Turn”
   - 5.3) “You hit a ship”
   - 5.4) “Your ship was hit”
   - 5.5) “You sunk a ship”
   - 5.6) “Your ship was sunk”
   - 5.7) “You sunk all the ships. Congrats you win!”
   - 5.8) “All your ships are sunk. The computer wins”
   - 5.9) “Press the play again button to have another go?”

## State Variables

1. Player board array 10x10 grid
2. Computer board array 10x10 grid
3. Turn variable to keep track of who’s turn it is – initially set to players turn
4. winner variable to determine if there is a winner.
5. Ship location variable to track the location of the ships on the board???

## Element Variables

1. Elements that represent the board.
2. Message element to update turn order and win condition
3. Play again button
   Upon loading the app should…
4. Initialize the state variables
   - 4.1) Initialize the board grids to all nulls to represent empty squares.
   - 4.2) Initialize ships onto board for computer. Enemy ship squares should show as empty on initialization.
   - 4.3) Initialize player ships onto player board.
   - 4.4) Initialize turn variable to player
   - 4.5) Initialize winner to null
5. Render those values to the page
6. Wait for the user to click a square to make first move.

## Functions

1. Player click
   - 1.1) Check if the square has already been clicked.
     - If the square has a value other than null, player cannot click on it.
   - 1.2) Hit function
   - 1.3) Ship sunk function
   - 1.4) Check win condition function
   - 1.5) Update turn order variable
   - 1.6) Render board
2. Replay Button Click
   - 2.1) Run init function to reinitialize the game to beginning state
3. Render function
   - 3.1) Render the board
   - 3.2) Render the player ships
   - 3.3) Render the computer ships
   - 3.4) Render the current message
   - 3.5) Render play again button
4. Render board
   - 4.1) renders the initial board state
   - 4.2) array of 100 elements (0-99) initially containing all nulls.
5. Render ships
   - 5.1) Only renders on first call to render.
   - 5.2) Renders both player and computer ships to the board.
   - 5.3) Uses the generate ship location’s function or renders the hard coded ship locations.
6. Render message –
   - 6.1) initializes to players turn message
   - 6.2) updates throughout the game depending on current action – see message object.
7. Computer Move – while loop (while randomly generated coordinate does not equal null generate a random coordinate until we find one that is null)

   - 7.1) Generate a random coordinate
   - 7.2) Check if random coordinate is null
     - If it is null, then the location is legal
     - Call the hit function
     - Return to break the loop.
   - 7.3) Change turn order
   - 7.4) Render the updated game state

8. Generate ship locations –

   - 8.1) Track how many ships have been placed.
   - 8.2) Call horizontal ship placement function
   - 8.3) Call vertical ship placement function
   - 8.4) Return

9. Check win condition.

   - 9.1) Are all ships sunk?
   - 9.2) If yes, there is a winner
     - Message updates to “Winners message”
       - Winner variable is true
       - Play again button displays
     - else
       - return
     - Render play again button

10. Hit function:
    - 10.1) Check if square has a ship value in it.
    - 10.2) If square does have ship value
      - Message updates to “Hit”
      - Board square updates to red color
      - hit tracker updates with new hit
      - check win condition
    - 10.3) else
      - message updates to “miss”
      - board square updates to missed color – blue
11. Ship sunk function

    - 11.1) Take coordinate of last hit
    - 11.2) Determine which ship the hit belongs to
    - 11.3) Start at the beginning of the ship coordinates
    - 11.4) Cycle through each coordinate of the ship
    - 11.5) If ship has any null then the ship is not sunk
      - Else if the ship has all 1’s for a value then the ship is sunk.

12. Horizontal ship placement

- 12.1) generate a start coordinate for ship placement
- 12.2) check if coordinate is already occupied (does not equal null)
- 12.3) check to the right of the coordinate for legal placement. (Column coordinate plus ship length minus 1)

  - If the coordinate is out of bounds (greater than the length of the row) or coordinate is occupied
    - Return
  - Generate a new start coordinate and repeat
  - If the coordinate is in bounds
    - If ship length is greater than 2
      - Check one more to the right of coordinate (column coordinate plus 2, etc.)
        - If it is out of bounds or occupied,
        - Return
      - Generate a new coordinate
    - If it is a legal placement (all coordinates are in bounds and not occupied)
      - Change value of coordinate to player (0) or computer (2) – use loop
      - Return
  - Repeat until all ships are placed.

  12. Vertical ship placement

- 12.1) generate a start coordinate for ship placement
- 12.2) check if coordinate is already occupied (does not equal null)
- 12.3) check to the right of the coordinate for legal placement. (row coordinate plus ship length minus 1)
  - If the coordinate is out of bounds (greater than the length of the column) or coordinate is occupied
    - Return
  - Generate a new start coordinate and repeat
  - If the coordinate is in bounds
    - If ship length is greater than 2
      - Check one more to the right of coordinate (row coordinate plus 2, etc.)
        - If it is out of bounds or occupied,
        - Return
      - Generate a new coordinate
    - If it is a legal placement (all coordinates are in bounds and not occupied)
      - Change value of coordinate to player (0) or computer (2) – use loop
      - Return
  - Repeat until all ships are placed.

## IceBox Features

- [ ] Ability for players to place battleships
- [ ] Ability to play against another player
- [ ] Updated visuals to make the game more visually appealing
- [ ] Find treasure feature to heal one kit on battleship
