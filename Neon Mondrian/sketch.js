let img;
let t = 0;


function preload() {
  img = loadImage("./Mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  print("Original size: ", img.width, " x ", img.height);
  let aspectRatio = img.width / img.height;
  let newHeight = windowHeight;
  let newWidth = windowHeight * aspectRatio;
  img.resize(newWidth, newHeight);
  print("Scaled size: ", img.width, " x ", img.height);
  img.loadPixels();
  print("pixel array size: ", img.pixels.length);

}

function draw() {
  background(10, 10);
  noStroke();
  
  for (let y = 0; y < img.height; y += 30) {
    for (let x = 0; x < img.width; x += 30) {
      let pIndex = 4 * (y * img.width + x);
      let redValue = img.pixels[pIndex + 0];
      let greenValue = img.pixels[pIndex + 1];
      let blueValue = img.pixels[pIndex + 2];

      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      const angle = xAngle * (x / width) + yAngle * (y / height);

      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      fill(redValue, greenValue, blueValue);
      ellipse(myX, myY,10);
    }
  }

  t = t + 0.01; // Update time for animation
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
