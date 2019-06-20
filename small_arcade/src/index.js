document.addEventListener('DOMContentLoaded', () => {
  main()

  function main() {
  	displayGamesList()
  }

  function displayGamesList() {
    displayGame("Rock Dodger");
    displayGame("Pong");
    // displayGame("Brick");
  }

  function displayGame(name) {
    let li = document.createElement('li');
    let game = document.createElement('button');
    game.id = name.toLowerCase().replace(' ', '-');
    game.textContent = name;
    li.appendChild(game);

    let gameList = document.getElementById('game-list');
    gameList.appendChild(li);

    game.addEventListener('click', () => {
      switch(name) {
        case "Rock Dodger":
          loadRockDodger();
          break;
        case "Pong":
          loadPong();
          break;
        case "Brick":
          loadBrick();
          break;
      }
    });
  }

  function clearAndDisplayGame() {
    let main = document.querySelector('main')
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    let score = document.createElement('div');
    score.id = 'score';

    let game = document.createElement('div');
    game.id = 'game';

    let leaderboard = document.createElement('div');
    leaderboard.id = 'leaderboard';
    leaderboard.textContent = 'leaderboard';

    let highScores = document.createElement('ol');
    highScores.id = 'high-scores';


    main.appendChild(score);
    main.appendChild(game);
    main.appendChild(leaderboard);
    main.appendChild(highScores);
  }

  function loadRockDodger() {
    clearAndDisplayGame();
    let rock_dodger = new RockDodger;

    rock_dodger.addDodger();
    rock_dodger.start();
  }

  function loadPong() {
    clearAndDisplayGame();
    let pong = new Pong();

    pong.addUserPaddle();
    pong.addComputerPaddle();
    pong.addBall();
    pong.start();
  }

  function loadBrick() {
    clearAndDisplayGame();
    let brick = new BrickGame;

    brick.addPaddle();
    brick.start();
  }
});
