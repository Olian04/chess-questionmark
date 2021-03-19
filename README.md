# iprog-project

## Usage Sequence

1. Register/Login screen
2. Profile Page
3. Play Screen
4. Game Screen
5. Replay Screen

## Screens

### Login Screen

![](./prototype/login_design.PNG)

### Register Screen

![](./prototype/register_design.PNG)

### Profile Page

![](./prototype/profile_design.PNG)

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
Random starting board states: https://chessblunders.org/ <br>
Profile pictures: https://en.gravatar.com/ <br>

Maybe look into Lichess (might be overkill): https://lichess.org/api#section/Authentication

Figma project: https://www.figma.com/file/3iUKHHol5BU6zsU5zE5wP7/prototype <br>
