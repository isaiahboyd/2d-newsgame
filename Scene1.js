class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background","clouds.png");
    this.load.image("ship", "recycle_items.png");
    this.load.image("ship2","bin.png");
    this.load.image("ship3","recycle_items.png");
    //new
    


    this.load.spritesheet("power-up", "power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
  
    this.load.spritesheet("player", "player.png", {
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "beam.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.bitmapFont("pixelFont", "font.png", "font.xml");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
     this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key:"thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key:"beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });
  }
}
 