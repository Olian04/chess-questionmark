# iprog-project

## Dev Locally

1. Clone this repo
2. Checkout your own branch
3. Install nodejs
4. Navigate to the repo
5. Natigate to the `app` folder
6. Intstall deps: `npm install`
7. Run dev server: `npm run dev`
8. Open browser to `localhost:3000` 

## Usage Sequence

1. Register/Login screen
2. Profile Page
3. Play Screen
4. Game Screen
5. Replay Screen

## Screens

### Login/Register Screen

![](./prototype/login_design.PNG)

### Profile Screen

![](./prototype/profile_design.PNG)

### Settings Screen

![](./prototype/settings_design.PNG)

### Play Screen

![](./prototype/play_design.PNG)

### Game Screen

![](./prototype/game_design.PNG)

### Replay Screen

![](./prototype/replay_design.PNG)


## Minimal Viable Product Featureset

* Login with google.
* Create a match.
* List all matches.
* Join a match.
* Play a chess game agains another player.
* Play a solo practice game vs AI, where a specific board state is loaded, where it is possible to "mate" in 2 or 3 turns, and play to see how many turns it takes you to "mate".
* Win / Loose / Draw.


## Extended Featureset (Streach goals)

* Game timer (stop to end turn).
* Watch along chat / aka spectators
* Clip functionality, like twich. Generate a gif from a set of FEN strings using a firebase cloud function, store the FEN string in firebase, and return a URL for the gif.
* Feature new clips on the front page.
* Replay matches (replay sequence of FEN strings).

## Resources

Forsyth-Edwards Notation (FEN): https://www.chess.com/terms/fen-chess <br>
Chess board component: https://www.chessboardjsx.com/ <br>
Chess logic: https://github.com/jhlywa/chess.js <br>
Chess AI: https://github.com/nmrugg/stockfish.js <br>
~~Random starting board states: https://chessblunders.org/ <br>~~
Puzzle based starting board state: https://www.chess.com/news/view/published-data-api#pubapi-daily-puzzle
Profile pictures: https://en.gravatar.com/ <br>

Maybe look into Lichess (might be overkill): https://lichess.org/api#section/Authentication

Figma project: https://www.figma.com/file/3iUKHHol5BU6zsU5zE5wP7/prototype <br>
