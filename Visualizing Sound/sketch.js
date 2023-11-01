let song;
let playButton;
let stopButton;
let shouldRestart;
let storedAngle = 0;

let img;
let angle = 0;
let rotationSpeed = 2;

let lineLength;
let DELAY = 0;

function preload() {
  song = loadSound("./SC.mp3");
  img = loadImage("./SC1.png");
}

function toWidth(_peakVal) {
  return map(abs(_peakVal), 0, 1, 0, width);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  lineLength = song.getPeaks().map(toWidth);

  backButton = createButton("Restart");
  backButton.position((width - width / 10) / 2 - 500, height - 80);
  backButton.style("width", width / 10 + "px");
  backButton.style("height", "30px");
  backButton.mouseClicked(backClicked);

  playButton = createButton("Play");
  playButton.position((width - width / 10) / 2, height - 80);
  playButton.style("width", width / 10 + "px");
  playButton.style("height", "30px");
  playButton.mouseClicked(playClicked);

  stopButton = createButton("Stop");
  stopButton.position((width - width / 10) / 2 + 500, height - 80);
  stopButton.style("width", width / 10 + "px");
  stopButton.style("height", "30px");
  stopButton.mouseClicked(stopClicked);

  shouldRestart = false;
}

function draw() {
  if (song.isPlaying()) {
    background("beige");
    playButton.html("Pause");
    fill(0);
    ellipse(width, height / 2, height / 2, height / 2);
    rotateImage();
    drawWaveform();
  } else if (song.isPaused()) {
    background(61, 3, 11);
    playButton.html("Play");
    fill(0);
    ellipse(width, height / 2, height / 2, height / 2);

    imageMode(CENTER);
    push();
    translate(width, height / 2);
    rotate(radians(storedAngle));
    image(img, 0, 0, height / 4, height / 4);
    pop();
  } else {
    background("pink");
    playButton.html("Play");
    fill(0);
    ellipse(width, height / 2, height / 2, height / 2);

    imageMode(CENTER);
    image(img, width, height / 2, height / 4, height / 4);
  }
}

function backClicked() {
  if (song.isPlaying()) {
    song.jump(0);
    storedAngle = 0;
  } else if (song.isPaused()) {
    shouldRestart = true;
  } else {
    song.stop();
    storedAngle = 0;
  }
}

function playClicked() {
  if (song.isPlaying()) {
    song.pause();
    storedAngle = angle;
  } else if (song.isPaused()) {
    song.play();
    if (shouldRestart) {
      song.jump(0);
      shouldRestart = false;
    }
  } else {
    song.play();
  }
}

function stopClicked() {
  song.stop();
  storedAngle = 0;
}

function rotateImage() {
  push();
  translate(width, height / 2);
  rotate(radians(angle));
  imageMode(CENTER);
  image(img, 0, 0, height / 4, height / 4);
  pop();
  angle += rotationSpeed;
}

function drawWaveform() {
  let currentTime = song.currentTime();
  let duration = song.duration();
  let playFraction = currentTime / duration;
  let peakIndex = int(playFraction * lineLength.length);

  stroke(255, 192, 203);
  noFill();
  beginShape();

  let spacing = 15;
  for (let i = 0; i < peakIndex; i += spacing) {
    let x = map(i, 0, lineLength.length, 0, width);
    let y = height;
    let y1 = y - lineLength[i];
    line(x, y, x, y1);
  }
  endShape();
}
