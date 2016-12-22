var game = new Phaser.Game(462, 231, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var background,platforms,plat1,plat2,plat3,plat4,plat5,plat6,plat7,plat8,water1,water2;
var Diogo = {
  sprite: undefined,
  direction: 'left',
  doNothing: true
}

function preload() {
    game.world.setBounds(0,0,1155,231)
    game.load.image('background','assets/map.png');
    game.load.image('plat1', 'assets/plat1.png');
    game.load.image('plat2', 'assets/plat2.png');
    game.load.image('plat3', 'assets/plat3.png');
    game.load.image('plat4', 'assets/plat4.png');
    game.load.image('plat5', 'assets/plat5.png');
    game.load.image('plat6', 'assets/plat6.png');
    game.load.image('plat7', 'assets/plat7.png');
    game.load.image('plat8', 'assets/plat8.png');
    game.load.image('water', 'assets/water.png');
    game.load.spritesheet('diogo', 'assets/guy.png', 16, 24, 16);
    cursors = game.input.keyboard.createCursorKeys();

}

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.sprite(0,0,'background');

    platforms = game.add.group();
    platforms.enableBody = true;
    createPlatforms();

    Diogo.sprite = game.add.sprite(50, 50, 'diogo');
    Diogo.sprite.anchor.x=0.5;
    Diogo.sprite.anchor.y=0.5;
    Diogo.sprite.animations.add('walk');
    Diogo.sprite.scale.setTo(1.3,1.3);
    game.physics.arcade.enable(Diogo.sprite);
    Diogo.sprite.body.gravity.y = 700;
    Diogo.sprite.body.bounce.y = 0;
    Diogo.sprite.body.collideWorldBounds = true;
    //mario.sprite.body.acceleration.x = 120;

    Diogo.sprite.animations.add('left', [8,9,10,11], 10, true);
    Diogo.sprite.animations.add('wait', [0], 10, true);
    Diogo.sprite.animations.add('jump', [6], 10, true);
    
    Diogo.sprite.body.fixedRotation = true;
    //mario.sprite.body.onBeginContact.add(blockHit, this);
    
    game.camera.follow(Diogo.sprite);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    runButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    

}

function createPlatforms(){
    plat1 = platforms.create(0,189, 'plat1');
    plat1.body.immovable = true;

    plat2 = platforms.create(168,189, 'plat2');
    plat2.body.immovable = true;

    plat3 = platforms.create(252,189, 'plat3');
    plat3.body.immovable = true;

    plat4 = platforms.create(273,169, 'plat4');
    plat4.body.immovable = true;

    plat5 = platforms.create(524,189, 'plat5');
    plat5.body.immovable = true;

    plat6 = platforms.create(545,189, 'plat6');
    plat6.body.immovable = true;

    plat7 = platforms.create(630,189, 'plat7');
    plat7.body.immovable = true;

    plat8 = platforms.create(1030,189, 'plat8');
    plat8.body.immovable = true;

    water1 = game.add.sprite(126,210, 'water');

    water2 = game.add.sprite(588,210, 'water');
    water2 = game.add.sprite(987,210, 'water');
}

function update() {
    var hitPlatform = game.physics.arcade.collide(Diogo.sprite, platforms);
    Diogo.doNothing = true;
    if (cursors.left.isDown){
        //mario.sprite.body.acceleration.x = -120;
        if(Diogo.direction!='left'){
        Diogo.sprite.scale.x *= -1;
        Diogo.direction = 'left';
        }
        if(Diogo.sprite.body.velocity.x==0 ||
        (Diogo.sprite.animations.currentAnim.name!='left' && Diogo.sprite.body.onFloor())){
        Diogo.sprite.animations.play('left', 10, true);
        }

        Diogo.sprite.body.velocity.x -= 5;
        if(runButton.isDown){
        if(Diogo.sprite.body.velocity.x<-200){
            Diogo.sprite.body.velocity.x = -200;
        }
        }else{
        if(Diogo.sprite.body.velocity.x<-120){
            Diogo.sprite.body.velocity.x = -120;
        }
        }
        Diogo.doNothing = false;
    }else if (cursors.right.isDown){
        if(Diogo.direction!='right'){
        Diogo.sprite.scale.x *= -1;
        Diogo.direction = 'right';
        }
        if(Diogo.sprite.body.velocity.x==0 ||
        (Diogo.sprite.animations.currentAnim.name!='left' && Diogo.sprite.body.onFloor())){
        Diogo.sprite.animations.play('left', 10, true);
        }
        Diogo.sprite.body.velocity.x += 5;
        if(runButton.isDown){
        if(Diogo.sprite.body.velocity.x>200){
            Diogo.sprite.body.velocity.x = 200;
        }
        }else{
        if(Diogo.sprite.body.velocity.x>120){
            Diogo.sprite.body.velocity.x = 120;
        }
        }
        Diogo.doNothing = false;
    }
    if (cursors.up.isDown && ((Diogo.sprite.body.touching.down && hitPlatform)  || Diogo.sprite.body.onFloor())){
        Diogo.sprite.body.velocity.y = -310;
        Diogo.doNothing = false;
        
    }
    if(Diogo.doNothing){
        if(Diogo.sprite.body.velocity.x>10){
        //mario.sprite.body.acceleration.x = 10;
        Diogo.sprite.body.velocity.x -= 10;
        }else if(Diogo.sprite.body.velocity.x<-10){
        //mario.sprite.body.acceleration.x = -10;
        Diogo.sprite.body.velocity.x += 10;
        }else{
        //mario.sprite.body.acceleration.x = 0;
        Diogo.sprite.body.velocity.x = 0;
        }
        if(Diogo.sprite.body.onFloor()){
        Diogo.sprite.animations.play('wait', 20, true);
        }
    }
    game.world.wrap(Diogo.sprite,0,true,true,false);
}