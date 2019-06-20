class BrickPaddle {

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

  createPaddle() {

    const game = document.getElementById('game');
    let paddle = document.createElement('div');

    const that = this;

    paddle.id = 'brick-paddle';
    paddle.style.bottom = '7px';
    paddle.style.left = '5.2px';

    game.appendChild(paddle);

    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowLeft") {
        that.moveLeft(paddle, 10);
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowRight") {
        that.moveRight(paddle, 10);
      }
    });
  }
}
