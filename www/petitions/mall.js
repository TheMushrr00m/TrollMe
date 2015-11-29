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
var MAP_WIDTH = 1724;
var MAP_HEIGHT = 1281;
var MOVING_SPEED = 200;
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
	//game.load.spritesheet('dude', 'oscar-tests/assets/sprites/dude2.png', 32, 40);
	game.load.spritesheet('espanol', 'assets/sprites/espanol.png', 32, 40);
	game.load.spritesheet('niggah', 'assets/sprites/niggah.png', 32, 40);
	game.load.image('mall', 'assets/buildings/mall3.png');
	game.load.image('barandalizq', 'assets/buildings/barandalizq.png');
	game.load.image('barandalder', 'assets/buildings/barandalder.png');
	game.load.image('elevador1', 'assets/buildings/elevador1.png');
	game.load.image('elevador2', 'assets/buildings/elevador2.png');
	game.load.physics('sprite_physics', 'assets/physics/sprite_physics.json');
}
//Important variables
var player;
var cursors;
//Groups
var doors;
var group_all;
var props;
//Auxiliar variables
var aux;
var boundaries;
function create() {
    // Set The Bounds of the world where the camera can move to
    game.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.add.sprite(0, 0, 'mall');
    doors = game.add.group();
    props = game.add.group();
    group_all = game.add.group();
    boundaries = game.add.group();
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
    var railL =  props.create(154 + game.cache.getImage('barandalizq').width / 2, 315 + game.cache.getImage('barandalizq').height / 2, 'barandalizq');
    propsEnableP2Physics(railL);
    railL['z_depth'] = MAP_HEIGHT;
    group_all.add(railL);
	var railR =  props.create(905 + game.cache.getImage('barandalder').width / 2, 316 + game.cache.getImage('barandalder').height / 2, 'barandalder');
    propsEnableP2Physics(railR);
    railR['z_depth'] = MAP_HEIGHT;
    group_all.add(railR);
    var elevator1 =  group_all.create(836 + game.cache.getImage('elevador1').width / 2, 355 + game.cache.getImage('elevador1').height / 2, 'elevador1');
    propsEnableP2Physics(elevator1);
    elevator1['z_depth'] = 0;
    var elevator2 =  group_all.create(836 + game.cache.getImage('elevador2').width / 2, 138 + game.cache.getImage('elevador2').height / 2, 'elevador2');
    propsEnableP2Physics(elevator2);
    elevator2['z_depth'] = MAP_HEIGHT;
    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
	var boundaries = group_all.create(155, 672); //155, 672
	boundariesEnableP2Physics(boundaries, [  0, -43  ,  1, -43 ,  1, 0  ,  0, 0  ]);
	boundaries = group_all.create(155, 630); //802, 256
	boundariesEnableP2Physics(boundaries, [  647, -374  ,  648, -373 ,  0, 0  ,  0, -1  ]);
	boundaries = group_all.create(802, 256); //939, 256
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, -1 ,  137, -1  ,  137, 0  ]);
	boundaries = group_all.create(939, 256); //1586, 630
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, -1 ,  647, 373  ,  647, 374  ]);
	boundaries = group_all.create(1580 ,620); //1586, 670
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  1, 0 ,  1, 60  ,  0, 60  ]);
	boundaries = group_all.create(225, 905); //837, 551
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, -1 ,  612, -355  ,  612, -354  ]);
	boundaries = group_all.create(905, 551); //1518, 906
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, -1 ,  613, 354  ,  613, 355  ]);
	boundaries = group_all.create(1518, 906); //871, 1280
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, 1 ,  -647, 375  ,  -647, 374  ]);
	boundaries = group_all.create(871, 1280); //225, 905
	boundariesEnableP2Physics(boundaries, [  0, 0  ,  0, 1 ,  -646, -374  ,  -646, -375  ]);
	//Elevators special colisions
	var elevator_boundaries_top = group_all.create(841, 350); //225, 905
	boundariesEnableP2Physics(elevator_boundaries_top, [  0, 0  ,  0, 1 ,  27, -14  ,  27, -15  ]);
	var elevator_boundaries_bottom = group_all.create(874, 569); //901, 554
	boundariesEnableP2Physics(elevator_boundaries_bottom, [  0, 0  ,  0, 1 ,  27, -14  ,  27, -15  ]);
	player.body.createBodyCallback(elevator_boundaries_bottom, elevatorRideUp, this);
	player.body.createBodyCallback(elevator_boundaries_top, elevatorRideDown, this);
	game.physics.p2.setImpactEvents(true);
    resize();
}
function update() {
    var moving = false;
    var animation = false;
    player.z_depth = player.body.y + player.height;
	//console.log(player.z_depth, aux);
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
function propsEnableP2Physics(object1)
{
	console.log(object1.key);
    game.physics.p2.enable(object1, false);
    object1.body.offset.setTo();
    object1.body.static = true;
    object1.body.fixedRotation = true;
    object1.body.clearShapes();
    object1.body.loadPolygon('sprite_physics', object1.key);
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
function changeLocation()
{
    locationDiv.innerHTML = 2;
}
function resize()
{
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}
function elevatorRideUp()
{
	player.body.x = 851;
    player.body.y = 315;
    
}
function elevatorRideDown()
{
	player.body.x = 874;
    player.body.y = 573;		    
}