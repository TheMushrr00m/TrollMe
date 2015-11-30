//Inicializar pharse y creat un juego de 400x900
var juego = new Phaser.Game(400, 490, Phaser.CANVAS, 'DivJuego', { preload: preload, create: create, update: update });
var personaje;
var curso;
var score;
var scoretexto;

//Crear nuestro Contenido del juego (main)
function preload()
{
		//esta funcion ejecuta cuando se inicia 
		//aqui cargamos lo que se utilizara

				//cambiamos el color del fondo
		juego.stage.backgoundColor = '#71c5cf';

		//Cargamos el sprite de el personaje
		juego.load.image('personaje', 'assets/bird.png');
        //cargamos la pipa
        juego.load.image('pipa', 'assets/pipe.png');
	}
	function create()
	{
		//Esta fucion se llama despues de preload
		//donde colocamos todo

		//Elejimos la fisica del jueguito
		 juego.physics.startSystem(Phaser.Physics.ARCADE);

		//Ponemos el personaje en la pantalla
		personaje = juego.add.sprite(100, 254, 'personaje');

		//apliamos gravedad al personaje para que se caiga :v
		juego.physics.arcade.enable(personaje);
		personaje.body.gravity.y = 1000;

		//llamar a la funcion 'saltar' cuando se presione el espacio
		//var ESPACIO = juego.input.keyboard.addKey(Phaser.keyboard.SPACEBAR);
        curso = juego.input.keyboard.createCursorKeys();
			//ESPACIO.onDown.add(saltar, this);
        
        //creamos un grupo
        pipas = juego.add.group();
        //agregamos fisica al grupo
        pipas.enableBody = true;
        //creamos 20 pipas
        pipas.createMultiple(20, 'pipa');
        tiempo = juego.time.events.loop(1500, agregarFilaDePipas, this);
        //agregamos el score
        score = -1;
        scoretexto = juego.add.text(20, 20, "0", {front: "30px Arial", fill: "#ffffff"});
        personaje.anchor.setTo(-0.2, 0.5);     
	}
    function update()
	 {
        // Esta funcion se llama cada 60 segs
        // contiene la logica del juego
        //Si el personaje esta muy arriba o muy abajo( afuera del juego)

        if(personaje.inWorld == false)
            {
        	reinicio();
            }
        if (curso.up.downDuration(1))
            {
            saltar();
            }
         //agregamos que cuando toque una vez la pipa se reinicie el jeugo
         juego.physics.arcade.overlap(personaje, pipas, PegaPipa, null, this);
         if(personaje.angle< 20)
         {
            personaje.angle += 1;
         }
    }

    //hacer al personaje saltar
    function saltar()
    {
    	personaje.body.velocity.y = -350;
        //Crasmos una animacion
        var animacion = juego.add.tween(personaje);
        //hacer que la animacion cambie el angulo del sprite -10° por 1000 milisegundos
        animacion.to({angle: -20}, 100);
        animacion.start();
}
 function PegaPipa()
 {
    //Se pega a una pipa no hay pex
    if(personaje.alive == false)
        {
            return;
        }
        //poner la propiedad alive en false
        personaje.alive = false;
        //prevenir que vengan mas pipas
        juego.time.events.remove(tiempo);
        //ir hacia todas las pipas y parar las
        pipas.forRachAlive(function(p)
        {
            p.body.velocity.x = 0;
        }, this);
 }



    //reiniciar el juego
    function reinicio()
    {
        console.log('oscar gay :v');
    	//iniciar el main que eso reiniciara el juego
    	//juego.state.start('main');
        //matamos a todas las piapas
        pipas.callAll('kill');
        //matamos al objeto
        personaje.kill();
        //revivimos al objeto
        personaje.revive();
        //posicionamos al objeto de nuevo en x 100
        personaje.x = (100);
        //posicionamos al objeto en y 245
        personaje.y = (245);
        //le ponemos velocidad negativa para que salte un poco al iniciar 
        personaje.body.velocity.y = -250;
        score=0;
        scoretexto.tetx = score;
    }
function agregaUnaPipa(x, y)
{   
    //ponemos la primera pipa que mate :v
    var pipa = pipas.getFirstDead();
    //ponemos la posicion nueva
    pipa.reset(x, y);
    //ponemos el nueva posicion de la pipa
    pipa.body.velocity.x=-200;
    //matamos a la pipa cuando ya no se pueda ver
    pipa.checkWorldBounds = true;
    pipa.outOfBoundsKill = true;
}
function agregarFilaDePipas()
{
    //escojer donde estara el hoyo
    var hoyo = Math.floor(Math.random() * 5) + 1;
    //agregar las 6 pipas
    
    for(var i=0; i<8; i++)
        if(i != hoyo && i != hoyo + 1)
            agregaUnaPipa(400, i * 60 + 10);
    score += 1;
    scoretexto.text = score;
}

//agregar el start en el main 
//juego.state.add('main', mainState);  
//juego.state.start('main');  