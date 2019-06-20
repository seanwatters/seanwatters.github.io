
class RockDodger {

  addDodger() {
    let dodger = new Dodger;
    dodger.createDodger();
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
      startRocks();
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
        if (json[i].game_id == 1) {
          scoreArr.push(json[i]);
        }
      }
      console.log(scoreArr);
      scoreArr.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
      scoreArr = scoreArr.splice(0,7);

      scoreArr.forEach((scr) => {
        let score = document.createElement('li');
        score.className += 'high-scores';
        score.textContent = `${scr.player}: ${scr.score}`;

        highScores.appendChild(score);
      });
    }

    game.appendChild(startButton);


    function startRocks() {
      let rock = new Rock;

      function deployRocks() {
        if (document.getElementById('dodger')) {
          setTimeout(function () {
            deployRocks();
            rock.createRock(Math.floor(Math.random() * 340) + 10);
          }, 400);
        } else {
          rock.remove();
        }
      }
      deployRocks();
    }
  }
}
