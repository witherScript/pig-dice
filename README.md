Describe: Player
Test: new Player(); should create a player object with score === 0
Code:
```javascript
 const player = new Player();
```
Expected State of player:
score === 0;


Describe:  Turn
Test:  calling this returns an integer between 1 and 6
Code: 
```javascript
  const turn = new Turn();
  turn.roll();
```
Expected return value one of [1, 2, 3, 4, 5, 6];