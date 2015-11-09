var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Trollme', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload(){
    game.forceSingleUpdate = true;
}

function create(){
    game.stage.backgroundColor = '#9B187F';
}

function update(){
    alert('Hola Mundo desde update');
}