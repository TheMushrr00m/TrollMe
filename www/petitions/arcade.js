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
var MOVING_SPEED = 200;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'arcade', { preload: preload, create: create, update: update}); 
//800, 600
function preload() {
	window.addEventListener('resize', function() {
		resize();
	});
	game.scale.minWidth = width/2;
	game.scale.minHeight = height/2;
	game.scale.maxWidth = width;
	game.scale.maxHeight = height;
	game.stage.backgroundColor = '#999999';
	// Load the image and create it into an array of images, 32px width 40 pix height
	//game.load.spritesheet('dude', 'assets/sprites/dude2.png', 32, 40);
	game.load.spritesheet('espanol', 'assets/sprites/espanol.png', 32, 40);
	game.load.spritesheet('niggah', 'assets/sprites/niggah.png', 32, 40);
	game.load.image('arcade', 'assets/buildings/arcade.png');
	game.load.physics('sprite_physics', 'assets/physics/sprite_physics.json');
}
//Important variables
var player;
var cursors;
//Groups
var buildings;
var group_all;
var doors;
//Auxiliar variables
var aux;
var buildingFront;
function create() {
	// Set The Bounds of the world where the camera can move to
	game.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
	game.add.sprite(0, 0, 'arcade');
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 0;
	group_all = game.add.group();
	player = group_all.create(game.world.centerX, game.world.centerY, 'espanol'); //dude, espanol, niggah
	game.physics.p2.enable(player);
	player["z_depth"] = player.body.y + (player.height / 2);
	player.body.fixedRotation = true;
	player.body.clearShapes();
	player.body.loadPolygon('sprite_physics', 'lil_dude');
	player.animations.add('right', [0, 1, 2, 3], 10, true);
	player.animations.add('front', [5, 6, 7], 10, true);
	player.animations.add('back', [8, 9, 10], 10, true);
	player.animations.add('left', [11, 12, 13, 14], 10, true);
	var portal_game1 = group_all.create(69, 620); //178, 557
	boundariesEnableP2Physics(portal_game1, [  0, 0  ,  0, -10 ,  109, -73  ,  109, -63  ]);
	var portal_game2 = group_all.create(255, 512); //349, 458
	boundariesEnableP2Physics(portal_game2, [  0, 0  ,  0, -10 ,  94, -64  ,  94, -54  ]);

	var boundaries = group_all.create(0, 650); //512, 355
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, 1 ,  517, -299  ,  517, -300  ]);
	boundaries = group_all.create(512, 355); //1295, 808
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, 1 ,  788, 459  ,  788, 458  ]);
	boundaries = group_all.create(1295, 808); //785, 1102
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, 1 ,  -515, 300  ,  -515, 299  ]);
	boundaries = group_all.create(785, 1102); //0, 650
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, 1 ,  -790, -456  ,  -790, -457  ]);
	player.body.createBodyCallback(portal_game1, function(){changeLocation('game1');}, this);
	player.body.createBodyCallback(portal_game2, function(){changeLocation('game2');}, this);
	game.physics.p2.setImpactEvents(true);
	game.camera.follow(player);
	cursors = game.input.keyboard.createCursorKeys();
	resize();
}
function update() {
	var moving = false;
	var animation = false;
	player.z_depth = player.body.y + player.height;
	if (game.input.mousePointer.isDown || game.input.pointer1.isDown) 	
	{
		//400 is the speed it will move towards the mouse
		game.physics.arcade.moveToPointer(player, MOVING_SPEED);
		if (Math.abs(player.body.velocity.x) > Math.abs(player.body.velocity.y))
		{
			if (player.body.velocity.x > 0 )
			{
				player.animations.play('right');
			}
			else
			{
				player.animations.play('left');
			}
		}
		else
		{
			if (player.body.velocity.y > 0 )
			{
				player.animations.play('front');
			}
			else
			{
				player.animations.play('back');
			}
		}
		//if it's overlapping the mouse, don't move any more
		if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
		{
			//Stand still
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.animations.stop();
			player.frame = 4;
		}
	}
	else
	{
		animation = false;
		if (cursors.left.isDown)
		{
			player.body.moveLeft(MOVING_SPEED);
			player.animations.play('left');
			moving = true;
			animation = true;
		}
		else if (cursors.right.isDown)
		{
			player.animations.play('right');
			player.body.moveRight(MOVING_SPEED);
			moving = true;
			animation = true;
		}
		else
		{
			player.body.velocity.x = 0;
		}
		if (cursors.up.isDown)
		{
			if (!animation)
			{
				player.animations.play('back');                    
			}
			player.body.moveUp(MOVING_SPEED);
			moving = true;
		}
		else if (cursors.down.isDown)
		{
			if (!animation)
			{
				player.animations.play('front');                    
			}
			player.body.moveDown(MOVING_SPEED);
			moving = true;
		}
		else
		{
			player.body.velocity.y = 0;
		}
		if(!moving)
		{
			//Stand still
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.animations.stop();
			player.frame = 4;
		}
	}
	group_all.sort('z_depth', Phaser.Group.SORT_ASCENDING);
}
function buildingsEnableP2Physics(object1, yy)
{
	game.physics.p2.enable(object1, false);
	object1["z_depth"] = (object1.body.y + (object1.height / 2)) - yy;
	object1.body.offset.setTo();
	object1.body.static = true;
	object1.body.fixedRotation = true;
	object1.body.clearShapes();
	//object1.body.loadPolygon('sprite_physics', object1.key);
	group_all.add(object1);
}
function changeLocation(location)
{
	locationDiv.innerHTML = location;
	player.kill();
}
function resize()
{
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}
function boundariesEnableP2Physics(object1, coords)
{
	game.physics.p2.enable(object1, true);
	object1.body.static = true;
    object1.body.fixedRotation = true;
	object1.body.clearShapes();
	object1.body.addPolygon( {} ,  coords);
	object1.body.debug = false;
}