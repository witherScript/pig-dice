class Player {
  constructor() {
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
    this.player2 = new Player();

    this.currentTurn = 1;
    this.gameOver = false;
  }

  turn(player) {
    player.turn = new Turn();
    this.isWinner(player);
  }

  hold(player) {
    player.score += player.turn.score;
    this.isWinner(player);
    delete player.turn;
    this.isWinner(player) ? this.gameOver = true : this.incrementTurn();
  }

  handleOne(player) {
    player.turn.score = 0;
    this.incrementTurn();
    delete player.turn;
    this.isWinner(player) ? this.gameOver = true : this.incrementTurn();
  }

  isWinner(player) {
    return player.score >= 100;
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

  if (game.currentTurn.toString() === '1') {
    document.getElementById('current-player').innerText = 'Player 1';
    document.getElementById('current-player-score').innerText = game.whoseTurn().turn.score;

  }
  else {
    document.getElementById('current-player').innerText = 'Player 2';
    document.getElementById('current-player-score').innerText = game.whoseTurn().turn.score;

  }

}

function unHideElement(element) {
  element.classList.remove('hidden');
  return true;
}

function hideElement(element) {
  element.classList.add('hide');
  return true;
}

function handleTurn(game) {
  const currentTurn = game.whoseTurn();
  game.turn(currentTurn);
  const result = currentTurn.turn.roll();
  if (!currentTurn.turn.turnOver) {
    document.querySelector('span#roll-result').innerText = result;
  }
}

function startGame() {
  unHideElement(document.querySelector('div#game-start'));
  const game = new Game();
  populateCurrentScores(game);

  const rollBtn = document.querySelector('button#roll');
  const holdBtn = document.querySelector('button#hold');

  rollBtn.addEventListener('click', () => handleTurn(game));
  holdBtn.addEventListener('click', () => game.hold(game.whoseTurn()));
  // input = button press
  //attach button press to whoseTurn
}



window.addEventListener("load", function () {

  const startBtn = document.getElementById('start');
  startBtn.addEventListener('click', startGame);

});