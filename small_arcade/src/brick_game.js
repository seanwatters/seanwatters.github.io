class BrickGame {

  addPaddle() {
    let paddle = new BrickPaddle;
    paddle.createPaddle();
  }

  addBall() {
    let ball = new BrickBall;
    ball.createBall();
  }

  start() {
    let score = document.getElementById('score');
    score.textContent = 'score:0';

    let game = document.getElementById('game');
    let startButton = document.createElement('button');

    startButton.textContent = 'start'
    startButton.id = 'start'

    startButton.addEventListener('click', () => {
      startButton.style.display = 'none';
      addBricks();
      addBall();
    })

    let highScores = document.getElementById('high-scores');

    loadScores();

    function loadScores() {
      fetch('https://agile-wildwood-13888.herokuapp.com/scores')
      .then(res => res.json())
      .then(json => {
        displayScores(json);
      })
    }

    function displayScores(json) {
      let scoreArr = [];
      for (let i = 0; i < json.length; i++) {
        if (json[i].game_id == 3) {
          scoreArr.push(json[i]);
        }
      }
      console.log(scoreArr);
      scoreArr.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));

      scoreArr.forEach((scr) => {
        let score = document.createElement('li');
        score.className += 'high-scores';
        score.textContent = `${scr.player}: ${scr.score}`;

        highScores.appendChild(score);
      });
    }

    game.appendChild(startButton);

    function addBricks() {

      let x = 5.2;
      let y = 10;

      let i;

      for (i = 1; i <= 30; i++) {
        let brick = new Brick;
        brick.createBrick(x, y, i)

        x += 66

        if (i != 0 && i % 6 == 0) {
          y += 30;
          x = 5.2;
        }
      }
    }

    function addBall() {
      let ball = new BrickBall;
      ball.createBall();
    }
  }
}
