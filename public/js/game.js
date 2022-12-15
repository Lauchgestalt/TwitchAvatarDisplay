var socket = io();
var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1434,
  height: 280,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config);

var busy = false;
var recentUnbusy = false;
var PC = false;

function preload() {
  this.load.image("background", "./res/bgedit.png");
  this.load.spritesheet("robot", "./res/robotoSpriteSheet.png", {frameWidth: 144, frameHeight: 270 });
}
function create() {
  this.add.image(0, 0, "background").setOrigin(0);

  const robotAnim = this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers("robot"),
    frameRate: 6,
    repeat: -1
  });

  this.robot = this.physics.add.sprite(45, 155, "robot").setScale(0.4);
  this.robot.play("idle");
  this.robot.collideWorldBounds = true;
  this.robot.setVelocityX(100);
  this.physics.world.enable(this.robot);
  this.robot.body.enable = true;
}
function update() {
  if (this.robot.body.velocity.x < 0){
    this.robot.flipX = true;
  } else {
    this.robot.flipX = false;
  }

  if(recentUnbusy){
    val = Math.floor(Math.random()*2)
    console.log(val);
    if (val == 0) {
      this.robot.setVelocityX(-100);
    } else {
      this.robot.setVelocityX(100);
    }
    recentUnbusy = false;
  }

  if(!busy){
    if (this.robot.x >= 1350){
      this.robot.setVelocityX(-100);
    }
    if (this.robot.x <= 45){
      this.robot.setVelocityX(100);
    }
  }
  if(busy){
    this.robot.setVelocityX(0);
    if(PC){
      var targetX = 1000;
      var targetY = 155;
      this.robot.setVelocityX(0);
      this.physics.moveTo(this.robot, targetX, targetY, 200);
      distance = Phaser.Math.Distance.Between(this.robot.x, this.robot.y, targetX, targetY);
      if(distance < 1){
        this.robot.body.reset(targetX, targetY);
        console.log(this.robot);
      }
    }
  }
}

function setBusy(){
  busy = !busy;
  if(!busy){
    recentUnbusy = true;
  }
}

function moveToPC(){
  if(!busy){
    busy = true;
    PC = true;
    setTimeout(function () {
      setBusy();
      PC = false;
    }, 10000);
  }  
}

function test() {
    socket.emit("busy", "Das ist eine Nachricht");
}

socket.on("setBusy", () => {
  moveToPC();
});