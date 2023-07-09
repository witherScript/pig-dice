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
    this.winner = '';
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
    delete player.turn;
    this.isWinner(player) ? this.gameOver = true : this.incrementTurn();
  }

  isWinner(player) {
    if (player.score >= 100) {
      player.winner = true;
      if (this.currentTurn.toString() === '1') {
        this.winner = 'Player 1';
      }
      else {
        this.winner = 'Player 2';
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
  document.getElementById('current-player').innerText = `Player ${game.currentTurn}`;
  document.getElementById('current-player-score').innerText = game.whoseTurn().turn.score;
}


function unHideElement(element) {
  console.log(element);
  element.classList.remove('hidden');
  return true;
}

function hideElement(element) {
  element.classList.add('hide');
  return true;
}

function announceWinner(game) {
  document.getElementById('game-start').classList.add('hidden');
  document.querySelector('h1#winner').innerText = game.winner;
}

function handleTurn(game) {
  const currentTurn = game.whoseTurn();
  game.turn(currentTurn);
  const result = currentTurn.turn.roll();
  if (!currentTurn.turn.turnOver && game.gameOver === false) {
    document.querySelector('span#roll-result').innerText = result;
  }
  else if (game.gameOver === false) {
    game.handleOne(currentTurn);
  }
  else {
    announceWinner(game);
  }
  populateCurrentScores(game);
}

function startGame() {
  hideElement(document.querySelector('button#start'));
  unHideElement(document.querySelector('button#reset'));
  unHideElement(document.querySelector('div#game-start'));

  const game = new Game();

  const rollBtn = document.querySelector('button#roll');
  const holdBtn = document.querySelector('button#hold');

  rollBtn.addEventListener('click', () => handleTurn(game));
  holdBtn.addEventListener('click', () => {
    game.hold(game.whoseTurn());
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