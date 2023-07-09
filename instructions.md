
What will happen when a user clicks "Play"?


Score for player 1's turn is set to 0. -> turn score (added to overall if 1 is not rolled)

Current Turn set to 'player rand num Math.floor((0,1)*2)'
get Current -> getCurrent % 2 , player1 goes first -> chatGPT


What objects will you need?
-> Player (scoreCummulative, name, isWinner)
-> Dice (value, roll)
-> Turn 
(currentScore, 
players{}, 
startTurn,

//1 -> end turn, no score added to overall endTurn 

//100-> gameOver, player.scoreCummulative >= 100, player.isWinner === true

hold-> endTurn, add to overall score

endTurn -> ends when 1 is rolled or if hold,

addToScore ? 1: resetScore, !===1: add to cummulativeScore
rollAgain (true, false), 

if current+Player.scoreCummulative >= 100,

)

Game (
newGame -> 
  2 Players, scores for each player are set to 0.
  first = math random (0,1) -> randomly chooses who goes first


-> currentTurn
  for every turn
    -> currentTurn = newTurn(player)

startGame (currentTurn -> (Player)),  
gameOver -> displays winner, unhides reset
turn -> rolls, holds, determines if player)


How will these be triggered throughout the gameplay?


How will information be collected from the user? How will it be displayed?


When you have a broad overview of how you want to build your game, identify the simplest behavior, and perhaps what behaviors to tackle after that. Remember to start simple and work one step at a time.



Code
Pick just one prompt below to complete, and then start by completing the warm up.

Pig Dice
trying to get to 100
two players roll dice and keep adding up score,
if any of the 

-> Hold


Write a program where two users can play Pig dice against each other. Start with your business logic, and once it is completed move onto your user interface logic.




Use test-driven development to create your business logic. Include pseudocode tests in your README. After every passing test, make sure to commit your code.

Make sure that your user interface and business logics are clearly separated, and practice separation of concerns when designing your user interface function.

