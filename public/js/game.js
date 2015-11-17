
/*OSCAR'S CODE */
var create, game, preload, update;

game = new Phaser.Game(800, 600, Phaser.Game, 'trollme', {
  preload: preload,
  create: create,
  update: update
});

preload = function() {
  game.stage.backgroundColor = '#149941';

  /*Load the image and create it into an array of images, 32px width 48 pix height */
  game.load.spritesheet('dude', 'images/dude2.png', 32, 48);
  return game.load.image('wall', 'images/platform.png');
};

create = function() {
  var cursors, player, wall, walls;
  game.physics.startSystem(Phaser.Physics.ARCADE);

  /*Set The Bounds of the world where the camera can move to */
  game.world.setBounds(-1000, -1000, 2000, 2000);
  player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
  game.physics.arcade.enable(player);
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
  walls = game.add.group();
  walls.enableBody = true;
  wall = walls.create(400, 400, 'wall');
  wall.body.immovable = true;
  wall = walls.create(-150, 250, 'wall');
  wall.body.immovable = true;
  game.add.text(0, 0, "this text scrolls\nwith the background", {
    font: "32px Arial",
    fill: "#f26c4f",
    align: "center"
  });
  this.t = game.add.text(0, 0, "this text is fixed to the camera", {
    font: "32px Arial",
    fill: "#ffffff",
    align: "center"

    /*Fix the text t to the camera */
  });
  this.t.fixedToCamera = true;

  /*Put an offset to the text */
  this.t.cameraOffset.setTo(200, 500);
  return cursors = game.input.keyboard.createCursorKeys();
};

update = function() {
  game.physics.arcade.collide(player, walls);

  /*Only move when you click */
  if (game.input.mousePointer.isDown) {

    /*400 is the speed it will move towards the mouse */
    game.physics.arcade.moveToPointer(player, 200);
    if (Math.abs(player.body.velocity.x > Math.abs(player.body.velocity.y))) {
      if (player.body.velocity.x > 0) {
        player.animations.play('right');
      } else {
        player.animations.play('left');
      }
    } else {
      if (player.body.velocity.y > 0) {
        player.frame = 4;
      } else {
        player.frame = 5;
      }
    }
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.velocity.setTo(0, 0);

      /*Stand still */
      player.animations.stop();
      player.frame = 4;
    }
  } else {
    player.body.velocity.setTo(0, 0);

    /*Stand still */
    player.animations.stop();
    player.frame = 4;
  }

  /*Camera Movement */
  if (cursors.up.isDown) {
    game.camera.y -= 4;
    this.t.text = 'up';
  } else if (cursors.down.isDown) {
    game.camera.y += 4;
    this.t.text = 'down';
  }
  if (cursors.left.isDown) {
    game.camera.x -= 4;
    return this.t.text = 'left';
  } else if (cursors.right.isDown) {
    game.camera.x += 4;
    return this.t.text = 'right';
  }
};
