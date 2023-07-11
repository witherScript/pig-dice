class Player {
  constructor() {
    this.name = '';
    this.score = 0;
  }
}
class Turn {
  constructor() {
    this.score = 0;
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
    this.isWinner(player);
  }

  hold(player) {
    if (player.turn.score !== 0) {
      player.score += player.turn.score;
      delete player.turn;
      this.isWinner(player) ? this.gameOver = true : this.incrementTurn();
    }
  }

  handleOne(player) {
    player.turn.score = 0;
    delete player.turn;
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

}

/*
  1. undefined for hold -> turn.score doesn't exist
  2. game.turn() -> creates a turn for the current player
  3. ONLY the roll button is linked to the game.turn() -> handleTurn

*/


//roll
function handleTurn(game) {
  const currentTurn = game.whoseTurn();

  // Only create a new turn if there isn't one already
  if (!currentTurn.turn) {
    game.turn(currentTurn);
  }

  const result = currentTurn.turn.roll();

  if (!currentTurn.turn.turnOver && game.gameOver === false) {
    unHideElement(document.querySelector('button#hold'));
    document.querySelector('span#roll-result').innerText = result;
    populateCurrentScores(game);
    unHideElement(document.querySelector('div#result'));
  }
  else if (game.gameOver === false) {
    game.handleOne(currentTurn);
    delete currentTurn.turn; // delete the turn if 1 is rolled
    //on hold delete hold
    populateCurrentScores(game);
    let currentPlayer = game.whoseTurn().name; //currentPlayer = player1, score-player1 -> score-player2 ->
    document.querySelector(`h2#score-${currentPlayer}`).innerHTML = `${currentPlayer}: ` + (game.whoseTurn().score).toString();
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
    game.turn(currentTurn);
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