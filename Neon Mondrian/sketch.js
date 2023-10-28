let img1; // Image 1
let img2; // Image 2
let img3; // Image 3
let img4; // Image 4
let currentImage; // The currently displayed image
let t = 0;
let slider;
let switchButton1; // Button for Image 1
let switchButton2; // Button for Image 2
let switchButton3; // Button for Image 3
let switchButton4; // Button for Image 4

function preload() {
  img1 = loadImage("./Mondriaan.jpg");
  img2 = loadImage("./M2.jpg");
  img3 = loadImage("./M3.jpg");
  img4 = loadImage("./M4.jpg");
  currentImage = img1; // Start with the first image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  print("Original size: ", currentImage.width, " x ", currentImage.height);
  let aspectRatio = currentImage.width / currentImage.height;
  let newHeight = windowHeight;
  let newWidth = windowHeight * aspectRatio;
  currentImage.resize(newWidth, newHeight);
  print("Scaled size: ", currentImage.width, " x ", currentImage.height);
  currentImage.loadPixels();
  print("pixel array size: ", currentImage.pixels.length);

  slider = createSlider(0, 255, 0);
  slider.position(width - 200, 100);

  // Create four buttons, one for each image
  switchButton1 = createButton('Image 1');
  switchButton1.position(width - 200, 150);
  switchButton1.mousePressed(switchToImage1);

  switchButton2 = createButton('Image 2');
  switchButton2.position(width - 200, 180);
  switchButton2.mousePressed(switchToImage2);

  switchButton3 = createButton('Image 3');
  switchButton3.position(width - 200, 210);
  switchButton3.mousePressed(switchToImage3);

  switchButton4 = createButton('Image 4');
  switchButton4.position(width - 200, 240);
  switchButton4.mousePressed(switchToImage4);
}

function switchToImage1() {
  currentImage = img1;
}

function switchToImage2() {
  currentImage = img2;
}

function switchToImage3() {
  currentImage = img3;
}

function switchToImage4() {
  currentImage = img4;
}

function draw() {
  background(10, 10);
  noStroke();

  for (let y = 0; y < currentImage.height; y += 30) {
    for (let x = 0; x < currentImage.width; x += 30) {
      let pIndex = 4 * (y * currentImage.width + x);
      let currentVal = slider.value();
      let redValue = currentImage.pixels[pIndex + 0 + currentVal];
      let greenValue = currentImage.pixels[pIndex + 1];
      let blueValue = currentImage.pixels[pIndex + 2 + currentVal];

      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      const angle = xAngle * (x / width) + yAngle * (y / height);

      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      fill(redValue, greenValue, blueValue);
      ellipse(myX, myY, 10);
    }
  }

  t = t + 0.01; // Update time for animation
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
