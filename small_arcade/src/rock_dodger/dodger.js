class Dodger {

  moveRight(element, pace) {
    if (parseInt(element.style.left) < 330) {
      element.style.left = parseInt(element.style.left) + pace + 'px';
    }
  }

  moveLeft(element, pace) {
    if (parseInt(element.style.left) > 5.2) {
      element.style.left = parseInt(element.style.left) + -pace + 'px';
    }
  }

  createDodger() {

    const game = document.getElementById('game');
    let dodger = document.createElement('div');

    const that = this;

    dodger.id = 'dodger';
    dodger.style.bottom = '7px';
    dodger.style.left = '5.2px';

    game.appendChild(dodger);

    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowLeft") {
        that.moveLeft(dodger, 10);
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowRight") {
        that.moveRight(dodger, 10);
      }
    });
  }
}
