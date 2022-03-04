let mic; //mic input lvl
let hatHeight; //hat height
let earTwitch; //amount ears twitch
let direction; //which direction ears rotate in
let ghosts; //array holding all ghosts
let ghostNum; //amount of ghosts
let sketchStarted = false;

function setup() {
  createCanvas(400, 400);

  //drawing modes
  angleMode(DEGREES);
  noStroke();

  //audio input setup
  createButton("START MIC INPUT").mousePressed(startSketch);

  //iteration animation setup
  earTwitch = 0;
  direction = "out";

  //ghosts setup
  ghosts = [];
  ghostNum = 70;
  for (let i = 0; i < ghostNum; i++) {
    let x = random(width * 0.05, width * 0.95);
    let y = random(height * 0.05, height * 0.95);
    let s = random(width * 0.05, width * 0.15);
    ghosts[i] = new ghost(x, y, s);
  }
}

function draw() {
  if (sketchStarted) {
    background(118, 133, 135);
    showGhosts();
    drawBody(51);
    drawHead(51);
    micInput();
    mouseInput();
    iteration();
  }
}

function startSketch() {
  mic = new p5.AudioIn(); //creates new audio in object
  mic.start(); //starts taking new input lvl
  sketchStarted = true;
}

function micInput() {
  //mic input animation
  let vol = mic.getLevel(); //gets overall volume
  hatHeight = -vol * 1000;
  drawHat(hatHeight);
}

function mouseInput() {
  if (
    mouseX > width * 0.7 &&
    mouseX < width * 0.9 &&
    mouseY > height * 0.2 &&
    mouseY < height * 0.6
  ) {
    drawTail(true);
  } else {
    drawTail(false);
  }
}

function iteration() {
  if (frameCount % 5 == 0) {
    if (direction === "in" || earTwitch >= 0.05) {
      earTwitch = earTwitch - 0.001;
      if (earTwitch <= 0) {
        direction = "out";
      } else {
        direction = "in";
      }
    } else {
      earTwitch = earTwitch + 0.001;
    }
  }
}

function drawTail(wagBool) {
  fill(51);
  push();
  translate(width * 0.75, height * 0.6);
  if (wagBool) {
    rotate(15);
  }
  beginShape();
  curveVertex(width * 0, height * 0);
  curveVertex(width * 0.05, height * -0.26);
  curveVertex(width * 0.05, height * -0.36);
  curveVertex(width * 0.03, height * -0.36);
  curveVertex(width * 0, height * -0.32);
  curveVertex(width * 0, height * -0.26);
  curveVertex(width * 0, height * 0);
  endShape(CLOSE);
  pop();
}

function drawBody(fillColor) {
  fill(fillColor);
  beginShape();
  curveVertex(width * 0.16, height * 0.41);
  curveVertex(width * 0.13, height * 0.5);
  curveVertex(width * 0.13, height * 0.65);
  curveVertex(width * 0.18, height * 0.72);
  curveVertex(width * 0.18, height * 0.72);
  curveVertex(width * 0.73, height * 0.72);
  curveVertex(width * 0.8, height * 0.65);
  curveVertex(width * 0.8, height * 0.5);
  curveVertex(width * 0.67, height * 0.41);
  endShape(CLOSE);
}

function drawHead(fillColor) {
  fill(fillColor);

  //head
  ellipseMode(CORNER);
  ellipse(width * 0.1, height * 0.2, width * 0.38, height * 0.3);

  //left ear
  push();
  translate(width * 0.11, height * 0.2);
  rotate(-earTwitch * width);
  triangle(
    width * -0.02,
    height * 0.045,
    0,
    height * 0.135,
    width * 0.05,
    height * 0.05
  );
  pop();

  //right ear
  push();
  translate(width * 0.47, height * 0.2);
  rotate(earTwitch * width);
  triangle(
    width * 0.02,
    height * 0.045,
    0,
    height * 0.135,
    width * -0.05,
    height * 0.05
  );
  pop();

  fill(250, 217, 127);

  //left eye
  push();
  translate(width * 0.15, height * 0.32);
  rotate(-10);
  ellipse(0, 0, width * 0.05, height * 0.03);
  pop();

  //right eye
  push();
  translate(width * 0.375, height * 0.31);
  rotate(5);
  ellipse(0, 0, width * 0.05, height * 0.03);
  pop();

  //nose
  triangle(
    width * 0.28,
    height * 0.35,
    width * 0.3,
    height * 0.35,
    width * 0.29,
    height * 0.36
  );
}

function drawHat(heightHat) {
  //hat
  fill(46, 57, 59);
  ellipseMode(CENTER);
  ellipse(
    width * 0.29,
    height * 0.225 + heightHat,
    width * 0.27,
    height * 0.08
  );
  fill(64, 77, 79);
  ellipse(
    width * 0.29,
    height * 0.215 + heightHat,
    width * 0.17,
    height * 0.05
  );
  triangle(
    width * 0.3,
    height * 0.04 + heightHat,
    width * 0.21,
    height * 0.21 + heightHat,
    width * 0.37,
    height * 0.21 + heightHat
  );
}

class ghost {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.t = 1;
    this.s = random(-0.5, 0.5);
  }

  display() {
    noStroke();
    fill(255, 255, 255);
    ellipseMode(CENTER);
    rectMode(CENTER);

    push();
    translate(this.x + this.t, this.y + this.t);
    //ghost body
    ellipse(this.x, this.y, this.size, this.size);
    rect(this.x, this.y + this.size * 0.4, this.size, this.size, 5);
    //ghost face
    fill(35, 40, 41, 130);
    ellipse(this.x - this.size * 0.2, this.y, this.size * 0.2, this.size * 0.1);
    ellipse(this.x + this.size * 0.2, this.y, this.size * 0.2, this.size * 0.1);
    ellipse(this.x, this.y + this.size * 0.4, this.size * 0.2, this.size * 0.3);
    pop();
  }

  move() {
    if (this.t > width * 0.5 || this.t > height + 0.5) {
      this.t = this.t - this.s;
    } else {
      this.t = this.t + this.s;
    }
  }
}

function showGhosts() {
  //generate ghosts in bg w/ class
  for (let i = 0; i < ghostNum; i++) {
    ghosts[i].display();
    ghosts[i].move();
  }
}
