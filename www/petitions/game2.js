if( /Internet Explorer|Firefox/i.test(navigator.userAgent) ) 
{
    window.devicePixelRatio = 1;
}
var locationDiv = document.getElementById('location')
var magicWidthNumber = 0.60
var magicHeightNumber = 0.80
//Mobile
//var height = window.innerHeight * magicHeightNumber;
//var width = window.innerWidth * magicWidthNumber;
//Computah
var height = window.screen.availHeight * magicHeightNumber;
var width = window.screen.availWidth * magicWidthNumber;
var MAP_WIDTH = 1297;
var MAP_HEIGHT = 1104;
var MOVING_SPEED = 400;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });


function preload() {
    window.addEventListener('resize', function() {
        resize();
    });
    game.scale.minWidth = width/2;
    game.scale.minHeight = height/2;
    game.scale.maxWidth = width;
    game.scale.maxHeight = height;
    game.stage.backgroundColor = '#999999';

    game.load.image('exitbutton', 'assets/sprites/button_exit.png');
    game.load.image('star', 'assets/sprites/star.png');
    game.load.spritesheet('hazard', 'assets/sprites/baddie.png', 32, 32);
    game.load.image('sky', 'assets/backgrounds/sky.png');
    game.load.spritesheet('player', 'assets/sprites/dude.png', 32, 40);
    game.load.image('lives', 'assets/sprites/firstaid.png');
}

var button;
var play = true;
var stars;
var enemies;
var player;
var cursors;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var stateText;
var livingEnemies = [];
var starTimer = 0;


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'sky');
    button = game.add.button(0, game.world.height - 44, 'exitbutton', exitOnClick, this, 2, 1, 0);
	player = game.add.sprite(game.world.centerX, game.world.height -48, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.body.collideWorldBounds = true;
    player.body.static = true;

    stars = game.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    
    //The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var lives_img = lives.create(game.world.width - 100 + (30 * i), 60, 'lives');
        lives_img.anchor.setTo(0.5, 0.5);
        //lives_img.angle = 90;
        lives_img.alpha = 0.4;
    }

    //And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}


function update() {
    game.physics.arcade.overlap(player, stars, collectStar);
    game.physics.arcade.collide(player, enemies, hazardHitsPlayer);

    //Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    if (player.alive)
    {
        //Reset the player, then check for movement keys
        player.body.velocity.x = 0;

        if (cursors.left.downDuration(1))
        {
            player.x -= 40;
        }
        else if (cursors.right.downDuration(1))
        {
            player.x += 40;
        }
        else
        {
            //Stand still
            player.animations.stop();

            player.frame = 4;
        }

        if (game.time.now > starTimer)
        {
            createStar();
        }
    }
}


function resetObject (object) {
    object.kill();
}


function createStar(){
    for (var i = 0; i < 8; i++)    
    {
        if (Math.floor(Math.random() * 5) < 1)
        {
            var star = stars.create((Math.floor(Math.random() * 21)) * 40, 0, 'star');
            star.body.velocity.y = 300;
            star.checkWorldBounds = true;
            star.outOfBoundsKill = true;    
        }
        else
        {
            var enemy = enemies.create((Math.floor(Math.random() * 21)) * 40, 0, 'hazard');
            enemy.body.velocity.y = 300;
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;
        }
    }    
    starTimer = game.time.now + 200;
}


function collectStar (player, star) {
    star.kill();

    //Increase the score
    score += 20;
    scoreText.text = scoreString + score;
}


function hazardHitsPlayer (player, hazard) {
    hazard.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemies.callAll('kill');
        stars.callAll('kill');
        stateText.text = " You Won, \n Press Enter to \n Restart";
        stateText.visible = true;

        //the "click to restart" handler
        //this.game.input.onTap.addOnce(restart,this);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(restart, this);
    }
}


function restart () {
    //A new level starts    
    //resets the life count
    lives.callAll('revive');

    //revives the player
    player.revive();
    player.x = game.world.centerX;
    player.y = game.world.height -48;
    //hides the text
    stateText.visible = false;
    score = 0;
    scoreText.text = scoreString + score;
    scoreText.visible = true;
    play = true;
}


function exitOnClick () {
    player.kill();
    locationDiv.innerHTML = 'arcade';
}


function resize()
{
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}