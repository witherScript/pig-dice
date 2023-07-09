class Player {
  constructor() {
    this.score = 0;
  }
}
class Turn {
  constructor() {
    this.score = 0;
  }
  roll() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
class Game {

  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.players = [this.player1, this.player2];

    this.currentTurn = 1;
    this.gameOver = false;
  }

  turn(player) {
    player.turn = new Turn();
    this.isWinner(player);
  }

  rollAgain(player) {
    const result = player.turn.roll();
    return result;
  }

  hold(player) {
    player.score += player.turn.score;
    this.isWinner(player);
    delete player.turn;
    this.incrementTurn();
  }

  handleOne(player) {
    player.turn.score = 0;
    this.incrementTurn();
    delete player.turn;
  }

  isWinner(player) {
    return player.score >= 100;
  }

  incrementTurn() {
    this.currentTurn++;
  }
}

/*
  UI Logic
*/


