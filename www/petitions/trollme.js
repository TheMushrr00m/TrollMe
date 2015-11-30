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
var MAP_WIDTH = 2724;
var MAP_HEIGHT = 1875;
var MOVING_SPEED = 400;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'trollme', { preload: preload, create: create, update: update}); 
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
	game.load.image('parque', 'assets/buildings/parque.png');
	game.load.image('casa', 'assets/buildings/casa.png');
	game.load.image('casa2', 'assets/buildings/casa2.png');
	game.load.image('mall', 'assets/buildings/mall.png');
	game.load.image('tienda', 'assets/buildings/tienda.png');
	game.load.image('tienda2', 'assets/buildings/tienda2.png');
	game.load.image('edificioFrente', 'assets/buildings/edificioFrente.png');
	game.load.image('edificioLateral', 'assets/buildings/edificioLateral.png');
	game.load.image('arbol1', 'assets/buildings/arbol1.png');
	game.load.image('arbol2', 'assets/buildings/arbol2.png');
	game.load.image('arbol3', 'assets/buildings/arbol3.png');
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
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 0;
	game.add.sprite(248, 637, 'parque');
	buildings = game.add.group();
	group_all = game.add.group();
	doors = game.add.group();
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
	var house2 =  buildings.create(1059 + game.cache.getImage('casa2').width / 2, 322 + game.cache.getImage('casa2').height / 2, 'casa2');
	buildingsEnableP2Physics(house2, 86);
	house2 =  buildings.create(827 + game.cache.getImage('casa2').width / 2, 438 + game.cache.getImage('casa2').height / 2, 'casa2');
	buildingsEnableP2Physics(house2, 86);
	var house =  buildings.create(639 + game.cache.getImage('casa').width / 2, 609 + game.cache.getImage('casa').height / 2, 'casa');
	buildingsEnableP2Physics(house, 80);
	var shop =  buildings.create(530 + game.cache.getImage('tienda').width / 2, 708 + game.cache.getImage('tienda').height / 2, 'tienda');
	buildingsEnableP2Physics(shop, 71);
	var shop2 =  buildings.create(400 + game.cache.getImage('tienda2').width / 2, 826 + game.cache.getImage('tienda2').height / 2, 'tienda2');
	buildingsEnableP2Physics(shop2, 43);
	buildingFront =  buildings.create(0 + game.cache.getImage('edificioFrente').width / 2, 570 + game.cache.getImage('edificioFrente').height / 2, 'edificioFrente');
	buildingsEnableP2Physics(buildingFront, 110);
	var buildingLateral =  buildings.create(1399 + game.cache.getImage('edificioLateral').width / 2, 0 + game.cache.getImage('edificioLateral').height / 2, 'edificioLateral');
	buildingsEnableP2Physics(buildingLateral, 109);
	buildingLateral =  buildings.create(1602 + game.cache.getImage('edificioLateral').width / 2, 117 + game.cache.getImage('edificioLateral').height / 2, 'edificioLateral');
	buildingsEnableP2Physics(buildingLateral, 109);
	buildingLateral =  buildings.create(1805 + game.cache.getImage('edificioLateral').width / 2, 227 + game.cache.getImage('edificioLateral').height / 2, 'edificioLateral');
	buildingsEnableP2Physics(buildingLateral, 109);
	var mall =  buildings.create(2007 + game.cache.getImage('mall').width / 2, 572 + game.cache.getImage('mall').height / 2, 'mall');
	buildingsEnableP2Physics(mall, 210);
	buildingsEnableP2Physics(buildingLateral, 109);
	var tree1 =  buildings.create(764 + game.cache.getImage('arbol1').width / 2, 1109 + game.cache.getImage('arbol1').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree1, 0);
	tree1 = buildings.create(936 + game.cache.getImage('arbol1').width / 2, 1410 + game.cache.getImage('arbol1').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree1, 0);
	tree1 = buildings.create(1283 + game.cache.getImage('arbol1').width / 2, 1443 + game.cache.getImage('arbol1').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree1, 0);
	tree1 = buildings.create(1515 + game.cache.getImage('arbol1').width / 2, 1277 + game.cache.getImage('arbol1').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree1, 0);
	var tree2 =  buildings.create(574 + game.cache.getImage('arbol2').width / 2, 1129 + game.cache.getImage('arbol2').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree2, 0);
	tree2 = buildings.create(1055 + game.cache.getImage('arbol2').width / 2, 1336 + game.cache.getImage('arbol2').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree2, 0);
	tree2 = buildings.create(1689 + game.cache.getImage('arbol2').width / 2, 1042 + game.cache.getImage('arbol2').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree2, 0);
	tree2 =  buildings.create(1281 + game.cache.getImage('arbol2').width / 2, 759 + game.cache.getImage('arbol2').height / 2, 'arbol2');
	buildingsEnableP2Physics(tree2, 210);
	var tree3 =  buildings.create(887 + game.cache.getImage('arbol3').width / 2, 1196 + game.cache.getImage('arbol3').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree3, 0);
	tree3 = buildings.create(1552 + game.cache.getImage('arbol3').width / 2, 905 + game.cache.getImage('arbol3').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree3, 0);
	tree3 = buildings.create(1119 + game.cache.getImage('arbol3').width / 2, 830 + game.cache.getImage('arbol3').height / 2, 'arbol1');
	buildingsEnableP2Physics(tree3, 0);
	var mall_door = group_all.create(2129, 999); //2236, 1060
	boundariesEnableP2Physics(mall_door, [  0, 0  ,  0, 1 ,  107, 62  ,  107, 61  ]);
	player.body.createBodyCallback(house, function(){changeLocation('house');}, this);
	player.body.createBodyCallback(mall_door, function(){changeLocation('mall');}, this);
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
	object1.body.loadPolygon('sprite_physics', object1.key);
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