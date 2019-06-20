class Brick {

  createBrick(x, y, id) {

    const game = document.getElementById('game');
    let brick = document.createElement('div');

    brick.className += 'brick';

    brick.style.left = `${x}px`;
    brick.style.top = `${y}px`;

    brick.id = id;

    game.appendChild(brick);
  }
}
