let img = document.getElementById('robot');
let bg = document.getElementById('background');
function startGame() {
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = document.body.offsetWidth;
    this.canvas.height = document.body.offsetWidth / 5.08571;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};


var myGamePiece;

function startGame() {
  myGameArea.start();
  background = new component(bg, document.body.offsetWidth, document.body.offsetWidth / 5.08571, 0, 0);
  myGamePiece = new component(img, 30, 50, 50, document.body.offsetWidth / 9.5);
}

function component(sprite, width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  
  this.update = function () {
    ctx = myGameArea.context;
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    // ctx.fillStyle = color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.x += 1;
  background.update();
  myGamePiece.update();
}