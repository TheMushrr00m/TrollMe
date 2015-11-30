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
    game.load.image('bullet', 'assets/sprites/star.png');
    game.load.image('enemyBullet', 'assets/sprites/diamond.png');
    game.load.spritesheet('invader', 'assets/sprites/baddie.png', 32, 32);
    game.load.image('lives', 'assets/sprites/firstaid.png');
    game.load.image('sky', 'assets/backgrounds/sky.png');
    game.load.spritesheet('player', 'assets/sprites/dude.png', 32, 40);
}

var button;
var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

	starfield = game.add.tileSprite(0, 0, 800, 600, 'sky');
    button = game.add.button(0, game.world.height - 44, 'exitbutton', exitOnClick, this, 2, 1, 0);
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);

	player = game.add.sprite(400, 500, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.frame = 4;

    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    
	createAliens();

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
        lives_img.alpha = 0.4;
    }

    //And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}


function createAliens () {
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = aliens.create(x * 48, y * 50, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('left', [0, 1], 5, true);
		    alien.animations.add('right', [2, 3], 5, true);

            alien.play('left');
            alien.body.moves = false;
        }
    }

    aliens.x = 100;
    aliens.y = 50;

    //All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
	aliens["direction"] = 1
   	aliens['tween'] = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //When the tween loops it calls descend
    aliens.tween.onLoop.add(descend, this);
}


function descend() {
    aliens.y += 10;
    aliens.direction *= -1
}


function update() {
	//Run collision
        game.physics.arcade.collide(bullets, aliens, collisionHandler, null, this);
        game.physics.arcade.collide(enemyBullets, player, enemyHitsPlayer, null, this);

    starfield.tilePosition.y += 2;

 	aliens.forEachAlive(function(alien){
    	if (aliens.direction == 1)
    	{
    		alien.play('right');
    	}
    	else
    	{
    		alien.play('left');    		
    	}
    });

    if (player.alive)
    {
        //Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }

        if (fireButton.isDown)
        {
            fireBullet();
        }

        if (game.time.now > firingTimer)
        {
        	for (var i = 0; i < 3; i++)    
    		{
            	enemyFires();
            }
        }        
    }
}


function fireBullet () {
    if (game.time.now > bulletTime)
    {
    	var bullet = bullets.create(player.x + 6, player.y , 'bullet');
    	bullet.checkWorldBounds = true;
		bullet.outOfBoundsKill = true;

        bullet.body.velocity.y = -300;

        bulletTime = game.time.now + 250;
    }
}


//Called if the bullet goes out of the screen
function resetBullet (bullet) {
    bullet.kill();
}


function collisionHandler (bullet, alien) {
    //When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill');
        bullets.callAll('kill');

        stateText.text = " You Won, \n Press Enter to \n Restart";
        stateText.visible = true;

        //the "click to restart" handler
        //this.game.input.onTap.addOnce(restart,this);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(restart, this);
    }
}


function enemyHitsPlayer (player,bullet) {
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');
        bullets.callAll('kill');
	    aliens.tween.stop()

        stateText.text=" GAME OVER \n Press Enter to \n Restart";
        stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER); 
        this.enterKey.onDown.add(restart, this);
    }
}


function enemyFires () {
    //Grab the first bullet we can from the pool
    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){
        // put every living enemy in an array
        livingEnemies.push(alien);
    });

    if (livingEnemies.length > 0)
    {
        var random = game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        //enemyBullet.reset(shooter.body.x, shooter.body.y);
        var enemyBullet = enemyBullets.create(shooter.body.x, shooter.body.y , 'enemyBullet');
        enemyBullet.checkWorldBounds = true;
		enemyBullet.outOfBoundsKill = true;

        game.physics.arcade.moveToObject(enemyBullet,player,180);
        enemyBullet.body.velocity.x += (Math.floor(Math.random() * 3) - 3) * 15;

        enemyBullet.rotation = game.physics.arcade.angleBetween(enemyBullet, player);
        enemyBullet.angle -= 90;

        firingTimer = game.time.now + 1000;
    }
}


function restart() {
    //A new level starts
    //resets the life count
    lives.callAll('revive');
    //And brings the aliens back from the dead :)
    aliens.tween.stop()
    aliens.removeAll();
    createAliens();

    //revives the player
    player.revive();
    player.x = 400;
    player.y = 500;
    //hides the text
    stateText.visible = false;
    score = 0;
    scoreText.text = scoreString + score;
}


function exitOnClick () {
    player.kill();
    locationDiv.innerHTML = 'arcade';
}


function resize()
{
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}