class Player {
  constructor() {
    this.name = '';
    this.score = 0;
  }
}

/*
 create a box that holds score and whether or not the turn is over
 inside of that box, include the functionality to roll dice or end the turn
 if I roll a 1, and functionality to get the score for the current turn
*/
class Turn {
  constructor() {
    this.score = 0; // score for the current turn
    this.turnOver = false;
  }
  roll() {
    const rollScore = Math.floor(Math.random() * 6) + 1;
    if (rollScore !== 1) {
      this.score += rollScore;
      return rollScore;
    }
    else {
      this.score = 0;
      this.turnOver = true;
    }
  }
  getTurnScore() {
    return this.score;
  }
}

class Game {

  constructor() {
    this.player1 = new Player();
    this.player1.name = 'player1';
    this.player2 = new Player();
    this.player2.name = 'player2';

    this.currentTurn = 1;
    this.gameOver = false;
    this.winner = '';
  }

  turn(player) {
    player.turn = new Turn();
  }

  hold(player) {
    if (player.turn) {
      player.score += player.turn.score;
      document.querySelector(`span#score-${player.name}`).innerText = player.score;
      this.isWinner(player) ? this.gameOver = true : this.incrementTurn();
      player.turn = null;
  }
    
  }

  handleOne(player) {
    player.turn.score = 0;
    player.turn = null;
    document.querySelector(`span#score-${player.name}`).innerText = player.score; 
    this.isWinner(player) ? this.gameOver = true : this.incrementTurn();
  }

  isWinner(player) {
    if (player.score >= 20) {
      player.winner = true;
      if (this.currentTurn.toString() === '1') {
        this.winner = 'Player 1';
        this.gameOver = true;
      }
      else {
        this.winner = 'Player 2';
        this.gameOver = true;
      }
    }
    else {
      return false;
    }
    return this.winner;
  }

  incrementTurn() {
    if (this.currentTurn === 2) {
      this.currentTurn = 1;
    }
    else {
      this.currentTurn++;
    }

  }
  whoseTurn() {
    if (this.currentTurn % 2 === 0) {
      return this.player2;
    }
    else {
      return this.player1;
    }
  }

}

/*
  UI Logic
*/
function populateCurrentScores(game) {
  const currentPlayer = game.whoseTurn();
  document.getElementById('current-player').innerText = `Player ${game.currentTurn}`;
  if (currentPlayer.turn) {
    document.getElementById('current-player-score').innerText = currentPlayer.turn.score;
  } else {
    document.getElementById('current-player-score').innerText = 0;
  }
}

function unHideElement(element) {
  element.classList.remove('hidden');
  return true;
}

function hideElement(element) {
  element.classList.add('hidden');
  return true;
}

function announceWinner(game) {
  unHideElement(document.querySelector('div#win'));
  document.getElementById('game-start').classList.add('hidden');
  document.querySelector('h1#winner').innerText = game.winner;


  document.querySelector(`span#score-player1`).innerText = game.player1.score;
  document.querySelector(`span#score-player2`).innerText = game.player2.score;

}

/*
  1. undefined for hold -> turn.score doesn't exist
  2. game.turn() -> creates a turn for the current player
  3. ONLY the roll button is linked to the game.turn() -> handleTurn

*/

//roll

function handleTurn(game) {
  const currentTurn = game.whoseTurn();

  if (!currentTurn.turn) {
    game.turn(currentTurn);
  }

  const result = currentTurn.turn.roll();

  if (!currentTurn.turn.turnOver && !game.gameOver) {
    unHideElement(document.querySelector('button#hold'));
    document.querySelector('span#roll-result').innerText = result;
    populateCurrentScores(game);
    unHideElement(document.querySelector('div#result'));
  }
  else if (!game.gameOver) {
    game.handleOne(currentTurn);
    populateCurrentScores(game);
    if (game.gameOver) {
      announceWinner(game);
    }
  }
  else {
    announceWinner(game);
  }
}

function startGame() {

  hideElement(document.querySelector('button#hold'));
  hideElement(document.querySelector('button#start'));
  unHideElement(document.querySelector('div#game-start'));

  document.querySelector('button#start').innerText = 'Reset Game';

  const game = new Game();

  const rollBtn = document.querySelector('button#roll');
  const holdBtn = document.querySelector('button#hold');

  rollBtn.addEventListener('click', () => handleTurn(game));
  holdBtn.addEventListener('click', () => {
    const currentTurn = game.whoseTurn();
    game.hold(currentTurn);
    populateCurrentScores(game);
    if (game.gameOver) {
      announceWinner(game);
    }
  });
}

window.addEventListener("load", function () {

  const startBtn = document.getElementById('start');
  startBtn.addEventListener('click', startGame);

});