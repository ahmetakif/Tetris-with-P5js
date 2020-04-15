let currentPiece
let platform
let points
let playing = false;
let video;
let button;

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    generateNewPiece()
    platform = new Platform()
    setInterval( () =>  applyGravity() , timeInterval)
    points = startingPoints
    video = createVideo(['video.mp4']);
    video.hide();
    button = createButton('play');
    button.mousePressed(toggleVid);
}

function toggleVid() {
  if (playing) {
    video.pause();
    button.html('play');
  } else {
    video.loop();
    button.html('pause');
  }
  playing = !playing;
}

function draw() {
    //black();
    background(0);
    image(video,(width-576)/2,(height-324)/2);
    //background(backgroundColor)
    platform.show()
    currentPiece.show()
    drawText(points)
}

function black() {
  fill(0);
  //top
  rect(0,0,width,(height-324)/2);
  //bottom
  rect(0,(height-324)/2+324,width,(height-324)/2);
  //left
  rect(0,0,(width-576)/2,height);
  //right
  rect((width-576)/2+576,0,(width-576)/2,height);
}

function mouseClicked() {
    if (mouseY < height/2 && mouseX < width*2/3 && mouseX > width/3)
        currentPiece.rotation()
    if (mouseX > width*2/3 && !currentPiece.canCollide(box => box.x + boxDimension === width) && !platform.piecesColliding(currentPiece, (rect1, rect2) => rectCollision(rect1, rect2), (box) => box.x += boxDimension))
        currentPiece.x += boxDimension
    if (mouseX < width/3 && !currentPiece.canCollide(box => box.x === begginingPoint) && !platform.piecesColliding(currentPiece, (rect1, rect2) => rectCollision(rect1, rect2), (box) => box.x -= boxDimension))
        currentPiece.x -= boxDimension
    if (mouseY > height/2 && mouseX < width*2/3 && mouseX > width/3)
        applyGravity()
}

let applyGravity = () => {
    if(!currentPiece.canCollide(box => box.y + boxDimension === height) && !platform.piecesColliding(currentPiece)){
        currentPiece.y += boxDimension
    } else {
        currentPiece.canCollide(box => box.y === begginingPoint) ? setup() : platform.placePiece(currentPiece); platform.cleanFilledRows(); generateNewPiece() //Colliding on top of the screen
    }
}

let generateNewPiece = () => {
    let index = Math.floor((Math.random() * pieces.length))
    let indexColor = Math.floor((Math.random() * colors.length))
    currentPiece = new Piece(pieces[index], width / 2, -boxDimension * marginPieceBeginning, colors[indexColor])
}

let drawText = (txt) => {
    textSize(32)
    fill(255, 255, 255)
    text(txt, width/8, height/8)
}
