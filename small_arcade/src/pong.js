class Pong {

  constructor() {
    this.gameInterval = null;
    this.score = 0;
    this.leaderboard = [];
  }

  addUserPaddle() {
    const game = document.getElementById('game');
    let paddle = document.createElement('div');

    paddle.id = 'user-paddle';
    paddle.style.bottom = '160px';
    paddle.style.left = '10px';

    game.appendChild(paddle);
  }

  addComputerPaddle() {

    const game = document.getElementById('game');
    let paddle = document.createElement('div');

    paddle.id = 'computer-paddle';
    paddle.style.bottom = '160px';
    paddle.style.left = '380px';

    game.appendChild(paddle);
  }

  addBall() {

    const game = document.getElementById('game');
    let ball = document.createElement('div');

    ball.className += 'ball';
    ball.style.bottom = '193px';
    ball.style.left = '193px';

    game.appendChild(ball);
  }

  checkCollision(ballObj, user, comp ) {

    let min = 12
    let halfH = 40
    if (ballObj.x > 390 || ballObj.x < 0) {
      // check if ball hit front or back wall
      return this.endGame();
    } else if ((ballObj.x - user.x > 0) && (ballObj.x - user.x <= min) && (ballObj.y - user.y > 70) && (ballObj.y - user.y <= 85)) {
      // check top of user paddle for collision
      return 3;
    } else if ((ballObj.x - user.x > 0) && (ballObj.x - user.x <= min) && (ballObj.y - user.y > -10) && (ballObj.y - user.y <= 5)) {
      // check botton of user paddle for collision
      return 4;
    } else if ((ballObj.x - user.x > 0) && (ballObj.x - user.x <= min) && (ballObj.y - user.y > 5) && (ballObj.y - user.y <= 70)) {
      // check mid of user paddle for collision
      return 1;
    } else if ((comp.x - 6 - ballObj.x < min) && (ballObj.y - comp.y > 0) && (comp.y - ballObj.y <= 80)) {
      //check if ball hit computer paddle
      this.score += 1;
      return 1;
    } else if (ballObj.y > 385 || ballObj.y < 5) {
      return 2;
    }
    return 0;
  }

  update(ballObj, user, comp) {
    // ball movement
    switch(this.checkCollision(ballObj, user, comp)) {
      case 0:
        break;
      case 1: // ball hit paddle
        if (ballObj.vectY === 0) {
          ballObj.vectY = 3;
          ballObj.vectX = -ballObj.vectX;
        } else if (ballObj.vectX < 12 & ballObj.vectX > -24) {
          ballObj.vectX = -1.05 * ballObj.vectX;
        } else {
          ballObj.vectX = -ballObj.vectX;
        }
        break;
      case 2: // ball hit top or bottom
        ballObj.vectY = -ballObj.vectY;
        break;
      case 3: // ball hit top of user paddle
        ballObj.vectY = ballObj.vectY + 1;
        ballObj.vectX = -ballObj.vectX;
        break
      case 4: // ball hit bottom of user paddle
        ballObj.vectY = ballObj.vectY - 1;
        ballObj.vectX = -ballObj.vectX;
        break;
    }
    ballObj.x = ballObj.x + ballObj.vectX;
    ballObj.y = ballObj.y + ballObj.vectY;

    // computer movement
    if (ballObj.y - comp.y > 12) {
      comp.y = comp.y + ballObj.vectY;
    } else if (ballObj.y - comp.y < 12) {
      comp.y = comp.y - ballObj.vectY;
    }
  }

  draw(ballObj, user, comp) {
    let ball = document.querySelector('.ball');
    ball.style.left = ballObj.x +'px';
    ball.style.bottom = ballObj.y +'px';

    let player = document.getElementById('user-paddle');
    player.style.left = user.x+'px';
    player.style.bottom = user.y+'px';

    let computer = document.getElementById('computer-paddle');
    computer.style.left = comp.x+'px';
    computer.style.bottom = comp.y+'px';

    let score = document.getElementById('score');
    score.textContent = `score: ${this.score}`;

  }

  addListen(user) {
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowUp" && user.y < 310) {
        user.y = user.y + 7;
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowDown" && user.y > 7) {
        user.y = user.y - 7;
      }
    });
  }

  loadScores() {
    let that = this;
    return fetch('https://agile-wildwood-13888.herokuapp.com/scores')
    .then(res => res.json())
    .then(json => {this.filterAndSortScores(json)});
  }

  filterAndSortScores(json) {
    let scoreArr = [];
    for (let i = 0; i < json.length; i++) {
      if (json[i].game_id == 2) {
        scoreArr.push(json[i]);
      }
    }
    scoreArr.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
    scoreArr.length = 7;
    this.leaderboard = scoreArr;
    this.displayScores();
  }

  displayScores() {
    let highScores = document.getElementById('high-scores');

    this.leaderboard.forEach((scr) => {
      let score = document.createElement('li');
      score.className += 'high-scores';
      score.textContent = `${scr.player}: ${scr.score}`;

      highScores.appendChild(score);
    });
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
      startBall();
    })

    let highScores = document.getElementById('high-scores');

    this.loadScores();

    game.appendChild(startButton);

    const that = this;

    function startBall() {
      let ballObj = new Ball(192, 192, 0, 0);
      let user = new Paddle(10, 160);
      let comp = new Paddle(380, 160);
      ballObj.vectX = 5;
      ballObj.vectY = 0;
      that.addListen(user);

      that.gameInterval = setInterval(function(){
        that.update(ballObj, user, comp);
        that.draw(ballObj, user, comp);
      }, 30);
    }
  }

  postScore() {
    let that = this;
    let score = this.score;
    let payload = {score: `${score}`, game_id: '2', player: 'none'};

    fetch('https://agile-wildwood-13888.herokuapp.com/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(json => {
      that.addScoreToHighscores(json);
    })
  }

  addScoreToHighscores(json) {
    this.leaderboard.push(json);
    this.filterAndSortScores(this.leaderboard);
  }

  endGame(ballObj, user, comp) {

    ballObj = null;
    user = null;
    comp = null;
    clearInterval(this.gameInterval);

    let score = document.getElementById('score');
    console.log(score.textContent.substr(6))

    let main = document.querySelector('main')
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    let game = document.createElement('div')
    game.id = 'game';

    let yourScore = document.createElement('div')
    yourScore.id = 'your-score';
    yourScore.textContent = `your score: ${score.textContent.substr(6)}`

    let enterInitials = document.createElement('FORM');

    let enterInitialsText = document.createElement('input');

    enterInitialsText.setAttribute("type", "text");
    enterInitialsText.setAttribute("value", "");
    enterInitialsText.setAttribute("name", "name");
    enterInitialsText.setAttribute("maxlength", "3");
    enterInitialsText.id = 'enter-initials-text';

    let newLine = document.createElement('br');

    let enterInitialsSubmit = document.createElement('input');
    enterInitialsSubmit.setAttribute("type", "submit");
    enterInitialsSubmit.setAttribute("value", "Submit");
    enterInitialsSubmit.id = 'initials-submit';

    enterInitials.appendChild(enterInitialsText);
    enterInitials.appendChild(newLine);
    enterInitials.appendChild(enterInitialsSubmit);

    enterInitials.addEventListener('click', (e) => {
      e.preventDefault();

      if (enterInitials.name.value != "") {
        let payload = {score: `${score.textContent.substr(6)}`, game_id: '2', player: `${enterInitials.name.value.toUpperCase()}`};
        fetch('https://agile-wildwood-13888.herokuapp.com/scores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        let main = document.querySelector('main')
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }

        let game = document.createElement('div')
        game.id = 'game';

        main.appendChild(game);
      }
    })





    game.appendChild(yourScore);
    game.appendChild(enterInitials);
    main.appendChild(game);



    let highScores = document.createElement('ol');
    highScores.id = 'high-scores';
    main.appendChild(highScores);

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
        if (json[i].game_id == 2) {
          scoreArr.push(json[i]);
        }
      }
      console.log(scoreArr);
      scoreArr.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
      scoreArr = scoreArr.splice(0, 7);

      scoreArr.forEach((scr) => {
        let score = document.createElement('li');
        score.className += 'high-scores';
        score.textContent = `${scr.player}: ${scr.score}`;

        highScores.appendChild(score);
      });
    }
  }
}

class Ball {
  constructor(x, y, vectX, vectY) {
    this.x = x;
    this.y = y;
    this.vectX = vectX;
    this.vectY = vectY;
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
