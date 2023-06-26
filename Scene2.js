class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, "ship");
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3");
    //new

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);


    
   
    this.powerUps = this.physics.add.group();

    var maxObjects = -1;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
       powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

       if(Math.random() > 0.5){
        powerUp.play("red");
       }else{
        powerUp.play("gray")
       }
       powerUp.setVelocity(100,100);
       powerUp.setCollideWorldBounds(true);
       powerUp.setBounce(1);
    }
    //Ship sizes
     this.ship1.setScale(0.7);
     this.ship2.setScale(0.1)
     this.ship3.setScale(0.7);
    // this.ship1.setOrigin(0.5);
    // this.ship1.flipY = true;
    // this.ship1.angle = 90;
    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    //new
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();
    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
     projectile.destroy();
    });
   this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
   this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
   //Adding Hud
   var graphics = this.add.graphics();
   graphics.fillStyle(0x000000, 1);
   graphics.beginPath();
   graphics.moveTo(0, 0);
   graphics.lineTo(config.width, 0);
   graphics.lineTo(config.width, 20);
   graphics.lineTo(0, 20);
   graphics.lineTo(0, 0);
   graphics.closePath();
   graphics.fillPath();
   //Add score
   this.score = 0;
   this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);
  }
 pickPowerUp(player, powerUp) {
  //   make it inactive and hide it
    powerUp.disableBody(true, true);
   // this.score += 15;
   // this.scoreLabel.text = "SCORE " + this.score;
  }
  hurtPlayer(player, enemy) {
    this.score += 15;
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    this.resetShipPos(enemy);
    enemy.x = randomX;
    enemy.y = randomY;
    
  }


  moveShip(ship, speed){
    ship.y += speed;
    if (ship.y > config.height){
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }
  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
}
  update(){
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 2);
    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();
    //new
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }

  }
  shootBeam(){
    var beam = new Beam(this);
  }
  movePlayerManager(){

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

  
}


}
