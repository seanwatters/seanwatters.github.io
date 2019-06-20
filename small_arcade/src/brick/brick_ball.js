class BrickBall {

  moveRight(element, pace) {
    if (parseInt(element.style.left) < 310) {
      element.style.left = parseInt(element.style.left) + pace + 'px';
    }
  }
  moveLeft(element, pace) {
    if (parseInt(element.style.left) > 5.2) {
      element.style.left = parseInt(element.style.left) + -pace + 'px';
    }
  }
  moveUp(element, pace) {
    if (parseInt(element.style.bottom) > 5.2) {
      element.style.bottom = parseInt(element.style.bottom) + pace + 'px';
    }
  }
  moveDown(element, pace) {
    if (parseInt(element.style.bottom) < 310) {
      element.style.bottom = parseInt(element.style.bottom) + -pace + 'px';
    }
  }

  createBall() {

    const game = document.getElementById('game');
    let ball = document.createElement('div');

    ball.className += 'ball';
    ball.style.bottom = '200px';
    ball.style.left = '192px';

    game.appendChild(ball);
  }
}
